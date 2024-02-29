'use strict'

let gElCanvas
let gCtx
let gStartPos
let gDraggedLineIdx

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function initCanvas() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')

    showEl('.main-meme')
    resizeCanvas()
    renderMeme()
    addListeners()
}

function renderMeme() {
    const meme = getMeme()
    const imgSrc = getImgById(meme.selectedImgId)
    const img = new Image()
    img.src = imgSrc

    img.onload = () => {
        drawImage(img)
        meme.lines.forEach((line, idx) => {
            drawText(line)
            const lineWidth = gCtx.measureText(line.txt).width
            setLineWidth(lineWidth, idx)
        })
        drawRectText(meme.lines[meme.selectedLineIdx])
    }

}

function drawImage(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

}

function drawText({ txt, size, fillColor, strokeColor, pos, font }) {
    
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor

    gCtx.fillStyle = fillColor

    gCtx.font = `${size}px ${font}`
    gCtx.textBaseline = 'hanging'

    gCtx.fillText(txt, pos.x, pos.y)
    gCtx.strokeText(txt, pos.x, pos.y)
}

function drawRectText(line) {
    console.log(line);
    const lineWidth = line.width
    const lineHeight = line.size

    gCtx.strokeStyle = 'black'

    gCtx.strokeRect(line.pos.x -10, line.pos.y -5, lineWidth + 20, lineHeight + 10)
    console.log(line.pos.x, line.pos.y, lineHeight, lineWidth)
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onChangeTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onChangeFillColor(color) {
    setLineFillColor(color)
    renderMeme()
}

function onChangeStrokeColor(color) {
    setLineStrokeColor(color)
    renderMeme()
}

function onChangeTxtSize(isIncrease) {
    if (isIncrease) increaseLinesTxtSize()
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

function onAlignRight() {
    alignRight(gElCanvas)
    renderMeme()
}

function onAlignCenter() {
    alignCenter(gElCanvas)
    renderMeme()
}

function onAlignLeft() {
    alignLeft(gElCanvas)
    renderMeme()
}

function OnSelectFont(sFont) {
    setFont(sFont)
    renderMeme()
}

function onSaveMeme(){
    saveMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onDownloadCanvas(elLink) {
    elLink.download = 'my-meme'

    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // window.addEventListener('resize', resizeCanvas)
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    gStartPos = getEvPos(ev)

    if (isLineClicked(gStartPos) >= 0) {
        gDraggedLineIdx = isLineClicked(getEvPos(ev))
        setLineDrag(gDraggedLineIdx, true)
        document.body.style.cursor = 'grabbing'

        setSelectedLineIdx(gDraggedLineIdx)
        renderMeme()
    }
    return
}

function onMove(ev) {
    const isDrag = getLineDragged()
    if (!isDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    if (pos.x < 0 || pos.x > gElCanvas.width || pos.y < 0 || pos.y > gElCanvas.height) return
    moveLine(gDraggedLineIdx, dx, dy)

    gStartPos = pos
    renderMeme()
}

function onUp() {
    setLineDrag(gDraggedLineIdx, false)
    // document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVENTS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]

        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}