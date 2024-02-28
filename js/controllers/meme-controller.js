'use strict'

let gElCanvas
let gCtx

function initCanvas() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    showEl('.main-meme')
    resizeCanvas()
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    const imgSrc = getImgById(meme.selectedImgId)
    const img = new Image()
    img.src = imgSrc

    img.onload = () => {
        drawImage(img)
        drawText(meme.lines[0])
    }

}

function drawImage(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

}

function drawText(memeLines, x = 250, y = 100) {

    gCtx.lineWidth = 2
    gCtx.strokeStyle = memeLines.strokeColor

    gCtx.fillStyle = memeLines.fillColor

    gCtx.font = `${memeLines.size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(memeLines.txt, x, y)
    gCtx.strokeText(memeLines.txt, x, y)
}

function onChangeTxt(txt) {
    setLineTxt(txt, 0)
    renderMeme()
}

function onChangeColor(color) {
    setLineColor(color)
    renderMeme()
}

function onChangeTxtSize(isIncrease) {
    if(isIncrease) increaseLinesTxtSize()
    else decreaseLinesTxtSize()
    renderMeme()
    return
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.height = elContainer.clientHeight
    gElCanvas.width = elContainer.clientWidth
}

function addListeners() {
    // window.addEventListener('resize', resizeCanvas)
}

function onDownloadCanvas(elLink) {
    
    elLink.download = 'my-meme'

    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}

