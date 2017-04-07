var functie = function(code, teamnaam, session, websocket){
    const kwiz = session.kwizzen.find(x => x.code === code);
    //check of teamnaam al bestaat.
    if(kwiz){
        kwiz.teams.push({teamSocket: websocket, teamnaam:teamnaam});
        websocket = kwiz.kwizmeestertSocket;
        data = {
            Type: "teamaangemeld",
            teamnaam: teamnaam
        }
    } else{
        console.log("komt in else");
        data = {
            Type: "teamgeaccepteerd",
            melding: "Niet Geaccepteerd"
        }
    }

    websocket.onopen = function (event) {};
    websocket.send(JSON.stringify(data))
};

module.exports = functie;