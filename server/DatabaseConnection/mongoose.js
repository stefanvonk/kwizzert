var mongoose = require('mongoose');
var fs = require('fs');

var dbName = 'questions';

var questionSchema = mongoose.Schema({
    name: String,
    answer: String,
    category: String
});

var Question = mongoose.model("Questions", questionSchema);

class Mongo {

    static getInstance(){
        if(this.database == undefined) {
            this.database = new Mongo();
        }
        return this.database;
    }

    constructor(){
        mongoose.connect('mongodb://localhost/' + dbName);
    }

    fillDatabase() {
        let fileName = 'DatabaseConnection/Questions.json';
        let data = fs.readFileSync(fileName, {encoding: 'utf8'});
        let dataJSON = JSON.parse(data);

        dataJSON.forEach(function (questionJSON, index) {
            let question = new Question({
                name: questionJSON.question,
                answer: questionJSON.answer,
                category: questionJSON.category
            });

            question.save(function (err) {
                if (err) console.log(err);
            })
        });
    }

    getQuestionsByCategories(categories, callback){
        Question.find({ category: { "$in" : categories} }, function (err, questions) {
            if (err) return console.error(err);
            callback (questions);
        });
    }

    getQuestionsByCategorie(categorie, callback){
        Question.find({ category: categorie }, function (err, questions) {
            if (err) return console.error(err);
            callback (questions);
        });
    }

    getAllQuestions(callback){
        Question.find(function (err, questions) {
            if (err) return console.error(err);
            callback (questions);
        })
    }

    isEmpty(callback){
        Question.find(function (err, questions) {
            if (err) return console.error(err);
            if(questions.length == 0){
                callback(true);
            }
            else{
                callback(false);
            }
        })
    }

    getAllCategories(callback){
        Question.find().distinct("category", function(err, categories){
            if (err) return console.error(err);
            callback (categories);
        })
    }
}

//*********************De volgende code wordt nooit uitgevoerd. Het staat hier alleen als voorbeeld hoe dit te gebruiken.**********

if(false){
    database.getAllQuestions(function (callback){
        callback.forEach(function (question, index){
            console.log("Question" + index + ": " + question.name);
        });
    });
}

let categories = ["Art and Literature", "Music", "History"];

if(false){
    database.getQuestionsByCategories(categories, function (callback){
        callback.forEach(function (question, index){
            console.log("Question" + index + ": " + question.name);
        });
    });
}

let categorie = "music";

if(false){
    database.getQuestionsByCategorie(categorie, function (callback){
        callback.forEach(function (question, index){
            console.log("Question" + index + ": " + question.name);
        });
    });
}

if(false){
    database.getAllCategories(function (callback){
        console.log(callback);
    });
}

//*********************************************************************************************************************

module.exports = Mongo;