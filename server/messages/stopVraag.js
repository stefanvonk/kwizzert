var functie = function(session, websocket){
    //Mogelijk eerst wat checks.
    const kwiz = session.kwizzen.find(x => x.kwizmeestertSocket === websocket);
    if(kwiz) {

        let scorebordSocket = kwiz.beamerSocket;

        let teamgegevens = [];
        let teamgegevensObject = {
            teamnaam: "",
            antwoord: "",
            rondepunten: 0,
            vragengoed: 0
        };

        kwiz.teams.forEach(function (team) {
            teamgegevensObject.teamnaam = team.teamnaam;
            teamgegevensObject.antwoord = team.huidigAntwoord;
            teamgegevensObject.rondepunten = team.rondepunten;
            teamgegevensObject.vragengoed = team.vragenGoed;

            teamgegevens.push(teamgegevensObject);
        });

        if(scorebordSocket){
            scorebordData = {
                Type: "scorebordteamgegevens",
                rondenummer: Math.floor(kwiz.gesteldeVragen.length / 12),
                vraagnummer: (kwiz.gesteldeVragen.length % 12),
                teamgegevens: teamgegevens
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
            let teamantwoord ={
                teamnaam : team.teamnaam,
                huidigAntwoord : team.huidigAntwoord
            };
            console.log(teamantwoord);
            kwizmeestertData.teamantwoorden.push(teamantwoord);
        });

        websocket.send(JSON.stringify(kwizmeestertData))
    }
};

module.exports = functie;