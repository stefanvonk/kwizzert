var functie = function(session, websocket){
    const kwiz = session.kwizzen.find(x => x.kwizmeestertSocket === websocket);
    if(kwiz){
        let scorebordSocket = kwiz.beamerSocket;
        let scorelijst = [];

        let hoogsteScore = 0;
        kwiz.teams.forEach(function (team) {
            if (team.rondepunten > hoogsteScore) {
                hoogsteScore = team.rondepunten;
            }
        });

        while(scorelijst.length < kwiz.teams.length || hoogsteScore == -1){
            kwiz.teams.forEach(function (team) {
                if(team.rondepunten == hoogsteScore){
                    let scorelijstObject = {
                        teamnaam: team.teamnaam,
                        rondepunten: team.rondepunten
                    };

                    scorelijst.push(scorelijstObject);
                }
            });
            hoogsteScore--;
        }

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