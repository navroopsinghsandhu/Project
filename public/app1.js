
(function(){
    var btn = document.getElementById('btn');
    var result = document.getElementById('result');
    var inp = document.getElementById('inp');
    var taskList = [];
    var idUpdate = 0;
    getArray();
    function networkRequest(){
    
        var val = inp.value;
      
        fetch(`/todo`, { 
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({"task": val, "bool": false })
         })
            .then(function(data){
                if(data.status !== 200) {
                    console.error('Internal Server Error')
                    return;
                }
                data.json()
                    .then(function(d){
                      console.log(d);
                      console.log(d.id[0].id); 
                    //   taskList.push(d.task);
                      display(d);
                      localStorage.setItem('task', JSON.stringify(taskList));
                    //   display(d);
                    })
            }).catch(function(e){
                console.log(e);
            })
    }
    function display(inf){
        let p = document.createElement('p');
        // console.log(inf.id);
        let data = document.createTextNode(inf.task);
        let span = document.createElement('span');
        let btn = document.createElement('button');
        let btnText = document.createTextNode('╳');
        let check = document.createElement('input');
        let Update = document.createElement('button');
        Update.innerText = 'edit'
        Update.addEventListener('click', edit)
        p.setAttribute('id', inf.id[0].id);
        check.setAttribute('type', 'checkbox');
        btn.addEventListener('click', deleteNode);
        check.addEventListener('change', checkState);
        btn.appendChild(btnText);
        span.appendChild(data);
        p.appendChild(check);
        p.appendChild(span);
        p.append(Update);
        p.appendChild(btn);
        result.appendChild(p);
    }
   
    function display2(inf){
        let p = document.createElement('p');
        // console.log(inf.id);
        let data = document.createTextNode(inf.name);
        let span = document.createElement('span');
        let btn = document.createElement('button');
        let btnText = document.createTextNode('╳');
        let check = document.createElement('input');
        let Update = document.createElement('button');
        Update.innerText = 'edit'
        Update.addEventListener('click', edit)
        p.setAttribute('id', inf.id);
        check.setAttribute('type', 'checkbox');
        check.checked = inf.done;
        btn.addEventListener('click', deleteNode);
        check.addEventListener('change', checkState);
        btn.appendChild(btnText);
        span.appendChild(data);
        p.appendChild(check);
        p.appendChild(span);
        p.append(Update);
        p.appendChild(btn);
        result.appendChild(p);
    }

    function deleteNode(){
       let that = this; 
    //    var eltext = this.previousSibling.textContent;
       var id = this.parentElement.id;
    //    var index = taskList.indexOf(eltext);
       delfromServer(id)
         .then(function(data){
            that.parentNode.remove();
            console.log(data);
         })
      
    }

    function checkState(event){
        let state = event.target.checked;
        let id = this.parentNode.id;
        fetch(`/update`, { 
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({"bool": state, "id": id })
         })
            .then(function(data){
                if(data.status !== 200) {
                    console.error('Internal Server Error')
                    return;
                }
                data.text()
                    .then(function(d){
                        console.log(d);
                    //   loader.style.display = 'none'; 
                    //   result.style.backgroundColor = '#0000003b';
                    //   console.log(d); 
                    //   taskList.push(d);
                      //display(d);
                    //   localStorage.setItem('task', JSON.stringify(taskList));
                    //   display(d);
                    })
            }).catch(function(e){
                console.log(e);
            })
    }

    function delfromServer(id) {
        return new Promise(function(resolve, reject){
            fetch(`/del`, { 
                method: 'POST',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify({"id": id})
             })
                .then(function(data){
                    if(data.status !== 200) {
                        console.error('Internal Server Error')
                        return;
                    }
                    data.text()
                        .then(function(d){
                         
                          taskList = d;
                          resolve(d)
                          localStorage.setItem('task', JSON.stringify(taskList));
                        //   display(d);
                        })
                }).catch(function(e){
                    console.log(e);
                    reject(d);
                })
        })
       
    }

        function edit(){
        let obj = this.parentElement;
        // var text = this.parentElement.textContent;
         idUpdate = this.parentElement.id;
        let p = document.createElement('p')
         let newInp = document.createElement('input')
         let newBtn = document.createElement('button')
         newBtn.innerText = 'UPDATE'
         newBtn.addEventListener('click', update)
         p.append(newInp)
         p.append(newBtn)
         obj.parentElement.replaceChild(p, obj);
        
    }

    function update(){
       
     let obj = this.parentElement;
     let newValue = obj.children[0].value;
    //  let index = tasklist.indexOf(newValue)
    
     updatefromServer(idUpdate, newValue)
     .then(function(d){
         let newP = document.createElement('p')
         let data = document.createTextNode(newValue);
        let span = document.createElement('span');
        let btn = document.createElement('button');
        let btnText = document.createTextNode('╳');
        let check = document.createElement('input');
        let Update = document.createElement('button');
        Update.innerText = 'edit'
        Update.addEventListener('click', edit)
        newP.setAttribute('id', idUpdate);
        check.setAttribute('type', 'checkbox');
        btn.addEventListener('click', deleteNode);
        check.addEventListener('change', checkState);
        btn.appendChild(btnText);
        span.appendChild(data);
        newP.appendChild(check);
        newP.appendChild(span);
        newP.append(Update);
        newP.appendChild(btn);
        obj.parentElement.replaceChild(newP, obj);
        // console.log(data);
        
         })
    
    }
    function updatefromServer(ind, NValue){
        return new Promise(function(resolve, reject){
         fetch(`/updateValue`, {
             method:'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body:JSON.stringify({'id' : ind, 'newvalue' : NValue})
        })
        .then(function(data){
            if(data.status !== 200){
                return;
            }
    
            data.text()
            .then(function(d){
                // tasklist = d;
                console.log(d);
                resolve(d);
                // localStorage.setItem('taskss', tasklist);
            }).catch(function(e){
                console.log(e);
                // reject(d);
            })
        })
    })
   }

    function getArray(){
        // taskList =  JSON.parse(localStorage.getItem('task') ) || [];
        if(taskList.length !== 0){
            taskList = JSON.parse(localStorage.getItem('task') );
           }
        if(taskList.length === 0) {
            fetch(`/data`, { mode: 'no-cors' })
            .then(function(data){
                if(data.status !== 200) {
                    return;
                }
                data.json()
                    .then(function(d){
                      console.log(d); 
                      taskList = d;
                      localStorage.setItem('task', JSON.stringify(taskList));
                      d.forEach(function(i){
                         display2(i);
                      })
                    })
            })
        }

        else {
            taskList.forEach(function(i){
                display(i);
              })
        }
      

    }

    btn.onclick = function(){
        networkRequest();

    }
})()




