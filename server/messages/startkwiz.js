const mongoose = require('./../DatabaseConnection/mongoose.js');

var functie = function(websocket){
    websocket.onopen = function (event) {};

    let database = mongoose.getInstance();
    database.getAllCategories(function (callback){
        let data = {
            Type: "ontvangstcategorieen",
            categorieen: callback
        }
        websocket.send(JSON.stringify(data))
    });
};

module.exports = functie;