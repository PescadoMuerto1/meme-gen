'use strict'

function onInit() {
    renderGallery()
    renderOptions()
    showEl('.main-gallery-container')
    hideEl('.main-meme')
    hideEl('.local-gallery')
}

function renderGallery(imgs = getImgs()) {
    const elGallery = document.querySelector('.main-gallery')

    const strHTMLs = imgs.map(img => `<img src="${img.url}" alt=""onclick="onImgSelect(${img.id})"> `)
    elGallery.innerHTML = strHTMLs.join('')
}

function renderOptions() {
    const opts = getOptions()
    const elList = document.getElementById('search-list')

    const strHTMLs = opts.map(opt => `<option value="${opt}"> `)
    elList.innerHTML = strHTMLs.join('')
}

function onImgSelect(elId) {
    setImg(elId)
    initCanvas()
    hideEl('.main-gallery-container')
}

function onFilterGallery() {
    const keyWord = document.querySelector('.input-list').value

    if(keyWord === 'All'){
        renderGallery()
        return
    } 
    
    const filteredImgs = filterGallery(keyWord)
    renderGallery(filteredImgs)
    document.querySelector('.input-list').value = ''
}

function onRandomMeme() {
    setRandomMeme()
    initCanvas()
    hideEl('.main-gallery-container')
    hideEl('.local-gallery')
}