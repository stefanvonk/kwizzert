var express     = require('express');
// var bodyParser  = require('body-parser');
var path        = require('path');

var app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

//Nog een keer naar kijken waarom dit werkt en hoe dit beter kan.
app.use('/', express.static(path.join(__dirname, '../Clients/team/build')));
app.use('/', express.static(path.join(__dirname, '../Clients/kwizmeestert/build')));
app.use('/', express.static(path.join(__dirname, '../Clients/scorebord/build')));
app.use('/kwizmeestert', express.static(path.join(__dirname, '../Clients/kwizmeestert/build')));
app.use('/team', express.static(path.join(__dirname, '../Clients/team/build')));
app.use('/scorebord', express.static(path.join(__dirname, '../Clients/scorebord/build')));

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/Clients/kwizmeestert/build/index.html'));
// })

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})