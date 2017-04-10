var functie = function(teamnaam, goedgekeurd, session, websocket){
    const kwiz = session.kwizzen.find(x => x.kwizmeestertSocket === websocket);
    if(kwiz) {
        kwiz.huidigevraag.vraag = vraag.question;
        kwiz.huidigevraag.antwoord = vraag.answer;
        let scorebordSocket = kwiz.beamerSocket;
        if(scorebordSocket){
            scorebordData = {
                Type: "scorebordgecontroleerdantwoord",
                teamnaam: teamnaam,
                goedgekeurd: goedgekeurd
            };
            scorebordSocket.onopen = function (event) {};
            scorebordSocket.send(JSON.stringify(scorebordData));
        }
        const team = kwiz.teams.find(x => x.teamnaam === teamnaam);
        if(team){
            team.vragenGoed++;
        }
    }
};

module.exports = functie;