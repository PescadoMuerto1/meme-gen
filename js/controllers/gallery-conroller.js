'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.main-gallery')
    const imgs = getImgs()

    const strHTMLs = imgs.map(img => `<img src="${img.url}" alt=""onclick="onImgSelect(${img.id})"> `)
    elGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(elId) {
    setImg(elId)
    initCanvas()
    hideEl('.main-gallery')
}

function onRandomMeme() {
    setRandomMeme()
    initCanvas()
    hideEl('.main-gallery')
}