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

var psw = document.getElementById("inp-pass");
psw.oninput = con_pass.oninput;

var register = document.getElementById("register-r");
var registered = false;

register.onmouseup = function () {
    this.classList.remove("darker");

    var failsect = document.getElementById("fail-section");
    var failmsg = document.createElement("p");
    var paragraph = document.createElement("i");


    var fst_name = document.getElementById("inp-firstname").value;
    var lst_name = document.getElementById("inp-lastname").value;
    var email = document.getElementById("inp-email").value;
    var pass = document.getElementById("inp-pass").value;
    var notification = document.getElementById("inp-emailNot").checked;
    if (!registered) {
        if (!fst_name || !lst_name || !email || !pass || !con_pass.value) {
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
                        var links = document.getElementsByTagName('a');
                        for(let i = 0; i < links.length; i++){
                            links[i].classList.add("dis");
                        }
                        failsect.innerHTML = "";
                        paragraph.innerHTML = "Register success! Redirecting to login page...";
                        failmsg.appendChild(paragraph);
                        failmsg.classList.add("success-message");
                        failsect.appendChild(failmsg);
                        registered = true;

                        var xhttp2 = new XMLHttpRequest();
                        xhttp2.onreadystatechange = function(){
                            if(this.readyState == 4 && this.status == 200){
                                window.location.pathname = '/login.html';
                            }
                        };
                        xhttp2.open("POST", "/addUser", true);
                        xhttp2.setRequestHeader("Content-type", "application/json");
                        xhttp2.send(JSON.stringify({
                            firstname: fst_name,
                            lastname: lst_name,
                            email: email,
                            emailNotifi: notification,
                            password: pass
                        }));
                    }
                    else{
                        failsect.innerHTML = "";
                        paragraph.innerHTML = "Conflicting email. This email is already registered in the system.";
                        failmsg.appendChild(paragraph);
                        failmsg.classList.add("fail-message");
                        failsect.appendChild(failmsg);
                    }
                }
            };
            xhttp.open("POST", "/testEmail", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({email: email}));
        }
    }
};
