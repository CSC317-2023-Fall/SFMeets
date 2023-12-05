
//if cookie named failed login exists, display error message


function setCookie(cname, cvalue, exdays){
    const exp = new Date();
    exp.setTime(exp.getTime() + (exdays*24*69*60*1000));
    let expires = "expires=" + exp.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure";
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
    let failed = getCookies("failedLogin");
    if(logged === "true"){
        alert("You have already logged in");
        location.replace("/account_page.html");
    }
    if(failed === "true"){
        document.getElementById("errorMsg").style.padding = "3px";
        document.getElementById("errorMsg").style.border = "thin solid darkred";
        document.getElementById("errorMsg").innerHTML = "<p>Invalid Login Credentials</p>";
        setCookie("failedLogin", "false", 1);
    }
}

