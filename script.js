const elements = {
    gridItems: null,
    pageOverlay: null,
    aboutBtn: null,
    aboutSection: null,
    aboutSectionCloseBtn: null,
    aboutColumn: null,
    bookCard: null,
}

const hideGridItems = () => {
    elements.gridItems.forEach(item => item.classList.add('kbg-grid-item--hidden'));
}
const showGridItems = () => {
    elements.gridItems.forEach(item => item.classList.remove('kbg-grid-item--hidden'));
}

const openCard = (item) => {
    hideGridItems();
    const card = elements[item.attributes['data-card'].value];
    const closeBtn = card.querySelector('.kbg-card__close-btn');
    closeBtn.addEventListener('click', function onCloseClick() {
        card.classList.remove('kbg-card--visible');
        card.classList.add('kbg-card--hidden');
        closeBtn.removeEventListener('click', onCloseClick);
        card.addEventListener('animationend', function hideCard() {
            card.style.display = 'none';
            card.classList.remove('kbg-card--hidden');
            showGridItems();
            card.removeEventListener('animationend', hideCard);
        });
    });
    card.style.display = 'block';
    card.classList.add('kbg-card--visible');
}

const cacheElements = () => {
    elements.gridItems = document.querySelectorAll('.kbg-grid-item');
    elements.pageOverlay = document.getElementById('kbg-overlay');
    elements.aboutBtn = document.getElementById('kbg-about-btn');
    elements.aboutSection = document.getElementById('kbg-about-section');
    elements.bookCard = document.getElementById('kbg-book-card');
    elements.aboutColumn = document.getElementById('kbg-about-col');
    elements.aboutSectionCloseBtn = document.getElementById('kbg-about-section__close');

}

const initializeAboutSection = () => {
    elements.aboutBtn.addEventListener('click', e => {
        e.preventDefault();
        hideGridItems();
        elements.aboutSection.style.display = 'block';
        elements.aboutSection.classList.add('kbg-about-section--visible');
    })
    elements.aboutSectionCloseBtn.addEventListener('click', e => {
        e.preventDefault();
        elements.aboutSection.addEventListener('transitionend', function tranEnd() {
            elements.aboutSection.style.display = 'none';
            showGridItems();
            elements.aboutSection.removeEventListener('transitionend', tranEnd);
        });
        elements.aboutSection.classList.remove('kbg-about-section--visible');

    })
}

const initialize = () => {
    cacheElements();
    initializeAboutSection();

    $('.kbg-card__carousel').owlCarousel({
        items: 1
    })



    elements.gridItems.forEach(item => {
        item.addEventListener('click', e => openCard(item));
    });
}
document.addEventListener("DOMContentLoaded", initialize);