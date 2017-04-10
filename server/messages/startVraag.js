var functie = function(vraag, session, websocket){
    //Mogelijk eerst wat checks.
    const kwiz = session.kwizzen.find(x => x.kwizmeestertSocket === websocket);
    if(kwiz) {
        kwiz.gesteldeVragen.push(vraag._id);
        kwiz.huidigevraag.vraag = vraag.name;
        kwiz.huidigevraag.antwoord = vraag.answer;
        let scorebordSocket = kwiz.beamerSocket;
        if(scorebordSocket){
            scorebordData = {
                Type: "scorebordvraag",
                rondenummer: Math.floor(kwiz.gesteldeVragen.length / 12),
                vraagnummer: (kwiz.gesteldeVragen.length % 12),
                vraag: vraag.name,
                categorie: vraag.category
            };
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