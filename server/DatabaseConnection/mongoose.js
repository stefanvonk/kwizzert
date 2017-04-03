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
    static fillDatabase() {
        mongoose.connect('mongodb://localhost/' + dbName);
        var fileName = 'DatabaseConnection/Questions.json';
        var data = fs.readFileSync(fileName, {encoding: 'utf8'});
        var dataJSON = JSON.parse(data);

        dataJSON.forEach(function (questionJSON, index) {
            console.log("Vraag in Database: " + index)
            var question = new Question({
                name: questionJSON.question,
                answer: questionJSON.answer,
                category: questionJSON.category
            });

            question.save(function (err) {
                if (err) console.log(err);
            })
        });
    }
}

module.exports = Mongo;