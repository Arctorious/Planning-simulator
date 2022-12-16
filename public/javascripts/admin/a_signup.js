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

var passed = false;
var con_pass = document.getElementById("inp-pass_con");

con_pass.oninput = function () {
    var pass = document.getElementById("inp-pass").value;
    var failcon = document.getElementById("con_fail");

    var paragraph = document.createElement("i");
    var failmsg = document.createElement("p");
    if (pass != "") {
        if (con_pass.value != pass) {
            failcon.innerHTML = "";
            passed = false;
            paragraph.innerHTML = "Your passwords does not match!";
            failmsg.appendChild(paragraph);
            failmsg.classList.add("fail-message");
            failcon.appendChild(failmsg);
        }
        else {
            failcon.innerHTML = "";
            passed = true;
            paragraph.innerHTML = "Your password matches";
            failmsg.appendChild(paragraph);
            failmsg.classList.add("success-message");
            failcon.appendChild(failmsg);
        }
    }
};

var register = document.getElementById("register-r");
var registered = false;

register.onmouseup = function () {
    this.classList.remove("darker");

    var failsect = document.getElementById("fail-section");
    var failmsg = document.createElement("p");
    var paragraph = document.createElement("i");

    var name = document.getElementById("inp-email").value;
    var pass = document.getElementById("inp-pass").value;
    if (!registered) {
        if (!name || !pass) {
            failsect.innerHTML = "";
            paragraph.innerHTML = "Please fill out all the areas";
            failmsg.appendChild(paragraph);
            failmsg.classList.add("fail-message");
            failsect.appendChild(failmsg);
        }
        else if (passed) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    var response = this.response;
                    if(response == "[]"){
                        failsect.innerHTML = "";
                        paragraph.innerHTML = "Register success! You can continue to register another admin.";
                        failmsg.appendChild(paragraph);
                        failmsg.classList.add("success-message");
                        failsect.appendChild(failmsg);
                        var xhttp2 = new XMLHttpRequest();
                        xhttp2.open("POST", "/admin/addUser", true);
                        xhttp2.setRequestHeader("Content-type", "application/json");
                        xhttp2.send(JSON.stringify({
                            username: name,
                            password: pass
                        }));
                    }
                    else{
                        failsect.innerHTML = "";
                        paragraph.innerHTML = "Conflicting username. This username is already registered in the system.";
                        failmsg.appendChild(paragraph);
                        failmsg.classList.add("fail-message");
                        failsect.appendChild(failmsg);
                    }
                }
            };
            xhttp.open("GET", "/admin/testName/" + name, true);
            xhttp.send();
        }
    }
};
