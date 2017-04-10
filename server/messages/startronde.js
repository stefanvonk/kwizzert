const mongoose = require('./../DatabaseConnection/mongoose.js');

var functie = function(websocket, categories, session){
    websocket.onopen = function (event) {};
    let database = mongoose.getInstance();

    const kwiz = session.kwizzen.find(x => x.kwizmeestertSocket === websocket);

    function vragenOphalen (callback) {
        let randomQuestions = [];

        categories.forEach(function (categorie) {
            database.getQuestionsByCategorie(categorie, function (callback) {
                let i = 0;
                while (i < 3) {
                    let randomVraag = callback[Math.floor(Math.random() * callback.length)];
                    if (!randomQuestions.includes(randomVraag && !kwiz.gesteldeVragen.includes(randomVraag._id))) {
                        randomQuestions.push(randomVraag)
                        i++;
                    }
                }
                ;
                console.log(randomQuestions)
            });
        });
        callback(randomQuestions);
    }

    vragenOphalen(function (callback){
        let data = {
            Type: "ontvangstvragen",
            vragen: callback
        };
        websocket.send(JSON.stringify(data))
    });
};

module.exports = functie;