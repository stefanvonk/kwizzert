const mongoose = require('./../DatabaseConnection/mongoose.js');

var functie = function(websocket, categories, session){
    websocket.onopen = function (event) {};
    let database = mongoose.getInstance();

    const kwiz = session.kwizzen.find(x => x.kwizmeestertSocket === websocket);

    function fillQuestionsAsync(categories, index, callback){
        function getQuestionsByCategorie(index, questions) {
            database.getQuestionsByCategorie(categories[index], function (callback) {
                let threeQuestions = [];
                let i = 0;
                while (i < 3) {
                    let randomVraag = callback[Math.floor(Math.random() * callback.length)];
                    if (!threeQuestions.includes(randomVraag && !kwiz.gesteldeVragen.includes(randomVraag._id))) {
                        threeQuestions.push(randomVraag)
                        i++;
                    }
                }
                questions (threeQuestions);
            });
        }

        if(index != 0){
            fillQuestionsAsync(categories, --index, function (allQuestions){
                getQuestionsByCategorie(index + 1, function (questions){
                    allQuestions.push.apply(allQuestions, questions);
                    callback(allQuestions)
                });
            });
        } else{
            getQuestionsByCategorie(0, function (questions){
                callback (questions);
            });
        }
    }

    fillQuestionsAsync(categories, categories.length -1, function (questions){
        let data = {
            Type: "ontvangstvragen",
            vragen: questions
        };
        websocket.send(JSON.stringify(data));
        console.log("callback: " + questions);
    });
};

module.exports = functie;