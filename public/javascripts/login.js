const params = new URLSearchParams(window.location.search);
var p = params.get('fail');
if(p){
    window.alert("Google login failed!");
}

const googleLog = document.getElementById("google");
googleLog.onmouseover = function(){
    this.src = "/images/btn_google_signin_dark_focus_web@2x.png";
}
googleLog.onmouseleave = function(){
    this.src = "/images/btn_google_signin_dark_normal_web@2x.png";
}
googleLog.onmousedown = function(){
    this.src = "/images/btn_google_signin_dark_pressed_web@2x.png";
}
googleLog.onmouseup = function(){
    this.src = "/images/btn_google_signin_dark_focus_web@2x.png";
    let failsect = document.getElementById("fail-section");
    let failmsg = document.createElement("p");
    let paragraph = document.createElement("i");

    failsect.innerHTML = "";
    failmsg.id = "success-message";
    paragraph.innerHTML = "Redirecting to Google...";
    failmsg.appendChild(paragraph);
    failsect.appendChild(failmsg);

    window.location.pathname = '/google';
}

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


    var mail = document.getElementById("inp-email").value;
    var pass = document.getElementById("inp-pass").value;
    if (!logged_in) {
        if (mail != "" && pass != "") {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    if(this.response == "[]"){
                        failsect.innerHTML = "";
                        failmsg.id = "fail-message";
                        paragraph.innerHTML = "Login failed, wrong password or email address!";
                        failmsg.appendChild(paragraph);
                        failsect.appendChild(failmsg);
                    }
                    else{
                        var links = document.getElementsByTagName('a');
                        for(let i = 0; i < links.length; i++){
                            links[i].classList.add("dis");
                        }
                        var response = JSON.parse(this.response);
                        var xhttp2 = new XMLHttpRequest();
                        xhttp2.onreadystatechange = function(){
                            if(this.readyState == 4 && this.status == 200){
                                logged_in = true;
                                failsect.innerHTML = "";
                                failmsg.id = "success-message";
                                paragraph.innerHTML = "login successful, redirecting...";
                                failmsg.appendChild(paragraph);
                                failsect.appendChild(failmsg);
                                window.location.pathname = "/calendar.html";
                            }
                        }
                        xhttp2.open("GET", "/initUser/" + response[0].UserId, true);
                        xhttp2.send();
                    }
                }
            };
            xhttp.open("POST", "/testuser", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({
                email: mail,
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
