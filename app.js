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
                logResullts(currentTodos[0]);
                function currentTodos(todosForDisplay) {
                    console.log('this is also called');
                    console.log(todosForDisplay);}
                console.log('this is called');
            })
        })
    }})
;



