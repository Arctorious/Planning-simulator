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

var login = document.getElementById("login-l");
var logged_in = false;

login.onmouseup = function () {
    this.classList.remove("darker");

    var failsect = document.getElementById("fail-section");
    var failmsg = document.createElement("p");
    var paragraph = document.createElement("i");


    var email = document.getElementById("inp-email").value;
    var pass = document.getElementById("inp-pass").value;
    if (!logged_in) {
        if (email && pass) {
            var log = new XMLHttpRequest();
            log.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    if(this.response == "[]"){
                        failsect.innerHTML = "";
                        failmsg.id = "fail-message";
                        paragraph.innerHTML = "Login failed, wrong password or username!";
                        failmsg.appendChild(paragraph);
                        failsect.appendChild(failmsg);
                    }
                    else{
                        logged_in = true;
                        failsect.innerHTML = "";
                        failmsg.id = "success-message";
                        paragraph.innerHTML = "login successful, redirecting...";
                        failmsg.appendChild(paragraph);
                        failsect.appendChild(failmsg);
                        window.location.pathname = "/admin/access/a_main.html";
                    }
                }
            }
            log.open("POST", '/a_login', true);
            log.setRequestHeader("Content-type", "application/json");
            log.send(JSON.stringify({
                email: email,
                password: pass
            }));
        }
        else{
            failsect.innerHTML = "";
            paragraph.innerHTML = "Please fill out all the areas";
            failmsg.id = "fail-message";
            failmsg.appendChild(paragraph);
            failsect.appendChild(failmsg);
        }
    }
};