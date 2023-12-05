var events = [];
const xhr1 = new XMLHttpRequest();
xhr1.open('GET', 'http://localhost:3000/getEvents');
xhr1.send();
xhr1.onload = () => {
    events = JSON.parse(xhr1.response);

    var fEvents = document.getElementsByClassName("item item1")[0];

    var title1 = fEvents.getElementsByClassName("title")[0];
    var title2 = fEvents.getElementsByClassName("title")[1];
    var title3 = fEvents.getElementsByClassName("title")[2];

    var timeloc1 = fEvents.getElementsByClassName("timeloc")[0];
    var timeloc2 = fEvents.getElementsByClassName("timeloc")[1];
    var timeloc3 = fEvents.getElementsByClassName("timeloc")[2];

    var desc1 = fEvents.getElementsByClassName("desc")[0];
    var desc2 = fEvents.getElementsByClassName("desc")[1];
    var desc3 = fEvents.getElementsByClassName("desc")[2];

    title1.innerHTML = events[0].NAME.toString();
    timeloc1.innerHTML = events[0].DATE.toString() + " | " + events[0].LOCATION.toString();
    desc1.innerHTML = events[0].DESCRIPTION.toString();

    title2.innerHTML = events[1].NAME.toString();
    timeloc2.innerHTML = events[1].DATE.toString() + " | " + events[1].LOCATION.toString();
    desc2.innerHTML = events[1].DESCRIPTION.toString();

    title3.innerHTML = events[2].NAME.toString();
    timeloc3.innerHTML = events[2].DATE.toString() + " | " + events[2].LOCATION.toString();
    desc3.innerHTML = events[2].DESCRIPTION.toString();

}

var orgs = [];
const xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'http://localhost:3000/getOrgs');
xhr2.send();
xhr2.onload = () => {
    orgs = JSON.parse(xhr2.response);

    var fOrgs = document.getElementsByClassName("item item2")[0];

    var title1 = fOrgs.getElementsByClassName("title")[0];
    var title2 = fOrgs.getElementsByClassName("title")[1];
    var title3 = fOrgs.getElementsByClassName("title")[2];
    var title4 = fOrgs.getElementsByClassName("title")[3];
    var title5 = fOrgs.getElementsByClassName("title")[4];
    var title6 = fOrgs.getElementsByClassName("title")[5];
    
    var desc1 = fOrgs.getElementsByClassName("desc")[0];
    var desc2 = fOrgs.getElementsByClassName("desc")[1];
    var desc3 = fOrgs.getElementsByClassName("desc")[2];
    var desc4 = fOrgs.getElementsByClassName("desc")[3];
    var desc5 = fOrgs.getElementsByClassName("desc")[4];
    var desc6 = fOrgs.getElementsByClassName("desc")[5];

    title1.innerHTML = orgs[0].NAME.toString();
    desc1.innerHTML = orgs[0].DESCRIPTION.toString();

    title2.innerHTML = orgs[1].NAME.toString();
    desc2.innerHTML = orgs[1].DESCRIPTION.toString();

    title3.innerHTML = orgs[2].NAME.toString();
    desc3.innerHTML = orgs[2].DESCRIPTION.toString();

    title4.innerHTML = orgs[3].NAME.toString();
    desc4.innerHTML = orgs[3].DESCRIPTION.toString();

    title5.innerHTML = orgs[4].NAME.toString();
    desc5.innerHTML = orgs[4].DESCRIPTION.toString();

    title6.innerHTML = orgs[5].NAME.toString();
    desc6.innerHTML = orgs[5].DESCRIPTION.toString();

}