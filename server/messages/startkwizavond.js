var functie = function(code, session, websocket){
    websocket.onopen = function (event) {};

    var data = {
        type: "kwizavondgestart",
        geaccepteerd: true
    };
    session.kwizzen.forEach(function (kwiz){
        if (kwiz.code === code){
            data.geaccepteerd = false;
        }
    });

    if(data.geaccepteerd){
        session.kwizzen.push(
            {
                code: code,
                kwizmeestertSocket: websocket,
                beamerSocket: null,
                gesteldeVragen: [],
                huidigeronde: [],
                huidigevraag: {
                    vraag: "",
                    antwoord: ""
                },
                teams : [{
                    teamSocket: null,
                    teamnaam: "",
                    geaccepteerd: Boolean,
                    huidigAntwoord: "",
                    rondepunten : 0,
                    vragenGoed: 0
                }]
            }
        );
    }
    websocket.send(JSON.stringify(data))
};

module.exports = functie;