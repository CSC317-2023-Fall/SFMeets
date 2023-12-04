const welcomemessage = document.getElementById("welcome");

function onloadHeader(){
    let logged = getCookies("loggedIn");
    if(logged === "true"){
        welcomemessage.remove();
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