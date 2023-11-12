window.onscroll = function() {myFunction()};
        
var navbar = document.getElementById("navBar");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    } else {
    navbar.classList.remove("sticky");
    }
}

function getCookies(cname){
    let name = cname + "=";
    let contentCookie = decodeURIComponent(document.cookie);
    let ca = contentCookie.split(';');
    for(let i = 0; i < ca.length; i++){
        let c = ca[i];
        while (c.charAt(0) == ' '){
            c = c.substring(1);    
        }
        if(c.indexOf(name) == 0){
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

const welcommessage = document.getElementById("welcome");
const loginbuttons = document.getElementById("loginbuttons");
const accountinfo = document.getElementById("accountinfo");

function onloadEvent(){
    let logged = getCookies("loggedIn");
    if(logged === "true"){
        welcommessage.remove();
        loginbuttons.remove();
    }
    else{
        accountinfo.remove();
    }

    let fname = getCookies("fname");
    let lname = getCookies("lname");

    let name = fname + " " + lname + " ▾";
    document.getElementById("name").innerHTML = name;
}

function logout(){
    document.cookie = "fname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "lname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "idNum=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "pass=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "club=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    alert("You have been logged out!");
    window.location.href = ".";
}