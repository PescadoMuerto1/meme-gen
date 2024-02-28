'use strict'

renderGallery()

function renderGallery() {
    const elGallery = document.querySelector('.main-gallery')
    const imgs = getImgs()

    const strHTMLs = imgs.map(img => `<img src="${img.url}" alt="">`)
    elGallery.innerHTML = strHTMLs.join('')
}