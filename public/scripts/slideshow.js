let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

var events = [];
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/getEvents');
xhr.send();
xhr.onload = () => {
    events = JSON.parse(xhr.response);
    //sort events by date
    events.sort(function(a, b){
        var dateA = new Date(a.DATE), dateB = new Date(b.DATE);
        return dateA - dateB;
    });
    console.log(events);

    var title1 = document.getElementsByClassName("title")[0];
    var title2 = document.getElementsByClassName("title")[1];
    var title3 = document.getElementsByClassName("title")[2];

    var timeloc1 = document.getElementsByClassName("timeloc")[0];
    var timeloc2 = document.getElementsByClassName("timeloc")[1];
    var timeloc3 = document.getElementsByClassName("timeloc")[2];

    var desc1 = document.getElementsByClassName("desc")[0];
    var desc2 = document.getElementsByClassName("desc")[1];
    var desc3 = document.getElementsByClassName("desc")[2];

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