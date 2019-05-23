// var socket = io();
// event is emitted from this line
// event emitted is 'connection'
// so the connection is established

var name = prompt('Enter your name')
var socket = io();
var users = [];
var user = document.getElementById('user');
let input = document.getElementById('inp');
let btn = document.getElementById('btn');
let usrsJoined = document.getElementById('usrsJoined');
let yourName = document.getElementById('yourName');
yourName.innerText = name;

btn.onclick = function(){
    let message = input.value;
    socket.emit('message2', {name: name, message:message});
}
socket.emit('message', {name: name});

socket.on('nameUser', (data)=>{
    console.log(data);
    users.push(data.d.name);
    displayUser(data.d.name);
    console.log(users);
})

socket.on('messg', (data)=>{
    console.log(data);
    // users.push(data.d.name);
    display(data.d);
    console.log(users);
})

function displayUser(User){
    var p = document.createElement('span');
    var text = document.createTextNode(`${User} online   `);
    p.append(text);
    usrsJoined.append(p);
}

function display(d) {
    let usr = d.name;
    let val = d.message;
    var p = document.createElement('p');
    var text = document.createTextNode(`${usr}: ${val} `);
    p.append(text);
    user.append(p);
} 