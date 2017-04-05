var functie = function(code, session, websocket){
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
    )
};

module.exports = functie;