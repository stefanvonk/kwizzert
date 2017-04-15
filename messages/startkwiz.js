const mongoose = require('./../DatabaseConnection/mongoose.js');

var functie = function(websocket){
    websocket.onopen = function (event) {};

    let database = mongoose.getInstance();
    database.getAllCategories(function (callback){
        callback.forEach(function (item) {
            let data = {
                Type: "ontvangstcategorieen",
                categorieen: item
            };
            websocket.send(JSON.stringify(data))
        })
    });
};

module.exports = functie;