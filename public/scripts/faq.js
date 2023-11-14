document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.question').forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });
});