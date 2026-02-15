document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if(currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.faq-answer').style.maxHeight = null;
            }

            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
            } else {
                answerDiv.style.maxHeight = null;
            }
        });
    });
});