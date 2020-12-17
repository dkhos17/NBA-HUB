var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var slides = document.getElementsByClassName("slides");
    var dots = document.getElementsByClassName("dots");
    var title = document.getElementById("title_text");
    var titles = ["Welcome to NBA Basketball corner", "Lakers Rout Heat To Claim Championship", "Reports: Lakers, Thunder agree in principle to Dennis Schroder trade"]
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    title.innerText = titles[slideIndex-1]
    dots[slideIndex - 1].className += " active";
    slides[slideIndex - 1].style.display = "block";
}

var search = document.getElementById('search');
search.style.display = 'none';