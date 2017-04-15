var functie = function(session, websocket){
    //Mogelijk eerst wat checks.
    const kwiz = session.kwizzen.find(x => x.kwizmeestertSocket === websocket);
    if(kwiz) {

        let scorebordSocket = kwiz.beamerSocket;

        let teamgegevens = [];

        if(scorebordSocket){
            kwiz.teams.forEach(function (team) {
                let teamGegevens = {
                    teamnaam: team.teamnaam,
                    antwoord: team.huidigAntwoord,
                    rondepunten: team.rondepunten,
                    vragengoed: team.vragenGoed
                }
                teamgegevens.push(teamGegevens);
            });

            scorebordData = {
                Type: "scorebordteamgegevens",
                rondenummer: Math.floor(kwiz.gesteldeVragen.length / 12),
                vraagnummer: (kwiz.gesteldeVragen.length % 12),
                teamgegevens: teamgegevens
            };
            scorebordSocket.onopen = function (event) {};
            scorebordSocket.send(JSON.stringify(scorebordData));
        }

        kwiz.teams.forEach(function (team) {
            let teamSocket = team.teamSocket;
            let teamData = {
                Type: "afbrekenvraag"
            };
            teamSocket.onopen = function (event) {};
            teamSocket.send(JSON.stringify(teamData));
        });

        let kwizmeestertData = {
            Type: "ontvangstantwoorden",
            teamantwoorden: [],
            huidigevraag: kwiz.huidigevraag.vraag,
            huidigantwoord: kwiz.huidigevraag.antwoord
        };

        kwiz.teams.forEach(function(team) {
            let teamantwoord ={
                teamnaam : team.teamnaam,
                huidigAntwoord : team.huidigAntwoord
            };
            kwizmeestertData.teamantwoorden.push(teamantwoord);
        });

        websocket.send(JSON.stringify(kwizmeestertData))
    }
};

module.exports = functie;