var functie = function(code, session, websocket){
    websocket.onopen = function (event) {};

    var data = {
        Type: "kwizavondgestart",
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
                teams : []
            }
        );
    }
    websocket.send(JSON.stringify(data))
};

module.exports = functie;