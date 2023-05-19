let addButton = document.querySelector('.addButton');
  
  let todoList = document.getElementById('list');
  let taskInput;
  let todoObj={
    "input":"",
  }
  function deleteButton(){
    let allDeleteButton = document.querySelectorAll('.del');
    console.log("test")
    allDeleteButton.forEach((element,index)=>{ 
      element.addEventListener("click",()=>{
        fetch("http://192.168.0.153:5000/delete",{
          method:"POST",
          body:JSON.stringify({"index": index }),
          headers:{
              "Content-Type": "application/json"
          }
        }).then((res)=>res.json()).then((el)=>{
         console.log("el",el)
          document.querySelectorAll('li').forEach((value)=>{
            value.remove();
          });
          el.forEach((val)=>{
            let li1 = createTaskElement(val.Task);
            todoList.appendChild(li1);
          })
          deleteButton();
        })
        .catch((Error)=>{
          console.log("error:",Error)
        })
   
        //console.log("indexValue",index)
      })
    })
  }
  
  function addTask() {
    taskInput = document.getElementById('task').value;
    todoObj.input=taskInput;

   let taskText = taskInput
   if (taskText !== '') {
   
     fetch("http://192.168.0.153:5000/add",{
       method:"POST",
       body:JSON.stringify(todoObj),
       headers:{
           "Content-Type": "application/json"
       }
     }).then((el)=>el.json()).then((el)=>{
       document.querySelectorAll('li').forEach((value)=>{
    
         value.remove();
       });
       el.forEach((val)=>{
         let li1 = createTaskElement(val.Task);
         todoList.appendChild(li1);
       })

       deleteButton();
      
       taskInput.value = '';
     })
     
   } else {
     alert("Enter data");
   }
  }

  function createTaskElement(taskText) {
    let li = document.createElement('li');
    li.textContent = taskText;

    let editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.setAttribute("class","ed")
    editButton.addEventListener('click', function() {
      let newText = prompt("Enter new task:", taskText);
      if (newText != null) {
        li.textContent = newText;
        li.appendChild(editButton);
        li.appendChild(deleteButton);
      }
    });

    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("class","del")

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    
    return li;
  }

  addButton.addEventListener('click', addTask);