//---------------------------------------------------
// (function(){
//     var btn = document.getElementById('btn');
//     var result = document.getElementById('result');
//     var loader = document.getElementById('loader');
//     var inp = document.getElementById('inp');
//     var taskList = [];
//     getArray();
//     function networkRequest(){
//         result.style.backgroundColor = '#030303c4';
//         loader.style.display = 'block';
//         var val = inp.value;
      
//         fetch(`/add`, { 
//             method: 'POST',
//             headers: new Headers({'content-type': 'application/json'}),
//             body: JSON.stringify({"task": val, "bool" : false})
//          })
//             .then(function(data){
//                 if(data.status !== 200) {
//                     console.error('Internal Server Error')
//                     return;
//                 }
//                 data.json()
//                     .then(function(d){
//                       loader.style.display = 'none'; 
//                       result.style.backgroundColor = '#0000003b';
//                       console.log(d); 
//                       taskList.push(d);
//                       display(d);
//                       localStorage.setItem('task', JSON.stringify(taskList));
//                     //   display(d);
//                     })
//             }).catch(function(e){
//                 console.log(e);
//             })
//     }
//     function display(inf){
//         let p = document.createElement('p');
//         console.log(inf.id);
//         let data = document.createTextNode(inf.task);
        
//         let span = document.createElement('span');
//         let btn = document.createElement('button');
//         let btnText = document.createTextNode('delete');
//         let check = document.createElement('input');
//         check.setAttribute('type', 'checkbox');
//         check.addEventListener('change', checkState);
//         btn.addEventListener('click', deleteNode);
//         btn.appendChild(btnText);
//         span.appendChild(data);
//         p.append(check);
//         p.appendChild(span);
//         p.appendChild(btn);
//         result.prepend(p);
//     }

//     function checkState(event){
//         console.log(event.target.checked);
//     }
   
//     function deleteNode(){
//        let that = this; 
//        var eltext = this.previousSibling.textContent;
//        var index = taskList.indexOf(eltext);
//        delfromServer(index)
//          .then(function(data){
//             that.parentNode.remove();
//             console.log(data);
//          })
      
//     }

//     function delfromServer(ind) {
//         return new Promise(function(resolve, reject){
//             fetch(`/del`, { 
//                 method: 'POST',
//                 headers: new Headers({'content-type': 'application/json'}),
//                 body: JSON.stringify({"id": ind})
//              })
//                 .then(function(data){
//                     if(data.status !== 200) {
//                         console.error('Internal Server Error')
//                         return;
//                     }
//                     data.json()
//                         .then(function(d){
//                           loader.style.display = 'none'; 
//                           result.style.backgroundColor = '#0000003b';
//                           taskList = d;
//                           resolve(d)
//                           localStorage.setItem('task', JSON.stringify(taskList));
//                         //   display(d);
//                         })
//                 }).catch(function(e){
//                     console.log(e);
//                     reject(d);
//                 })
//         })
       
//     }


//     function getArray(){
//         taskList =  JSON.parse(localStorage.getItem('task') ) || [];
//         if(taskList.length === 0) {
//             fetch(`/data`, { mode: 'no-cors' })
//             .then(function(data){
//                 if(data.status !== 200) {
//                     return;
//                 }
//                 data.json()
//                     .then(function(d){
//                       console.log(d); 
//                       taskList = d;
//                       localStorage.setItem('task', JSON.stringify(taskList));
//                       d.forEach(function(i){
//                         display(i);
//                       })
//                     })
//             })
//         }

//         else {
//             taskList.forEach(function(i){
//                 display(i);
//               })
//         }
      

//     }

//     btn.onclick = function(){
//         networkRequest();

//     }
// })()