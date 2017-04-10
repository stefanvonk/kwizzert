const mongoose = require('./../DatabaseConnection/mongoose.js');

var functie = function(websocket, categories, session){
    websocket.onopen = function (event) {};
    let database = mongoose.getInstance();
    let randomQuestions = [];
    let vragenInArray =[];

    let vragenOphalen = function (callback) {
        session.kwizzen.forEach(function (vraag) {
            Array.prototype.push.apply(vragenInArray, vraag.gesteldeVragen);
        });
        categories.forEach(function (categorie){
            database.getQuestionsByCategorie(categorie, function (callback){
                let i = 0;
                while (i < 3) {
                    randomVraag = callback[Math.floor(Math.random() * callback.length)];
                    randomQuestions.forEach(function (vraag) {
                        vragenInArray.push(vraag._id);
                    });

                    if(randomVraag._id !== vragenInArray.includes(randomVraag._id) | session){
                        randomQuestions.push(randomVraag)
                        i++;

                    }
                };
            });

        });
        console.log(vragenInArray)
        console.log(randomQuestions)
        callback(randomQuestions)
    }

    function foo (questions) {
        let data = {
            Type: "ontvangstvragen",
            vragen: questions
        };

        websocket.send(JSON.stringify(data))
        console.log("hij komt in de callback")
    }

    vragenOphalen(foo);
};

module.exports = functie;