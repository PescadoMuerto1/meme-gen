'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cat'] },
    { id: 19, url: 'img/19.jpg', keywords: ['funny', 'cat'] },
    { id: 20, url: 'img/20.jpg', keywords: ['funny', 'cat'] },
    { id: 21, url: 'img/21.jpg', keywoZrds: ['funny', 'cat'] }]

var gQuotes = [
    "That's rough, buddy.",
    "Ain't nobody got time for that!",
    "I can't believe you've done this.",
    "It's over 9000!",
    "Do you know da wae?",
    "But that's none of my business.",
    "This is fine.",
    "You had one job!",
    "Hide the pain Harold.",
    "Why you always lyin'?",
    "Cash me ousside, how 'bout dat?",
    "Bruh.",
    "Oh lawd, he comin'.",
    "Is this real life?"
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    isDrag: false,
    lines: [
        {
            txt: 'text here',
            size: 30,
            width: 0,
            fillColor: 'white',
            strokeColor: 'black',
            pos: {
                x: 0,
                y: 50
            },
            font: 'Impact'
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgById(imgId) {
    const img = gImgs.find(img => img.id === imgId)
    return img.url
}

function setMeme(meme){
    return gMeme = meme
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = txt
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setRandomMeme() {
    const imgId = gImgs[getRandomInt(0, gImgs.length)].id
    const txtIdx = getRandomInt(0, gQuotes.length)

    setImg(imgId)
    gMeme.lines[0].txt = gQuotes[txtIdx]
}

function setLineFillColor(color) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].fillColor = color
}

function setLineStrokeColor(color) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].strokeColor = color
}

function moveBetweenLines() {
    const sLine = gMeme.selectedLineIdx
    if (sLine < gMeme.lines.length - 1) setSelectedLineIdx(sLine + 1)
    else setSelectedLineIdx(0)
}

function setSelectedLineIdx(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
    console.log(gMeme.selectedLineIdx);
}

function increaseLinesTxtSize() {
    const sLine = gMeme.selectedLineIdx
    gMeme.lines[sLine].size += 5
}

function decreaseLinesTxtSize() {
    const sLine = gMeme.selectedLineIdx
    gMeme.lines[sLine].size -= 5
}

function getImgs() {
    return gImgs
}

function addNewLine() {
    gMeme.lines.push(_addLine())
}

function isLineClicked(clickedPos) {

    return gMeme.lines.findIndex(line => {
        return clickedPos.x > line.pos.x && clickedPos.x < line.pos.x + line.width
            && clickedPos.y > line.pos.y && clickedPos.y < line.pos.y + line.size
    })
}

function setLineWidth(width, lineIdx) {
    gMeme.lines[lineIdx].width = width
}

function setLineDrag(lineIdx, isDrag) {
    gMeme.lines[lineIdx].isDrag = isDrag
}

function getLineDragged() {
    return gMeme.lines.find(line => line.isDrag)
}

function moveLine(lineIdx, dx, dy) {
    gMeme.lines[lineIdx].pos.x += dx
    gMeme.lines[lineIdx].pos.y += dy
    
    console.log(gMeme.lines[lineIdx].pos);
}

function removeLine() {
    gMeme.lines.splice([gMeme.selectedLineIdx], 1)
}

function alignLeft(elCanvas) {
    const sLine = gMeme.lines[gMeme.selectedLineIdx]
    sLine.pos.x = 0
}

function alignCenter(elCanvas) {
    const sLine = gMeme.lines[gMeme.selectedLineIdx]
    sLine.pos.x = elCanvas.width / 2 - sLine.width / 2
}

function alignRight(elCanvas) {
    const sLine = gMeme.lines[gMeme.selectedLineIdx]
    sLine.pos.x = elCanvas.width - sLine.width
}

function setFont(sFont) {
    gMeme.lines[gMeme.selectedLineIdx].font = sFont
}

function saveMeme() {
    const memes = loadFromStorage('memes')
    gMeme.screenShot = gElCanvas.toDataURL()
    if(!memes){ 
        saveToStorage('memes', [gMeme])
        return
    } 
    memes.push(gMeme)
    saveToStorage('memes', memes)
}

function _addLine(txt = 'text here', size = 30, fillColor = 'white', strokeColor = 'black', x = 100, y = 100, font = 'Impact') {
    return {
        txt,
        size,
        fillColor,
        strokeColor,
        pos: {
            x,
            y
        },
        font
    }
}

