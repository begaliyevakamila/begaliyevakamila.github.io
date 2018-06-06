const elements = {
    gridItems: null,
    pageOverlay: null,
    aboutBtn: null,
    aboutSection: null,
    aboutColumn: null,
    bookCard: null,
}

const hideGridItems = () => {
    elements.gridItems.forEach(item => item.classList.add('kbg-grid-item--hidden'));
}

const initialize = () => {
    elements.gridItems = document.querySelectorAll('.kbg-grid-item');
    elements.pageOverlay = document.getElementById('kbg-overlay');
    elements.aboutBtn = document.getElementById('kbg-about-btn');
    elements.aboutSection = document.getElementById('kbg-about-section');
    elements.bookCard = document.getElementById('kbg-book-card');
    elements.aboutColumn = document.getElementById('kbg-about-col');
    // elements.gridItems.forEach(item => {
    //     item.addEventListener('click', (e) => {
    //         elements.pageOverlay.classList.add('kbg-overlay--showing')
    //         setTimeout(() => {
    //             const href = item.attributes['data-href'].value;
    //             window.location.href = href;
    //         }, 500);
    //     })
    // });

    elements.aboutBtn.addEventListener('click', e => {
        e.preventDefault();
        hideGridItems();
        elements.aboutSection.classList.add('kbg-about-section--visible');
    })

    elements.gridItems.forEach(item => {
        item.addEventListener('click', (e) => {
            hideGridItems();
            elements.aboutColumn.classList.add('kbg-about-col--hidden');
            const card = elements[item.attributes['data-card'].value];
            card.style.display = 'block';
            card.classList.add('kbg-card--visible');
        });
    });
}
document.addEventListener("DOMContentLoaded", initialize);