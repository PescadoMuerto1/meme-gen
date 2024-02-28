'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    renderMeme()
}

function renderMeme() {
    const imgSrc = getImg()
    const txt = getMeme()
    const img = new Image()
    img.src = imgSrc

    img.onload = () => {
        drawImage(img)
        drawText(txt)
    }

}

function drawImage(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

}

function drawText(text, x = 250, y = 100) {

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'white'

    gCtx.fillStyle = 'lightsteelblue'

    gCtx.font = '30px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.height = elContainer.clientHeight
    gElCanvas.width = elContainer.clientWidth
}

function addListeners() {
    // window.addEventListener('resize', resizeCanvas)
}

