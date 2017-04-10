var functie = function(code, antwoord, session, websocket){
    const kwiz = session.kwizzen.find(x => x.code === code);
    if(kwiz) {
        const team = kwiz.teams.find(x => x.teamSocket === websocket);
        if(team){
            console.log(antwoord);
            team.huidigAntwoord = antwoord;
            let scorebordSocket = kwiz.beamerSocket;
            if(scorebordSocket) {
                let scorebordData = {
                    Type: "scorebordteamnaam",
                    teamnaam: team.teamnaam
                };
                scorebordSocket.onopen = function (event) {
                };
                scorebordSocket.send(JSON.stringify(scorebordData));
            }
        }
    }
};

module.exports = functie;