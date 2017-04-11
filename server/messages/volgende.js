const mongoose = require('./../DatabaseConnection/mongoose.js');

var functie = function(session, websocket){
    const kwiz = session.kwizzen.find(x => x.kwizmeestertSocket === websocket);
    console.log(kwiz.gesteldeVragen.length);
    if(kwiz.gesteldeVragen.length % 12 == 0){
        let maxAntwoordenGoed = -1;
        let teamsMetPunten = 0;
        let minAntwoordenMetPunten= 0;
        kwiz.teams.forEach(function (team) {
            if(team.vragenGoed > maxAntwoordenGoed){
                maxAntwoordenGoed = team.vragenGoed;
            }
        });
        kwiz.teams.forEach(function (team) {
            if(team.vragenGoed == maxAntwoordenGoed){
                team.rondepunten += 4;
                teamsMetPunten++;
            }
        });
        minAntwoordenMetPunten = maxAntwoordenGoed;
        maxAntwoordenGoed = -1;
        if(teamsMetPunten == 1){
            kwiz.teams.forEach(function (team) {
                if(team.vragenGoed > maxAntwoordenGoed && team.vragenGoed < minAntwoordenMetPunten){
                    maxAntwoordenGoed = team.vragenGoed;
                }
            });
            kwiz.teams.forEach(function (team) {
                if(team.vragenGoed == maxAntwoordenGoed){
                    team.rondepunten += 2;
                    teamsMetPunten++;
                }
            });
            minAntwoordenMetPunten = maxAntwoordenGoed;
        }
        maxAntwoordenGoed = -1;
        if(teamsMetPunten == 2){
            kwiz.teams.forEach(function (team) {
                if(team.vragenGoed > maxAntwoordenGoed && team.vragenGoed < minAntwoordenMetPunten){
                    maxAntwoordenGoed = team.vragenGoed;
                }
            });
            kwiz.teams.forEach(function (team) {
                if(team.vragenGoed == maxAntwoordenGoed){
                    team.rondepunten += 1;
                    teamsMetPunten++;
                }
            });
            minAntwoordenMetPunten = maxAntwoordenGoed;
        }
        kwiz.teams.forEach(function (team) {
            if(team.vragenGoed < minAntwoordenMetPunten){
                team.rondepunten += 0.1;
            }
            team.vragenGoed = 0;
        });
        let scorebordSocket = kwiz.beamerSocket;

        if(scorebordSocket){
            let teamgegevens = [];
            kwiz.teams.forEach(function (team) {
                let teamGegevens = {
                    teamnaam: team.teamnaam,
                    antwoord: team.huidigAntwoord,
                    rondepunten: team.rondepunten,
                    vragengoed: team.vragenGoed
                };
                teamgegevens.push(teamGegevens);
            });

            scorebordData = {
                Type: "scorebordteamgegevens",
                rondenummer: Math.floor(kwiz.gesteldeVragen.length / 12),
                vraagnummer: (kwiz.gesteldeVragen.length % 12),
                teamgegevens: teamgegevens
            };
            scorebordSocket.onopen = function (event) {};
            scorebordSocket.send(JSON.stringify(scorebordData));
        }

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

    } else{
        let database = mongoose.getInstance();

        function fillQuestionsAsync(categories, index, callback){
            function getQuestionsByCategorie(index, questions) {
                database.getQuestionsByCategorie(categories[index], function (callback) {
                    let threeQuestions = [];
                    let i = 0;
                    while (i < 3) {
                        let randomVraag = callback[Math.floor(Math.random() * callback.length)];
                        if (!threeQuestions.includes(randomVraag) && !kwiz.gesteldeVragen.includes(randomVraag._id)) {
                            threeQuestions.push(randomVraag);
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

        let categories = kwiz.huidigeronde;

        fillQuestionsAsync(categories, categories.length -1, function (questions){
            let data = {
                Type: "ontvangstvragen",
                vragen: questions
            };
            websocket.onopen = function (event) {};
            websocket.send(JSON.stringify(data));
        });
    }
};

module.exports = functie;