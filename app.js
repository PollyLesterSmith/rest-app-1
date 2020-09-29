const accessPass = require('./access.js')
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://pollyadmin:${accessPass}@learningcluster.rsfog.mongodb.net/todos?retryWrites=true&w=majority`;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    var currentTodos;
    MongoClient.connect(uri, (err, client) => {
        if (err) {console.log(`db connection error : ${err}`)} else {
            var db = client.db('todos');
            db.collection('todoText', (err, collection) => {
                collection.find().toArray( (err, results) => {
                    currentTodos = results;
                    logResults(currentTodos[0]);
                    function logResults(todosForDisplay) {
                        res.send(todosForDisplay.todoString);}
                })
            })
        }});
})

app.post('/', urlencodedParser, (req, res) => {
    var newTodos = req.body.todoText;
    MongoClient.connect(uri, (err, client) => {
        if (err) {console.log(`db connection error : ${err}`)} else {
            var db = client.db('todos');
            db.collection('todoText', (err, collection) => {
                
                collection.updateOne(
                    {"_id":mongodb.ObjectId("5f413f5a6e857a907f68d7d7")},
                    { $set: {"todoString":newTodos}})

                    logResults();
                    function logResults() {
                        console.log(newTodos);}
                
            })
        }});

})

app.listen(3000);