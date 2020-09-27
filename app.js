const accessPass = require('./access.js')
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://pollyadmin:${accessPass}@learningcluster.rsfog.mongodb.net/todos?retryWrites=true&w=majority`;
const express = require('express');
const app = express();

var currentTodosTextResult;
var currentTodos;
MongoClient.connect(uri, (err, client) => {
    if (err) {console.log(`db connection error : ${err}`)} else {
        var db = client.db('todos');
        db.collection('todoText', (err, collection) => {
            collection.find().toArray( (err, results) => {
                currentTodos = results;
                logResults(currentTodos[0]);
                function logResults(todosForDisplay) {
                    
                    console.log(todosForDisplay.todoString);}
                
            })
        })
    }})
;

app.get('/', (req, res) => {
    res.send('Hey hoe');
})

app.listen(3000)