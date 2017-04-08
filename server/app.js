const express     = require('express');
// var bodyParser  = require('body-parser');
const path        = require('path');
const ws                 = require('ws');
const http               = require('http');
const theHttpServer      = http.createServer();
const theWebSocketServer = new ws.Server({
    server: theHttpServer
});
const mongoose        = require('./DatabaseConnection/mongoose.js');

//Import Messages
const startkwiz = require('./messages/startkwiz');
const startkwizavond = require('./messages/startkwizavond');
const aanmeldenteam = require('./messages/aanmeldenteam');
const teamGeaccepteerd = require('./messages/teamGeaccepteerd');


const app = express();
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
        let data = JSON.parse(message.data);
        switch(data.Type) {
            case "aanmeldenteam":
                session = aanmeldenteam(data.code, data.teamnaam, session, websocket);
                break;
            case "ontvangstantwoord":
                console.log("ontvangstantwoord");
                break;
            case "startkwizavond":
                startkwizavond(data.code, session, websocket);
                console.log(session);
                break;
            case "teamgeaccepteerd":
                teamGeaccepteerd(data.teamnaam, data.geaccepteerd, session, websocket);
                session.kwizzen[0].teams.forEach(function (team) {
                    console.log(team.teamnaam + ": " + team.geaccepteerd);
                });
                break;
            case "startkwiz":
                startkwiz(websocket);
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
            case "aanmeldenscorebord":
                iets
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