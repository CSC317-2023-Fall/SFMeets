var info = [];
const resq = new XMLHttpRequest();
resq.open('GET', 'http://localhost:3000/getInfo');
resq.send();
resq.onload = () => {
    id = (getCookies("idNum") - 1);
    info = JSON.parse(resq.response);

    document.getElementById("fname").innerHTML += "<p id='change_f'>" + info[id].FIRSTNAME.toString() + "</p>";
    document.getElementById("lname").innerHTML += "<p id='change_l'>" + info[id].LASTNAME.toString() + "</p>";
    document.getElementById("idNum").innerHTML += "<p id='change_n'>" + info[id].USERNAME.toString() + "</p>";
    document.getElementById("email").innerHTML += "<p id='change_e'>" + info[id].EMAIL.toString() + "</p>";
    document.getElementById("pass").innerHTML += "<p id='change_p'>/////////</p>";
    document.getElementById("accID").innerHTML += info[id].ID.toString();
    document.getElementById("affiliated_info").innerHTML += "<p>" + club + "</p><hr>";
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
    document.getElementById("accEmail").type = "email";
    document.getElementById("confirm_label").innerHTML = "Confirm Email";
    document.getElementById("change_f").innerHTML += "<br><label for='new_first'>Change to:</label><input type='text' id='new_first' class='update' name='new_first'>";
    document.getElementById("change_l").innerHTML += "<br><label for='new_last'>Change to:</label><input type='text' id='new_last' class='update' name='new_last'>";
}

function save_info(){
    const ele = document.getElementById("save_but");
    const css = window.getComputedStyle(ele, null);
    let opac = css.getPropertyValue("opacity");
    if(opac === "0.9"){        
        document.cookie = "fname=" + fname + "; path=/"; 
        document.cookie = "lname=" + lname + "; path=/"; 
        location.reload();
    }else{
        return ' ';
    }

}
