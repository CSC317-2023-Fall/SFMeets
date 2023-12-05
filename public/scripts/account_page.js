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

function getInfo(){
    const fname = getCookies("fname");
    const lname = getCookies("lname");
    const idNum = getCookies("idNum");
    const email = getCookies("email");
    const pass = getCookies("pass");
    const club = getCookies("club");
    const loginbuttons = document.getElementById("loginbuttons");
    document.getElementById("fname").innerHTML += "<p id='change_f'>" + fname + "</p>";
    document.getElementById("lname").innerHTML += "<p id='change_l'>" + lname + "</p>";
    document.getElementById("idNum").innerHTML += "<p id='change_n'>" + idNum + "</p>";
    document.getElementById("email").innerHTML += "<p id='change_e'>" +email + "</p>";
    document.getElementById("pass").innerHTML += "<p id='change_p'>" + pass + "</p>";
    document.getElementById("affiliated_info").innerHTML += "<p>" + club + "</p><hr>";

    var navbar = document.getElementById("navBar");
    var sticky = navbar.offsetTop;

    let logged = getCookies("loggedIn");
    if(logged === "true"){
        loginbuttons.remove();
        let name = fname + " " + lname + " ▾";
        document.getElementById("name").innerHTML = name;
        sticky = navbar.offsetTop;
    }
    else{
        accountinfo.remove();
    }
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

const edit_info = document.getElementById("edit_info");
const edit_pic = document.getElementById("edit_pic");
const save_but = document.getElementById("save_but")


function show_save(){
    document.getElementById("save_but").style.opacity = "0.9";
    document.getElementById("change_f").contentEditable = "true";
    document.getElementById("change_f").style.background = "#f1f1f1";
    document.getElementById("change_f").style.padding = "8px";
    document.getElementById("change_l").contentEditable = "true";
    document.getElementById("change_l").style.background = "#f1f1f1";
    document.getElementById("change_l").style.padding = "8px";
    document.getElementById("change_n").contentEditable = "true";
    document.getElementById("change_n").style.background = "#f1f1f1";
    document.getElementById("change_n").style.padding = "8px";
    document.getElementById("change_e").contentEditable = "true";
    document.getElementById("change_e").style.background = "#f1f1f1";
    document.getElementById("change_e").style.padding = "8px";
    document.getElementById("change_p").contentEditable = "true";
    document.getElementById("change_p").style.background = "#f1f1f1";
    document.getElementById("change_p").style.padding = "8px";
    
}

function save_info(){
    const ele = document.getElementById("save_but");
    const css = window.getComputedStyle(ele, null);
    let opac = css.getPropertyValue("opacity");
    if(opac === "0.9"){
        document.getElementById("save_but").style.opacity = "0";
        document.getElementById("change_f").contentEditable = "false";
        document.getElementById("change_f").style.background = "white";
        document.getElementById("change_f").style.padding = "0px";
        document.getElementById("change_l").contentEditable = "false";
        document.getElementById("change_l").style.background = "white";
        document.getElementById("change_l").style.padding = "0px";
        document.getElementById("change_n").contentEditable = "false";
        document.getElementById("change_n").style.background = "white";
        document.getElementById("change_n").style.padding = "0px";
        document.getElementById("change_e").contentEditable = "false";
        document.getElementById("change_e").style.background = "white";
        document.getElementById("change_e").style.padding = "0px";
        document.getElementById("change_p").contentEditable = "false";
        document.getElementById("change_p").style.background = "white";
        document.getElementById("change_p").style.padding = "0px";
        const fname = document.getElementById("change_f").innerHTML;
        const lname = document.getElementById("change_l").innerHTML;
        const idNum = document.getElementById("change_n").innerHTML;
        const email = document.getElementById("change_e").innerHTML;
        const pass = document.getElementById("change_p").innerHTML;
        document.cookie = "fname=" + fname + "; path=/"; 
        document.cookie = "lname=" + lname + "; path=/"; 
        document.cookie = "idNum=" + idNum + "; path=/"; 
        document.cookie = "email" + email + "; path=/"; 
        document.cookie = "pass=" + pass + "; path=/"; 
        location.reload();
    }else{
        return ' ';
    }

}



regi_button.addEventListener("click" , (s) => {
    s.preventDefault();
    if(lower.classList.contains("valid") && upper.classList.contains("valid") && same.classList.contains("valid") 
    && number.classList.contains("valid") && min.classList.contains("valid")){
        alert("Sign up successful");
        document.getElementById("regi_button").removeEventListener;                    
    }else{
        document.getElementById("errorMsg_sign").style.padding = "3px";
        document.getElementById("errorMsg_sign").style.border = "thin solid darkred";
        document.getElementById("errorMsg_sign").innerHTML = "<p>A Section Was Incorrectly Filled Out</p>";
    }
})