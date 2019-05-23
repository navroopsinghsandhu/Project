
const mysql = require('mysql');
var connection = '';

function connectDB(){
     connection = mysql.createConnection({
        host : 'localhost',
        user : `root`,
        password : 'Sandhu0751',
        database : 'todoList'
    });

    connection.connect();
}

function fetchList(task, cb){
    connection.query(`Select id from todo WHERE name = '${task}'`, function(err, result){
        if(err) throw error; 
        
        cb(result);      
    })
}

function fetchData(cb){
    connection.query(`Select * from todo`, function(err, result){
        if(err) throw err;
        cb(result);
    })
}

function insertData(task, bool, cb){
    if(task === undefined || bool === undefined) return;
    connection.query(`INSERT INTO todo(name, done) VALUES('${task}', ${bool})`, function(err, result){
        if(err) throw error; 
        cb(result);      
    })
}

function updateData(bool, id, cb){
    connection.query(`UPDATE todo SET done=${bool} WHERE id = ${id}`,function(err, result){
      if(err) throw err;  
      cb();
    })
 }

 function updateName(id, task, cb){
    connection.query(`UPDATE todo SET name='${task}' WHERE id = ${id}`,function(err, result){
      if(err) throw err;  
      cb();
    })
 }

 function deleteData(id, cb){
    connection.query(`DELETE FROM todo WHERE id=${id}`,function(err, result){
      if(err) throw err;  
      cb();
    })
 }

module.exports = {
    connectDB,
    fetchList,
    insertData,
    fetchData, 
    updateData,
    deleteData,
    updateName
}

// An array of objects in which each object has key in the form of a string