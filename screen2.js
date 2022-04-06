
const urlParams = new URLSearchParams(window.location.search);
const index = urlParams.get('index');


displayTask();

function displayTask() {

var tasks = JSON.parse(localStorage.getItem("items"))[index];
//console.log(tasks.Itemname);

let html = "";

html = `
            <div class="task-container">
              <h2 class="counter">Task ${parseInt(index)+1}</h2>
              <hr>
                <h3 class="addtxt" id="${index}">Item Name: ${tasks.Itemname}</h3>
                <h3 class="choice">State: ${tasks.State}</h3>
                <h3 class="txt">Description: ${tasks.Description}</h3>
                <h3 class="pick">Team: ${tasks.Team}</h3>
                <h3 class="dueDate">Due Date: ${tasks.DueDate}</h3>
                <h3 class="doneDate">Done Date: ${tasks.DoneDate}</h3>
                  <div class="bottom">
                  <button class="editTask" onclick="editItem(this.id)" id=${index}>Edit</button>
                </div>
            </div>
          
            `;

let taskElement = document.getElementById("tasks");
taskElement.innerHTML = html;
}

const modal = document.querySelector('#modal');

const closebtn = document.querySelector('#closebtn');

closebtn.addEventListener('click', () => {
    modal.close();
});

//Function to Edit values in modal
function editItem(index) {

    modal.showModal();

    let tasks = JSON.parse(localStorage.getItem("items"))[index];

    // var addtxt = document.getElementById("addtxt").value;
    // var choice = document.getElementById("choice").value;
    // var txt = document.getElementById("txt").value;
    // var pick = document.getElementById("pick").value;
    // var dueDate = document.getElementById("dueDate").value;
    // var doneDate = document.getElementById("doneDate").value;

    // if (addtxt.value != "" || choice.value != "" || txt.value != "" || pick.value != "" ||
    //     dueDate.value != "" || doneDate.value != "") {
    //     return alert("")
    // }

        document.getElementById("addtxt").value = tasks.Itemname;
        document.getElementById("choice").value= tasks.State;
        document.getElementById("txt").value = tasks.Description;
        document.getElementById("pick").value = tasks.Team;
        document.getElementById("dueDate").value= tasks.DueDate;
        document.getElementById("doneDate").value= tasks.DoneDate;

}

//Function to save modal
var savebtn=document.getElementById("savebtn");

savebtn.addEventListener('click',function(e){

    var addtxt = document.getElementById("addtxt");
    var choice = document.getElementById("choice");
    var txt = document.getElementById("txt");
    var pick = document.getElementById("pick");
    var dueDate = document.getElementById("dueDate");
    var doneDate = document.getElementById("doneDate");

    if(addtxt.value=="" || choice.value=="" || txt.value=="" || pick.value=="" || dueDate.value=="" || doneDate.value=="")
    {
        return alert("Enter all details");
    }
    
    let tasks=localStorage.getItem("items");

    if(tasks == null)
    {
        tasksObj=[];
    }else{
        tasksObj=JSON.parse(tasks);
    }
    let myObj={
        Itemname: addtxt.value,
        State: choice.value,
        Description: txt.value,
        Team: pick.value,
        DueDate:dueDate.value,
        DoneDate:doneDate.value
    }

    tasksObj.splice(index,1,myObj);
    localStorage.setItem("items",JSON.stringify(tasksObj));
    addtxt.value="";
    choice.value="";
    txt.value="";
    pick.value="";
    dueDate.value="";
    doneDate.value="";
    //console.log(tasksObj);
    displayTask();

});


