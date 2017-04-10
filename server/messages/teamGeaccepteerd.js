var functie = function(teamnaam, geaccepteerd, session, websocket){

    let kwiz = session.kwizzen.find(kwiz => kwiz.kwizmeestertSocket === websocket);
    if(kwiz){
        let team = kwiz.teams.find(team => team.teamnaam === teamnaam);
        if(team){
            team.geaccepteerd = geaccepteerd;

            if(geaccepteerd) {
                data = {
                    Type: "teamgeaccepteerd",
                    melding: "geaccepteerd"
                }
                let scorebordSocket = kwiz.beamerSocket;
                if(scorebordSocket) {
                    let scorebordData = {
                        Type: "geaccepteerdteam",
                        teamnaam: teamnaam
                    }
                    scorebordSocket.onopen = function (event) {
                    };
                    scorebordSocket.send(JSON.stringify(scorebordData));
                }
            } else{
                data = {
                    Type: "teamgeaccepteerd",
                    melding: "Niet geaccepteerd"
                }
            }

            let returnSocket = team.teamSocket;
            returnSocket.onopen = function (event) {};
            returnSocket.send(JSON.stringify(data))
        }
    }
};

module.exports = functie;