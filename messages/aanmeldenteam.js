var functie = function(code, teamnaam, session, websocket){
    let returnSocket;
    const kwiz = session.kwizzen.find(x => x.code === code);
    if(kwiz){
        const teamMetZelfdeNaam = kwiz.teams.find(x => x.teamnaam === teamnaam);
        if(!teamMetZelfdeNaam) {
            kwiz.teams.push({
                teamSocket: websocket,
                teamnaam: teamnaam,
                rondepunten: 0,
                vragenGoed: 0
            });

            returnSocket = kwiz.kwizmeestertSocket;
            data = {
                Type: "teamaangemeld",
                teamnaam: teamnaam
            }
        } else{
            returnSocket = websocket;
            data = {
                Type: "teamgeaccepteerd",
                melding: "Teamnaam al bezet."
            }
        }
    } else{
        returnSocket = websocket;
        data = {
            Type: "teamgeaccepteerd",
            melding: "Niet Geaccepteerd"
        }
    }

    returnSocket.onopen = function (event) {};
    returnSocket.send(JSON.stringify(data))
    return session;
};

module.exports = functie;