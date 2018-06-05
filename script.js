

const initialize = () => {
    const gridItems = document.querySelectorAll('.kbg-grid-item');
    const pageOverlay = document.getElementById('kbg-overlay');
    const aboutBtn = document.getElementById('kbg-about-btn');
    const aboutSection = document.getElementById('kbg-about-section');
    gridItems.forEach(item => {
        item.addEventListener('click', (e) => {
            pageOverlay.classList.add('kbg-overlay--showing')
            setTimeout(() => {
                const href = item.attributes['data-href'].value;
                window.location.href = href;
            }, 500);
        })
    });

    aboutBtn.addEventListener('click' ,e => {
        e.preventDefault();
        gridItems.forEach(item => item.classList.add('kbg-grid-item--hidden'));
        aboutSection.classList.add('kbg-about-section--visible');
    })
}
document.addEventListener("DOMContentLoaded", initialize);