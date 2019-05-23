


const MongoDb = require('mongodb').MongoClient;
// const assert = require('assert');
const username = 'navroops806';
const password = 'Sandhu0751';
const url = `mongodb+srv://navroops806:Sandhu0751@cluster0-yas34.mongodb.net/test?retryWrites=true`;
let collection = '';
const dbName =  'todolist';

function connect(cb){
    MongoDb.connect(url, function(err, client){
        console.log('Connected to the server');
        const db = client.db(dbName);
        collection = db.collection('todocollection');
        cb();
        // insertDocs();
        // findDocuments(db);
    });
}

// const findDocuments = function(db) {
//     // Get the documents collection
//     // const collection = db.collection('todocollection');
//     // Find some documents
//       collection.find({}).toArray(function(err, docs) {
//       assert.equal(err, null);
//       console.log("Found the following records");
//       console.log(docs)
//     //   callback(docs);
//     });
//   }


function insertDocs(tasks, cb){
    collection.insertMany([{a:tasks}], function(err, result){
        console.log(result);
        cb();
    });
}

function getTasks(cb){
    collection.find({}).toArray(function(err, docs){
        cb(docs);
    })
}

module.exports = {
    connect: connect,
    insertDocs: insertDocs,
    getTasks: getTasks
}

