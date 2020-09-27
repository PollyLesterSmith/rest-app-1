const accessPass = require('./access.js')
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://pollyadmin:${accessPass}@learningcluster.rsfog.mongodb.net/todos?retryWrites=true&w=majority`;
const server = require('express');

var currentTodosTextResult;
var currentTodos;
MongoClient.connect(uri, (err, client) => {
    if (err) {console.log(`db connection error : ${err}`)} else {
        var db = client.db('todos');
        db.collection('todoText', (err, collection) => {
            collection.find().toArray( (err, results) => {
                currentTodos = results;
                currentResult();
            })
        })
    }})
;

function currentResult()
{
    currentTodosTextResult = currentTodos[0].todoString;
    console.log(currentTodos[0]);
}

