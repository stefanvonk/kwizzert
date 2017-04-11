var functie = function(session, websocket){
    const kwiz = session.kwizzen.find(x => x.kwizmeestertSocket === websocket);
    if(kwiz){
        let scorebordSocket = kwiz.beamerSocket;
        let scorelijst = [];
        let scorelijstObject = {
            teamnaam: "",
            rondepunten: 0,
        };

        kwiz.teams.forEach(function (team) {
            scorelijstObject.teamnaam = team.teamnaam;
            scorelijstObject.rondepunten = team.rondepunten;

            scorelijst.push(scorelijstObject);
        });

        if(scorebordSocket) {
            let scorebordData = {
                Type: "scorelijst",
                scorelijst: scorelijst
            };
            scorebordSocket.onopen = function (event) {};
            scorebordSocket.send(JSON.stringify(scorebordData));
        }

        kwiz.teams.forEach(function (team) {
            let teamSocket = team.teamSocket;
            let teamData = {
                Type: "kwizgestopt"
            };
            teamSocket.onopen = function (event) {};
            teamSocket.send(JSON.stringify(teamData));
        });
    }
};

module.exports = functie;