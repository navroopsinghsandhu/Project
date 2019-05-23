const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./db');
const bodyParser = require('body-parser');
//--------------------------
const http = require('http');            // this is the server of the node

const server = http.Server(app);         // express app is running on the server of node
const socket = require('socket.io');     //
const io = socket(server);  
//--------------------------
app.use('/', express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get('/todoList', (req, res)=>{
   // Database data 
   var task = req.query.q;
   var bool = req.query.b;
   db.insertData(task, bool, (data)=>{
       console.log(data);
       db.fetchList((data)=>{
        res.send(data);
      });
   })
});

app.get('/data', (req,res)=>{
   db.fetchData((data)=>{
       res.send(data);
   })
});

app.post('/del', function(req, res){
    let id = req.body.id;
    // tasks.splice(index,1);
    // res.send(tasks);
    db.deleteData(id, ()=>{
        res.sendStatus(200);
    })
    
 });

 app.post('/updateValue', function(req, res){
    let id = req.body.id;
    let newValue = req.body.newvalue;
    // tasks.splice(index,1);
    // res.send(tasks);
    db.updateName(id, newValue, ()=>{
        res.sendStatus(200);
    })
    
 });

app.post('/update', (req,res)=>{
  let bool = req.body.bool;
  let id = req.body.id;
  db.updateData(bool, id, ()=>{
    res.sendStatus(200);
  })
})

app.post('/todo', (req,res)=>{
    let task = req.body.task;
    let bool = req.body.bool;
    try {
      db.insertData(task, bool, (data)=>{
        db.fetchList(task, (id)=>{
          res.send({task: task, id: id});
        })
      
      })
    }
    catch(e){
      console.error(e);
    }  
})
//-------------------------------
io.on('connection', (s)=>{                    // whenever it gets an event named 'connection' io creates a connection

s.on('message', (data)=>{
       io.emit('nameUser', {d: data})
    })

    s.on('message2', (data)=>{
        io.emit('messg', {d: data})
     })

    console.log(s.id);
    console.log('connection established');

//    console.log(socket.id);
//    console.log('connection established');         // so to create a connection at any point throw an event named 'connection'
});
// io.on is only written one time in your code so that a single pipeline is there to communicate
 

//-------------------------------
server.listen(port, () => {
  console.log(`working on port ${port}`);
  db.connectDB();
})




//------------------------------------------------------------------------
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const db = require('./db');
// app.use('/', express.static('public'));
// const port = process.env.PORT || 5000;   // when we host our server on an a machine external to this where client is ruuning and no other port is occupied, there may occur an error that the port you've used in your code is occupied
//                                          // so in order to aboid this conflict instead of hard cos=ding the port we use this line of code which looks for the ports mentioned in env of process object 
//                                          // In there only those ports are availabe which are not being used currently

// app.use(bodyParser.urlencoded({extended : false}));
// app.use(bodyParser.text());
// app.use(bodyParser.json());
                                         
// app.get('/todoList', (req, res)=>{
//     //  database code
//     let task = req.query.q;
//     let bool = req.query.b;
//     db.insertData(task, bool,(data)=>{
//         console.log(data);
//         db.fetchList((data)=>{
//             res.send(data);
//             res.sendStatus(200);
//         });
//     })
   
// });

// app.post('/todo', (req, res)=>{
//     let task = req.body.task;
//     let bool = req.body.bool;
//     db.insertData(task, bool,(data)=>{
//         console.log(data);
//         db.fetchList(task, (id)=>{
//             res.send({task: task, id: id});
//             res.sendStatus(200);
//         });
//     })
// })

// app.listen(port, ()=>{
//     console.log(`Working on port ${port}`);
//     db.connectDB();
// })

// // () =>{

// // }
// // Generally this type of structure is used for callbacks 
// // This syntax works in the same manner as the normal syntax does with only a single difference being the difference of scope binding
