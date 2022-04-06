fetch("index.json")
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        console.log(localStorage.getItem('items'));
        if ((localStorage.getItem('items') || []).length === 0) {
            window.localStorage.setItem('items', JSON.stringify(data.items));
            displayCards();
        }
        else {
            displayCards();
        }
    })

    .catch(function (err) {
        console.log('error:' + err);
    });

displayCards();
// Display local storage values on the cards
function displayCards() {
    let items = localStorage.getItem("items");
    let itemsObj;
    if (items == null) {
        itemsObj = [];
    } else {
        itemsObj = JSON.parse(items);
    }

    let html = "";
    itemsObj.forEach(function (element, index) {
        html += `
        <div class="inputData">
          <h2 class="count">Task ${index + 1}</h2>
          <hr>
            <p class="addtxt" onclick=showTask(this.id) id="${index}">Item Name: ${element.Itemname}</p>
            <p class="choice">State: ${element.State}</p>
            <p class="txt">Description: ${element.Description}</p>
            <p class="pick">Team: ${element.Team}</p>
            <p class="dueDate">Due Date: ${element.DueDate}</p>
            <p class="doneDate">Done Date: ${element.DoneDate}</p>
              <div class="footer">

                 <button type="button" class="btn-primary" onclick="deleteItem(this.id)" id="${index}">Delete</button>
            </div>
        </div>
      
        `;
    });

    let itemElement = document.getElementById("items");
    if (itemsObj.length != 0) {
        itemElement.innerHTML = html;
    }
    else {
        itemElement.innerHTML = ``;
    }

}


const modal = document.querySelector('#modal');
const addbtn = document.querySelector('#addbtn');
const closebtn = document.querySelector('#closebtn');

// function to open modal
addbtn.addEventListener('click', () => {
    modal.showModal();
});

//function to close modal
closebtn.addEventListener('click', () => {
    modal.close();
});

// Store input to local storage 
var savebtn = document.getElementById("savebtn");
savebtn.addEventListener('click', function (e) {

    var addtxt = document.getElementById("addtxt");
    var choice = document.getElementById("choice");
    var txt = document.getElementById("txt");
    var pick = document.getElementById("pick");
    var dueDate = document.getElementById("dueDate");
    var doneDate = document.getElementById("doneDate");

    if (addtxt.value == "" || choice.value == "" || txt.value == "" || pick.value == "" || dueDate.value == "" || doneDate.value == "") {
        return alert("Enter all details");
    }
    let itemsObj;

    let items = localStorage.getItem("items");
    if (items == null) {
        itemsObj = [];
    } else {
        itemsObj = JSON.parse(items);
    }
    let myObj = {
        Itemname: addtxt.value,
        State: choice.value,
        Description: txt.value,
        Team: pick.value,
        DueDate: dueDate.value,
        DoneDate: doneDate.value
    }

    itemsObj.push(myObj);
    localStorage.setItem("items", JSON.stringify(itemsObj));
    addtxt.value = "";
    choice.value = "";
    txt.value = "";
    pick.value = "";
    dueDate.value = "";
    doneDate.value = "";
    //console.log(itemsObj);
    modal.close();
    displayCards();


});

function showTask(index) {
    window.open('../screen/screen2.html?index=' + index);
}

//Function to delete values
function deleteItem(index) {
    let items = localStorage.getItem("items");
    if (items == null) {
        itemsObj = [];
    } else {
        itemsObj = JSON.parse(items);
    }

    itemsObj.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(itemsObj));
    displayCards();
}

// function editItem(index){

//     let items=localStorage.getItem("items");

//     var addtxt = document.getElementById("addtxt");
//     var choice = document.getElementById("choice");
//     var txt = document.getElementById("txt");
//     var pick = document.getElementById("pick");
//     var dueDate = document.getElementById("dueDate");
//     var doneDate = document.getElementById("doneDate");

//     if(addtxt.value!="" || choice.value!="" || txt.value!="" || pick.value!=""||
//     dueDate.value!="" || doneDate.value!=""){
//         return alert("")
//     }

//     if(items == null){
//         itemsObj=[];
//     }else{
//         itemsObj=JSON.parse(items);
//     }

//     itemsObj.findIndex((element,index)=>{
//         addtxt.value=element.Itemname;
//         choice.value=element.State;
//         txt.value=element.Description;
//         pick.value=element.Team;
//         dueDate.value=element.DueDate;
//         doneDate.value=element.DoneDate;
//     })

//     itemsObj.splice(index,1);
//     localStorage.setItem("items",JSON.stringify(itemsObj));
//     displayCards();

// }

//window.open('http://127.0.0.1:5500/screen2.html?index=' + index);






