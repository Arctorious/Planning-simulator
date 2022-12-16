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


var changeName = document.getElementById("alterName");

changeName.onmouseup = function() {

    this.classList.remove("darker");
    var failsect1 = document.getElementById("fail-section1");
    var failmsg = document.createElement("p");
    var paragraph = document.createElement("i");

    var name = document.getElementById("input_name").value;
    if(name != "") {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                if(this.response == "[]") {
                    var nChange = new XMLHttpRequest();
                    nChange.open("GET", "/admin/changeName/" + name, true);
                    nChange.send();

                    failsect1.innerHTML = "";
                    failmsg.id = "success-message";
                    paragraph.innerHTML = "change successfully";
                    failmsg.appendChild(paragraph);
                    failsect1.appendChild(failmsg);
                }else {
                    failsect1.innerHTML = "";
                    failmsg.id = "fail-message";
                    paragraph.innerHTML = "Name change failed";
                    failmsg.appendChild(paragraph);
                    failsect1.appendChild(failmsg);
                }
            }
        }
        xhttp.open("GET", "/admin/testName/" + name, true);
        xhttp.send();
    }else {
        failsect1.innerHTML = "";
        paragraph.innerHTML = "no input";
        failmsg.id = "fail-message";
        failmsg.appendChild(paragraph);
        failsect1.appendChild(failmsg);
    }
};

var changepassword = document.getElementById("alterpassword");

changepassword.onmouseup = function() {

    this.classList.remove("darker");
    var failsect2 = document.getElementById("fail-section2");
    var failmsg = document.createElement("p");
    var paragraph = document.createElement("i");

    var passw = document.getElementById("input_password").value;
    if(passw != "") {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (xhttp.readyState == 4 && xhttp.status == 200){
                if(this.response == "[]") {
                    var pChange = new XMLHttpRequest();
                    pChange.open("GET", "/admin/changePassword/" + passw, true);
                    pChange.send();

                    failsect2.innerHTML = "";
                    failmsg.id = "success-message";
                    paragraph.innerHTML = "change successfully";
                    failmsg.appendChild(paragraph);
                    failsect2.appendChild(failmsg);
                }else {
                    failsect2.innerHTML = "";
                    failmsg.id = "fail-message";
                    paragraph.innerHTML = "password change failed";
                    failmsg.appendChild(paragraph);
                    failsect2.appendChild(failmsg);
                }
            }
        }
        xhttp.open("GET", "/admin/testPass/" + passw, true);
        xhttp.send();
    }else {
        failsect2.innerHTML = "";
        paragraph.innerHTML = "no input";
        failmsg.id = "fail-message";
        failmsg.appendChild(paragraph);
        failsect2.appendChild(failmsg);
    }
};