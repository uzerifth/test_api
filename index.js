var express = require('express'),
    bodyParser = require ('body-parser'),
    expressJWT = require('express-jwt'),
    jwt = require('jsonwebtoken');
    cors = require('cors');

var urlencodedParser =  bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
// Initialize environment variables and also the sql connection pool
require('dotenv').config();

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '10mb'}));
app.use(cors());

app.use('/', require('./src/routes/main'));
var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('Server is running on port ' + port + '.');
});
