const but = document.getElementsByClassName("button");

var logged = false;

var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");

box1.checked.onchange = function(){
    if(this == true){
        box2.checked = false;
    }
}
box2.checked.onchange = function(){
    if(this == true){
        box1.checked = false;
    }
}

function ifLogged() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if(this.response){
                var profile = document.getElementById("user");
                profile.href = window.location.href + "/users/profile.html";
                profile.innerHTML = this.response;
                var placeholder = document.getElementById("placeholder");
                var logoutButton = document.createElement("button");
                logoutButton.id = "login";
                logoutButton.innerHTML = "logout";
                placeholder.parentNode.replaceChild(logoutButton, placeholder);
                addFunctions();
                logoutButton.onmouseup = function(){
                    window.location.pathname = '/logout';
                }
            }
            else{
                window.alert("Restricted access! Redirecting....");
                window.location.pathname = '/';
            }
        }
    }
    xhttp.open("GET", '/tst', true);
    xhttp.send();
}

function addFunctions(){
    var buttons = document.getElementsByTagName("button");

    var siz = buttons.length;

    for (let i = 0; i < siz; i++) {
        buttons[i].onmouseover = function () {
            this.classList.add("lighter");
        };
        buttons[i].onmouseleave = function () {
            this.classList.remove("lighter");
        };
        buttons[i].onmousedown = function () {
            this.classList.add("darker");
        };
        buttons[i].onmouseup = function () {
            this.classList.remove("darker");
        };
    }

but[0].onmouseup = function () {
    this.classList.remove("darker");
    var failsect = document.getElementsByClassName("fail-section")[0];
    var failmsg = document.createElement("p");
    var paragraph = document.createElement("i");

    var fName = document.getElementById("fName").value;
    var lName = document.getElementById("lName").value;
    if(fName && lName){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var res = this.response;
                if(res == "[]"){
                    var xhttp2 = new XMLHttpRequest();
                    xhttp2.onreadystatechange = function(){
                        if(this.readyState == 4 && this.status == 200){
                            failsect.innerHTML = "";
                            paragraph.innerHTML = "Name changed";
                            failmsg.appendChild(paragraph);
                            failmsg.classList.add("success-message");
                            failsect.appendChild(failmsg);
                        }
                    }
                    xhttp2.open("POST", '/users/changeName', true);
                    xhttp2.setRequestHeader("Content-type", "application/json");
                    xhttp2.send(JSON.stringify({
                        firstName: fName,
                        lastName: lName
                    }));
                }
                else{
                    failsect.innerHTML = "";
                    paragraph.innerHTML = "Your new name can't be the same as your old name!";
                    failmsg.appendChild(paragraph);
                    failmsg.classList.add("fail-message");
                    failsect.appendChild(failmsg);
                }
            }
        }
        xhttp.open("POST", '/users/testName', true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({
            firstName: fName,
            lastName: lName
        }));
    }
    else{
        failsect.innerHTML = "";
        paragraph.innerHTML = "Please do not leave the input box(s) empty!";
        failmsg.appendChild(paragraph);
        failmsg.classList.add("fail-message");
        failsect.appendChild(failmsg);
    }
}

but[1].onmouseup = function () {
    this.classList.remove("darker");

    var failsect = document.getElementsByClassName("fail-section")[1];
    var failmsg = document.createElement("p");
    var paragraph = document.createElement("i");

    var mail = document.getElementById("mail").value;

    if(mail){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var res = this.response;
                if(res == "[]"){
                    var xhttp2 = new XMLHttpRequest();
                    xhttp2.onreadystatechange = function(){
                        failsect.innerHTML = "";
                        paragraph.innerHTML = "Email changed";
                        failmsg.appendChild(paragraph);
                        failmsg.classList.add("success-message");
                        failsect.appendChild(failmsg);
                    }
                    xhttp2.open("POST", '/users/changeEmail', true);
                    xhttp2.setRequestHeader("Content-type", "application/json");
                    xhttp2.send(JSON.stringify({email: mail}));
                }
                else{
                    failsect.innerHTML = "";
                    paragraph.innerHTML = "Your new email can't be the same as your old email!";
                    failmsg.appendChild(paragraph);
                    failmsg.classList.add("fail-message");
                    failsect.appendChild(failmsg);
                }
            }
        }
        xhttp.open("POST", '/users/testEmail', true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({email: mail}));
    }
    else{
        failsect.innerHTML = "";
        paragraph.innerHTML = "Please do not leave the input box(s) empty!";
        failmsg.appendChild(paragraph);
        failmsg.classList.add("fail-message");
        failsect.appendChild(failmsg);
    }
}

but[2].onmouseup = function () {
    this.classList.remove("darker");

    var failsect = document.getElementsByClassName("fail-section")[2];
    var failmsg = document.createElement("p");
    var paragraph = document.createElement("i");

    var pass = document.getElementById("pass").value;

    if(pass){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var res = this.response;
                if(res == "[]"){
                    var xhttp2 = new XMLHttpRequest();
                    xhttp2.onreadystatechange = function(){
                        failsect.innerHTML = "";
                        paragraph.innerHTML = "Password changed";
                        failmsg.appendChild(paragraph);
                        failmsg.classList.add("success-message");
                        failsect.appendChild(failmsg);
                    }
                    xhttp2.open("POST", '/users/changePass', true);
                    xhttp2.setRequestHeader("Content-type", "application/json");
                    xhttp2.send(JSON.stringify({password: pass}));
                }
                else{
                    failsect.innerHTML = "";
                    paragraph.innerHTML = "Your new password can't be the same as your old password!";
                    failmsg.appendChild(paragraph);
                    failmsg.classList.add("fail-message");
                    failsect.appendChild(failmsg);
                }
            }
        }
        xhttp.open("POST", '/users/testPass', true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({password: pass}));
    }
    else{
        failsect.innerHTML = "";
        paragraph.innerHTML = "Please do not leave the input box(s) empty!";
        failmsg.appendChild(paragraph);
        failmsg.classList.add("fail-message");
        failsect.appendChild(failmsg);
    }
}}

var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");

box1.onclick = function() {
    if(box1.checked == true){
        box2.checked = false;
    }
}

box2.onclick = function() {
    if(box2.checked == true){
        box1.checked = false;
    }
}

but[3].onmouseup = function () {
    this.classList.remove("darker");

    var failsect = document.getElementsByClassName("fail-section")[3];
    var failmsg = document.createElement("p");
    var paragraph = document.createElement("i");

    var out = 0;
    var bx1 = document.getElementById("box1").checked;
    var bx2 = document.getElementById("box2").checked;
    if(bx1 != false || bx2 != false){
        if(bx1 == true){
            out = 1;
        }
        else if(bx2 == true){
            out = 0;
        }
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", '/users/changeNot', true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({mailNot: out}));
    }
    else{
        failsect.innerHTML = "";
        paragraph.innerHTML = "Please do not leave the input box(s) empty!";
        failmsg.appendChild(paragraph);
        failmsg.classList.add("fail-message");
        failsect.appendChild(failmsg);
    }
}