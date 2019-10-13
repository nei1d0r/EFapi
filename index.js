const express = require('express');
//import body-parser middleware, to handle req.body data from routes
const bodyparser = require('body-parser');
//import mongoose
const mongoose = require('mongoose');
// Setup express app
const app = express(); 

//connect to mongodb
mongoose.connect('mongodb://localhost/EFcustomers');
mongoose.Promise = global.Promise;

//set view engine to EJS
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '../public'));

//init body-parser, for json
app.use(bodyparser.json());

//import and use 'routes' module
app.use('/api',require('./routes/api'));

//error handling middleware
app.use(function(err, req, res, next){
    //console.log(err);
    res.status(422).send({error:err.message});
});

//listen for requests set to listen to environment port variable |or| local test port (4000)
app.listen(process.env.port || 4000, function(){
    console.log('Ready to serve you!');
});