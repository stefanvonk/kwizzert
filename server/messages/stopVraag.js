var functie = function(session, websocket){
    //Mogelijk eerst wat checks.
    const kwiz = session.kwizzen.find(x => x.kwizmeestertSocket === websocket);
    if(kwiz) {

        kwiz.huidigevraag.vraag = vraag.question;
        kwiz.huidigevraag.antwoord = vraag.answer;
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
        kwiz.teams.forEach(function (team) {
            let teamSocket = team.teamSocket;
            let teamData = {
                Type: "afbrekenvraag"
            }
            teamSocket.onopen = function (event) {};
            teamSocket.send(JSON.stringify(teamData));
        });

        let kwizmeestertData = {
            Type: "ontvangstantwoorden",
            teamantwoorden: []
        };

        kwiz.teams.forEach(function(team) {
            kwizmeestertData.teamantwoorden = [team.teamnaam, team.huidigAntwoord]
            websocket.send(JSON.stringify(kwizmeestertData))
        });
    }
};

module.exports = functie;