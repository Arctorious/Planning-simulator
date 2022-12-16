const array1 = ["User id", "First Name", "Last Name", "Email address", "Email Notification setting", "password"];

const array2 = ["Event id", "Event Name", "Event Description", "Year", "Month", "Day", "Starting time", "Ending time", "Finalisation status", "Host id", "invite code"];


var main = document.getElementsByTagName("main")[0];
var table = document.getElementsByTagName("table")[0];
const params = new URLSearchParams(window.location.search);
var p = params.get('pg');
var id = 0;

function removeUser() {
    var element = document.getElementById(this.value);
    var deluser = new XMLHttpRequest();
    deluser.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            element.remove();
        }
    }
    deluser.open("GET", "/admin/delUser/" + this.name, true);
    deluser.send();
}

function removeEvent() {
    var element = document.getElementById(this.value);
    var delevent = new XMLHttpRequest();
    delevent.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            element.remove();
        }
    }
    delevent.open("GET", "/admin/delEvent/" + this.name, true);
    delevent.send();
}

if (p == 1) {
    var gUser = new XMLHttpRequest();
    gUser.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var tr1 = document.createElement("tr");
            for (let i = 0; i < array1.length + 1; i++) {
                if (i === array1.length) {
                    let tmp = document.createElement("th");
                    tr1.appendChild(tmp);
                }
                else{
                let tmp = document.createElement("th");
                tmp.innerHTML = array1[i];
                tr1.appendChild(tmp);
                }
            }
            table.appendChild(tr1);

            var json = JSON.parse(this.response);
            for (let j = 0; j < json.length; j++) {
                var tr2 = document.createElement("tr");
                let but = document.createElement("button");
                for (let x in json[j]) {
                    let tmp = document.createElement("td");
                    if(x == "UserId"){
                        but.name = json[j][x];
                    }
                    tmp.innerHTML = json[j][x];
                    tr2.appendChild(tmp);
                }
                let tmp = document.createElement("th");
                but.innerHTML = "remove";
                but.value = id;
                but.addEventListener("click", removeUser);
                tmp.appendChild(but);
                tr2.appendChild(tmp);
                tr2.id = id;
                id++;
                table.appendChild(tr2);
            }
        }
    }
    gUser.open("GET", '/admin/getUsers', true);
    gUser.send();
}
else if (p == 2) {
    var gEvents = new XMLHttpRequest();
    gEvents.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var tr1 = document.createElement("tr");
            for (let i = 0; i < array2.length + 1; i++) {
                if (i === array2.length) {
                    let tmp = document.createElement("th");
                    tr1.appendChild(tmp);
                }
                else {
                    let tmp = document.createElement("th");
                    tmp.innerHTML = array2[i];
                    tr1.appendChild(tmp);
                }

            }
            table.appendChild(tr1);
            var json = JSON.parse(this.response);
            for (let j = 0; j < json.length; j++) {
                var tr2 = document.createElement("tr");
                let but = document.createElement("button");
                for (let x in json[j]) {
                    let tmp = document.createElement("td");
                    if(x == "Event_Id"){
                        but.name = json[j][x]
                    }
                    tmp.innerHTML = json[j][x];
                    tr2.appendChild(tmp);
                }
                let tmp = document.createElement("th");
                but.innerHTML = "remove";
                but.value = id;
                but.addEventListener("click", removeEvent);
                tmp.appendChild(but);
                tr2.appendChild(tmp);
                tr2.id = id;
                id++;
                table.appendChild(tr2);
            }
        }
    }
    gEvents.open("GET", "/admin/getEvents", true);
    gEvents.send();
}