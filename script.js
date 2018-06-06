const elements = {
    gridItems: null,
    pageOverlay: null,
    aboutBtn: null,
    aboutSection: null,
    aboutSectionCloseBtn: null,
    aboutColumn: null,
    bookCard: null,
    empethyCard: null,
}

const state = {
    currentCard: null,
}

const hideGridItems = () => {
    elements.gridItems.forEach(item => item.classList.add('kbg-grid-item--hidden'));
}
const showGridItems = () => {
    elements.gridItems.forEach(item => item.classList.remove('kbg-grid-item--hidden'));
}

const closeCard = (onHideCb) => {
    const card = state.currentCard;
    if (!card) { return; }
    state.currentCard = null;
    card.classList.remove('kbg-card--visible');
    card.classList.add('kbg-card--hidden');

    card.addEventListener('animationend', function hideCard() {
        card.style.display = 'none';
        card.classList.remove('kbg-card--hidden');
        onHideCb && onHideCb();
        card.removeEventListener('animationend', hideCard);
    });
}

const openCard = (item) => {
    hideGridItems();
    const card = elements[item.attributes['data-card'].value];
    state.currentCard = card;
    const closeBtn = card.querySelector('.kbg-card__close-btn');
    closeBtn.addEventListener('click', function onCloseClick() {
        closeCard(showGridItems);
        closeBtn.removeEventListener('click', onCloseClick);

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
    elements.empethyCard = document.getElementById('kbg-empethy-card');
    elements.aboutColumn = document.getElementById('kbg-about-col');
    elements.aboutSectionCloseBtn = document.getElementById('kbg-about-section__close');
}

const initializeAboutSection = () => {
    elements.aboutBtn.addEventListener('click', e => {
        e.preventDefault();
        hideGridItems();
        elements.aboutSection.style.display = 'block';
        const show = () => {
            elements.aboutSection.classList.add('kbg-about-section--visible');
        }
        if (state.currentCard) {
            closeCard(show);
        } else {
            show();
        }

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