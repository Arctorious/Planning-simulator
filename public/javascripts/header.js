var logged = false;

function ifLogged() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if(this.response != "[]"){
                var profile = document.getElementById("user");
                profile.href = window.location.href + "/users/profile.html";
                profile.innerHTML = this.response;
                var placeholder = document.getElementById("placeholder");
                var logoutButton = document.createElement("button");
                logoutButton.id = "login";
                logoutButton.innerHTML = "logout";
                placeholder.parentNode.replaceChild(logoutButton, placeholder);
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

var el = document.getElementsByTagName("input")[0];
el.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        window.location.assign('?code=' + this.value);
    }
});