const mongoose = require('./../DatabaseConnection/mongoose.js');

var functie = function(websocket, categories){
    websocket.onopen = function (event) {};
    let database = mongoose.getInstance();

    database.getQuestionsByCategories(categories, function (callback){
        callback.forEach(function (question, index){
            let data = {
                Type: "ontvangstvragen",
                vragen: question
            };
            websocket.send(JSON.stringify(data))
        });
    });
};

module.exports = functie;