document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact form');
    form.onsubmit = function (e) {
        e.preventDefault();
        document.getElementById('success-message').style.display = 'block';
    };
});