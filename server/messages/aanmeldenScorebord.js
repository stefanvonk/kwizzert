var functie = function(code, session, websocket){
    let data = {
        Type: "scorebordgeaccepteerd"
    }
    const kwiz = session.kwizzen.find(x => x.code === code);
    if(kwiz){
        kwiz.beamerSocket = websocket;

        data = {
            melding: "geaccepteerd"
        }
    } else{

        data = {
            melding: "code niet correct"
        }
    }

    websocket.onopen = function (event) {};
    websocket.send(JSON.stringify(data));
    return session;
};

module.exports = functie;