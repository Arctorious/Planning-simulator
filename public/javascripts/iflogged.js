function ifLogged() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if(this.response){
                var profile = document.getElementById("user");
                profile.href = window.location.href + "/users/profile.html";
                profile.innerHTML = this.response;
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