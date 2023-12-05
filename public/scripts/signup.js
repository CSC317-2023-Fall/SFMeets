
function pass_check(){
    document.getElementById("pass_pop").style.display = "block";
}

function notSelected_pass(){
    document.getElementById("pass_pop").style.display = "none"
}

function checking(){
    var userInput = document.getElementById("pass_sign");
    var checkpass = document.getElementById("pass_repeat");
    var lower = document.getElementById("lower");
    var upper = document.getElementById("upper");
    var number = document.getElementById("number");
    var min = document.getElementById("min");
    var regi_button = document.getElementById("register_button");
    var same = document.getElementById("same");
    
    const lowerCheck = /[a-z]/g;
    if(userInput.value.match(lowerCheck)){
        lower.classList.remove("invalid");
        lower.classList.add("valid");
    }else{
        lower.classList.remove("valid");
        lower.classList.add("invalid");
    }

    const upperCheck = /[A-Z]/g;
    if(userInput.value.match(upperCheck)){
        upper.classList.remove("invalid");
        upper.classList.add("valid");
    }else{
        upper.classList.remove("valid");
        upper.classList.add("invalid");
    }

    const numberCheck = /[0-9]/g;
    if(userInput.value.match(numberCheck)){
        number.classList.remove("invalid");
        number.classList.add("valid");
    }else{
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    if(userInput.value.length >= 8){
        min.classList.remove("invalid");
        min.classList.add("valid");
    }else{
        min.classList.remove("valid");
        min.classList.add("invalid");
    }
}

function repeat_check(){
    document.getElementById("pass_check").style.display = "block";
}

function repeatOff(){
    document.getElementById("pass_check").style.display = "none";
}

function repeat_checking(){
    var userInput = document.getElementById("pass_sign");
    var checkpass = document.getElementById("pass_repeat");
    var same = document.getElementById("same");

    if(checkpass.value == (userInput.value)){
        same.classList.remove("invalid");
        same.classList.add("valid");
    }else{
        same.classList.remove("valid");
        same.classList.add("invalid");
    }
}

function initial_check(){
    var userInput = document.getElementById("pass_sign");
    var checkpass = document.getElementById("pass_repeat");
    var same = document.getElementById("same");

    if(checkpass.value == (userInput.value)){
        same.classList.remove("invalid");
        same.classList.add("valid");
    }else{
        same.classList.remove("valid");
        same.classList.add("invalid");
    }
}

function setCookie(cname, cvalue, exdays){
    const exp = new Date();
    exp.setTime(exp.getTime() + (exdays*24*69*60*1000));
    let expires = "expires=" + exp.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

function checkLogin(){
    let logged = getCookies("loggedIn");
    let failed = getCookies("failedSignup");
    if(logged === "true"){
        alert("You have already logged in");
        location.replace("/account_page.html");
    }
    if(failed === "true"){
        document.getElementById("errorMsg_sign").style.padding = "3px";
        document.getElementById("errorMsg_sign").style.border = "thin solid darkred";
        document.getElementById("errorMsg_sign").innerHTML = "<p>Password does not match</p>";
        setCookie("failedSignup", "false", 1);
    }
}

function form_check(){
    var lower = document.getElementById("lower");
    var upper = document.getElementById("upper");
    var number = document.getElementById("number");
    var min = document.getElementById("min");
    var same = document.getElementById("same");

    if(lower.classList.contains("valid") && upper.classList.contains("valid") && same.classList.contains("valid") 
    && number.classList.contains("valid") && min.classList.contains("valid")){
        alert("Sign up successful");                   
    }else{
        return ' ';
    }
}

