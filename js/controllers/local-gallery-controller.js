'use strict'

function onInitLocal() {
    const memes = loadFromStorage('memes')
    renderLocalGallery()
    showEl('.local-gallery')
    hideEl('.main-gallery-container')
    hideEl('.main-meme')
}

function renderLocalGallery() {
    const memes = loadFromStorage('memes')

    const elGallery = document.querySelector('.local-gallery')
    const strHTMLs = memes.map((meme, idx) => `
    <div class="img-container">
        <img  class="img"src="${meme.screenShot}" alt=""onclick="onLocalImgSelect(${idx})">
        <img class="icon hidden"src="ICONS/trash.png" alt=""onclick="onRemoveLocalMeme(${idx})">
    </div>
    `)
    elGallery.innerHTML = strHTMLs.join('')
}

function onLocalImgSelect(memeIdx) {
    const memes = loadFromStorage('memes')

    setMeme(memes[memeIdx])
    initCanvas()
    hideEl('.local-gallery')
}

function onRemoveLocalMeme(memeIdx){
    const memes = loadFromStorage('memes')
    memes.splice(memeIdx, 1)
    saveToStorage('memes', memes)
    renderLocalGallery()
}