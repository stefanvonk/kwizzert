const express     = require('express');
// var bodyParser  = require('body-parser');
const path        = require('path');
const ws                 = require('ws');
const http               = require('http');
const theHttpServer      = http.createServer();
const theWebSocketServer = new ws.Server({
    server: theHttpServer
});

//Import Messages

const mongoose        = require('./DatabaseConnection/mongoose.js');
const startronde = require('./messages/startronde');
const startkwiz = require('./messages/startkwiz');
const startkwizavond = require('./messages/startkwizavond');
const aanmeldenteam = require('./messages/aanmeldenteam');
const teamGeaccepteerd = require('./messages/teamGeaccepteerd');
const startVraag = require('./messages/startVraag');
const ontvangstAntwoord = require('./messages/ontvangstAntwoord');
const stopVraag = require('./messages/stopVraag');
const antwoordGecontroleerd = require('./messages/antwoordGecontroleerd');
const stopKwiz = require('./messages/stopKwiz');
const aanmeldenScorebord = require('./messages/aanmeldenScorebord');
const volgende = require('./messages/volgende');


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
                ontvangstAntwoord(data.code, data.antwoord, session, websocket);
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
                startronde(websocket, data.categorieen, session);
                break;
            case "stopkwiz":
                stopKwiz(session, websocket);
                break;
            case "startvraag":
                startVraag(data.vraag, session, websocket);
                break;
            case "stopvraag":
                stopVraag(session, websocket);
                break;
            case "antwoordgecontroleerd":
                antwoordGecontroleerd(data.teamnaam, data.goedgekeurd, session, websocket);
                break;
            case "volgende":
                volgende(session, websocket);
                break;
            case "aanmeldenbeamer":
                aanmeldenScorebord(data.code, session, websocket);
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