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
var mongoose        = require('./DatabaseConnection/mongoose.js');

var app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

if(false){
    mongoose.fillDatabase();
}

//Nog een keer naar kijken waarom dit werkt en hoe dit beter kan.
app.use('/', express.static(path.join(__dirname, '../Clients/team/build')));
app.use('/', express.static(path.join(__dirname, '../Clients/kwizmeestert/build')));
app.use('/', express.static(path.join(__dirname, '../Clients/scorebord/build')));
app.use('/kwizmeestert', express.static(path.join(__dirname, '../Clients/kwizmeestert/build')));
app.use('/team', express.static(path.join(__dirname, '../Clients/team/build')));
app.use('/scorebord', express.static(path.join(__dirname, '../Clients/scorebord/build')));

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/Clients/kwizmeestert/build/index.html'));
// })

theHttpServer.on('request', app);
theHttpServer.listen( 3000,
    function() {
        console.log("The Server is lisening on port 3000.")
    });

theWebSocketServer.on('connection', function connection(websocket) {
    console.log("CONNECTION CREATED");
    websocket.onmessage = function incoming(message) {
        console.log("Het werkt!!");
        switch(message) {
            case "aanmeldenteam":
                console.log("aanmeldenteam");
                break;
            case "ontvangstantwoord":
                console.log("ontvangstantwoord");
                break;
            case "startkwizavond":
                console.log("startkwizavond");
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