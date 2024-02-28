'use strict'

let gElCanvas
let gCtx

function initCanvas() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    showEl('.main-meme')
    resizeCanvas()
    renderMeme()
    // addListeners()
}

function renderMeme() {
    const meme = getMeme()
    const imgSrc = getImgById(meme.selectedImgId)
    const img = new Image()
    img.src = imgSrc

    img.onload = () => {
        drawImage(img)
        meme.lines.forEach(line => drawText(line))
        drawRectText(meme.lines[meme.selectedLineIdx])
    }

}

function drawImage(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

}

function drawText({ txt, size, fillColor, strokeColor, pos }) {

    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor

    gCtx.fillStyle = fillColor

    gCtx.font = `${size}px Arial`
    // gCtx.textAlign = 'center'
    gCtx.textBaseline = 'hanging'

    gCtx.fillText(txt, pos.x, pos.y)
    gCtx.strokeText(txt, pos.x, pos.y)

}

function drawRectText(line) {
    console.log(line)
    const lineWidth = gCtx.measureText(line.txt).width
    const lineHeight = line.size

    gCtx.strokeStyle = 'black'

    gCtx.strokeRect(line.pos.x, line.pos.y, lineWidth, lineHeight)
    console.log(line.pos.x, line.pos.y, lineHeight, lineWidth);
}

function onChangeTxt(txt) {
    setLineTxt(txt)
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

function onAddNewLine() {
    addNewLine()
    renderMeme()
}

function onMoveBetweenLines() {
    moveBetweenLines()
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.height = elContainer.clientHeight
    gElCanvas.width = elContainer.clientWidth
}

function addListeners() {
    window.addEventListener('resize', resizeCanvas)
}

function onDownloadCanvas(elLink) {
    
    elLink.download = 'my-meme'

    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}

