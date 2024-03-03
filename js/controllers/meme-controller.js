'use strict'

let gElCanvas
let gCtx
let gStartPos
let gDraggedLineIdx
var gIsCleanVersion = false

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
            if ("txt" in line) {
                drawText(line)

                let lineWidth = gCtx.measureText(line.txt).width
                if (!line.txt) lineWidth = gCtx.measureText('text here').width
                setLineWidth(lineWidth, idx)

            } else drawSticker(line)
        })

        if (!gIsCleanVersion) drawRect(meme.lines[meme.selectedLineIdx])
    }
}

function drawImage(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

}

function drawSticker(line) {
    const sticker = new Image()
    sticker.src = line.sticker
    gCtx.drawImage(sticker, line.pos.x, line.pos.y, line.size, line.width)
}

function drawText({ txt, size, fillColor, strokeColor, pos, font }) {
    if (!txt) txt = 'text here'

    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor

    gCtx.fillStyle = fillColor

    gCtx.font = `${size}px ${font}`
    gCtx.textBaseline = 'hanging'

    gCtx.fillText(txt, pos.x, pos.y)
    gCtx.strokeText(txt, pos.x, pos.y)
}

function drawRect(line) {
    const lineWidth = line.width
    const lineHeight = line.size

    gCtx.strokeStyle = 'black'

    gCtx.strokeRect(line.pos.x - 10, line.pos.y - 5, lineWidth + 20, lineHeight + 10)
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
    setSelectedLineIdx()
    renderMeme()
    renderSettings()
}

function onAddNewSticker(idx) {
    addNewSticker(`stickers/${idx}.png`)
    renderMeme()
}

function onMoveBetweenLines() {
    moveBetweenLines()
    renderMeme()
    renderSettings()
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

function onSaveMeme() {
    generateMeme()
    setTimeout(() => {
        saveMeme(gElCanvas.toDataURL('png'))
        gIsCleanVersion = false
        renderMeme()
    }, 0)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.offsetHeight
}

function generateMeme() {
    gIsCleanVersion = true
    renderMeme()
}

function onDownloadMeme(ev) {
    generateMeme()
    setTimeout(() => {
        const dataUrl = gElCanvas.toDataURL('png')
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = 'my-meme'
        link.click()
        gIsCleanVersion = false
        renderMeme()
    }, 0)
}

function shareMeme(ev) {
    generateMeme()
    setTimeout(async () => {
        const data = gElCanvas.toDataURL('image/jpeg')
        gIsCleanVersion = false
        renderMeme()
        try {
            const response = await fetch(data)
            const blob = await response.blob()
            const file = new File([blob], 'rick.jpg', { type: blob.type });

            await navigator.share({
                title: "my-meme",
                files: [file],
            })
        } catch (err) {
            console.error("Share failed:", err.message)
        }
    }, 0);

}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    addClickListeners()
    // window.addEventListener('resize', resizeCanvas)
}

function addClickListeners() {
    const elDownload = document.querySelector('.download')
    const elShare = document.querySelector('.share')
    elDownload.addEventListener('click', onDownloadMeme)
    elShare.addEventListener('click', shareMeme)
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
        renderSettings()
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

function renderSettings() {
    const sLine = getSelectedLine()
    if (sLine.sticker) return
    document.querySelector('.txt-input').value = sLine.txt
    document.querySelector('.stroke-color').value = sLine.strokeColor
    document.querySelector('.fill-color').value = sLine.fillColor
    document.querySelector('.txt-font').value = sLine.font
}