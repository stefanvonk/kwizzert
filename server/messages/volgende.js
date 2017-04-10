var functie = function(session, websocket){
    const kwiz = session.kwizzen.find(x => x.kwizmeestertSocket === websocket);
    if(kwiz.gesteldeVragen % 12 == 0){
        let maxAntwoordenGoed = 0;
        let teamsMetPunten = 0;
        let minAntwoordenMetPunten= 0;
        kwiz.teams.forEach(function (team) {
            if(team.vragenGoed > maxAntwoordenGoed){
                maxAntwoordenGoed = team.vragenGoed;
            }
        });
        kwiz.teams.forEach(function (team) {
            if(team.vragenGoed == maxAntwoordenGoed){
                team.rondepunten += 4;
                teamsMetPunten++;
            }
        });
        minAntwoordenMetPunten = maxAntwoordenGoed;
        if(teamsMetPunten == 1){
            kwiz.teams.forEach(function (team) {
                if(team.vragenGoed > maxAntwoordenGoed && team.vragenGoed < minAntwoordenMetPunten){
                    maxAntwoordenGoed = team.vragenGoed;
                }
            });
            kwiz.teams.forEach(function (team) {
                if(team.vragenGoed == maxAntwoordenGoed){
                    team.rondepunten += 2;
                    teamsMetPunten++;
                }
            });
            minAntwoordenMetPunten = maxAntwoordenGoed;
        }
        if(teamsMetPunten == 2){
            kwiz.teams.forEach(function (team) {
                if(team.vragenGoed > maxAntwoordenGoed && team.vragenGoed < minAntwoordenMetPunten){
                    maxAntwoordenGoed = team.vragenGoed;
                }
            });
            kwiz.teams.forEach(function (team) {
                if(team.vragenGoed == maxAntwoordenGoed){
                    team.rondepunten += 1;
                    teamsMetPunten++;
                }
            });
            minAntwoordenMetPunten = maxAntwoordenGoed;
        }
        kwiz.teams.forEach(function (team) {
            if(team.vragenGoed < minAntwoordenMetPunten){
                team.rondepunten += 0.1;
            }
        });
        let scorebordSocket = kwiz.beamerSocket;
        if(scorebordSocket){
            scorebordData = {
                Type: "scorebordteamgegevens",
                rondenummer: Math.floor(kwiz.gesteldeVragen.length / 12),
                vraagnummer: (kwiz.gesteldeVragen.length % 12),
//                teams: {teamnaam, antwoord, rondepunten, vragengoed}kwiz.teams
            }
            scorebordSocket.onopen = function (event) {};
            scorebordSocket.send(JSON.stringify(scorebordData));
        }
    } else{
        //stuur vragen terug naar kwizmeestert van huidigeronde
    }
};

module.exports = functie;