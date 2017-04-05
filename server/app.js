var express     = require('express');
// var bodyParser  = require('body-parser');
var path        = require('path');
var ws                 = require('ws');
var http               = require('http');
var theHttpServer      = http.createServer();
var theWebSocketServer = new ws.Server({
    server: theHttpServer
});
var startkwizFile = require('./messages/startkwiz');
var startkwizavondFile = require('./messages/startkwizavond');
var aanmeldenteamFile = require('./messages/aanmeldenteam');
var mongoose        = require('./DatabaseConnection/mongoose.js');

var app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

//Vul database met vragen als deze nog leeg is.(Mongo moet natuurlijk al wel draaien. database is op local host)
let database = mongoose.getInstance();
database.isEmpty(function (callback) {
    if(callback) {
        database.fillDatabase();
        console.log("Database 'Questions' aangemaakt.");
    } else {
        console.log("Database 'Questions' bestaat al.");
    }

});

//Nog een keer naar kijken waarom dit werkt en hoe dit beter kan.
app.use('/', express.static(path.join(__dirname, '../Clients/team/build')));
app.use('/', express.static(path.join(__dirname, '../Clients/kwizmeestert/build')));
app.use('/', express.static(path.join(__dirname, '../Clients/scorebord/build')));
app.use('/kwizmeestert', express.static(path.join(__dirname, '../Clients/kwizmeestert/build')));
app.use('/team', express.static(path.join(__dirname, '../Clients/team/build')));
app.use('/scorebord', express.static(path.join(__dirname, '../Clients/scorebord/build')));

theHttpServer.on('request', app);
theHttpServer.listen( 3000,
    function() {
        console.log("The Server is lisening on port 3000.")
    });

theWebSocketServer.on('connection', function connection(websocket) {
    console.log("CONNECTION CREATED");
    websocket.onmessage = function incoming(message) {
        var data = JSON.parse(message.data);
        switch(data.type) {
            case "aanmeldenteam":
                aanmeldenteamFile(data.code, data.teamnaam, session, websocket);
                console.log(session);
                break;
            case "ontvangstantwoord":
                console.log("ontvangstantwoord");
                break;
            case "startkwizavond":
                startkwizavondFile(data.code, session, websocket);
                console.log(session);
                break;
            case "teamgeaccepteerd":
                console.log("teamgeaccepteerd");
                break;
            case "startkwiz":
                startkwizFile();
                break;
            case "startronde":
                console.log("startronde");
                break;
            case "stopkwiz":
                console.log("stopkwiz");
                break;
            case "startvraag":
                console.log("startvraag");
                break;
            case "stopvraag":
                console.log("stopvraag");
                break;
            case "antwoordgecontroleerd":
                console.log("antwoordgecontroleerd");
                break;
            case "volgende":
                console.log("volgende");
                break;
        }
    };
    websocket.on('close', function() {
        console.log('CONNECTION FOR ' + websocket.type + " CLOSED.");
        if(websocket.timeoutObject) {
            clearTimeout(websocket.timeoutObject);
        }
    });
});

let session = {
    kwizzen: []
};