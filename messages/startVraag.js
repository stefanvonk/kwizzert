var functie = function(vraag, session, websocket){
    //Mogelijk eerst wat checks.
    const kwiz = session.kwizzen.find(x => x.kwizmeestertSocket === websocket);
    if(kwiz) {
        kwiz.gesteldeVragen.push(vraag._id);
        kwiz.huidigevraag.vraag = vraag.name;
        kwiz.huidigevraag.antwoord = vraag.answer;
        kwiz.teams.forEach(function (team) {
            team.huidigAntwoord = "Geen antwoord gegeven.";
        });
        let scorebordSocket = kwiz.beamerSocket;
        if(scorebordSocket){
            scorebordData = {
                Type: "scorebordvraag",
                rondenummer: Math.floor((kwiz.gesteldeVragen.length -1) / 12),
                vraagnummer: (kwiz.gesteldeVragen.length % 12),
                vraag: vraag.name,
                categorie: vraag.category
            };
            if(scorebordData.vraagnummer == 0) scorebordData.vraagnummer = 12;
            scorebordData.rondenummer++;
            scorebordSocket.onopen = function (event) {};
            scorebordSocket.send(JSON.stringify(scorebordData));
        }
        kwiz.teams.forEach(function (team) {
            let teamSocket = team.teamSocket;
            let teamData = {
                Type: "ontvangstvraag",
                vraag: vraag.name
            };
            teamSocket.onopen = function (event) {};
            teamSocket.send(JSON.stringify(teamData));
        });
    }
};

module.exports = functie;