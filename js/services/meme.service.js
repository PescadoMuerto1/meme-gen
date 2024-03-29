'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'animal'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'animal'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'animal'] },
    { id: 5, url: 'img/5.jpg', keywords: ['men', 'cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['men', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['men', 'cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['men', 'comic'] },
    { id: 9, url: 'img/9.jpg', keywords: ['men', 'comic'] },
    { id: 10, url: 'img/10.jpg', keywords: ['baby', 'comic'] },
    { id: 11, url: 'img/11.jpg', keywords: ['baby', 'comic'] },
    { id: 12, url: 'img/12.jpg', keywords: ['baby', 'cat'] },
    { id: 13, url: 'img/13.jpg', keywords: ['baby', 'women'] },
    { id: 14, url: 'img/14.jpg', keywords: ['baby', 'women'] },
    { id: 15, url: 'img/15.jpg', keywords: ['baby', 'women'] },
    { id: 16, url: 'img/16.jpg', keywords: ['smile', 'women'] },
    { id: 17, url: 'img/17.jpg', keywords: ['smile', 'women'] },
    { id: 18, url: 'img/18.jpg', keywords: ['smile', 'women'] },
    { id: 19, url: 'img/19.jpg', keywords: ['smile', 'cat'] },
    { id: 20, url: 'img/20.jpg', keywords: ['funny', 'cat'] },
    { id: 21, url: 'img/21.jpg', keywords: ['funny', 'cat'] }]

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
            txt: '',
            size: 30,
            width: 0,
            fillColor: '#ffffff',
            strokeColor: 'black',
            pos: {
                x: 150,
                y: 100
            },
            font: 'Impact'
        }
    ]
}

const gOptions = ['All', 'Funny', 'Animal', 'Men', 'Women', 'Comic', 'Smile', 'Baby', 'Cat']

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgById(imgId) {
    const img = gImgs.find(img => img.id === imgId)
    return img.url
}

function setMeme(meme) {
    return gMeme = meme
}

function getMeme() {
    return gMeme
}

function getOptions() {
    return gOptions
}

function setLineTxt(txt) {
    const sLine = getSelectedLine()
    sLine.txt = txt
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setRandomMeme() {
    const imgId = gImgs[getRandomInt(0, gImgs.length)].id
    const txtIdx = getRandomInt(0, gQuotes.length)

    setImg(imgId)
    gMeme.lines = [_addLine(gQuotes[txtIdx])]
}

function cleanLines() {
    gMeme.lines = [_addLine()]
}

function setLineFillColor(color) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].fillColor = color
}

function setLineStrokeColor(color) {
    const sLine = getSelectedLine()
    sLine.strokeColor = color
}

function moveBetweenLines() {
    const sLine = gMeme.selectedLineIdx
    if (sLine < gMeme.lines.length - 1) setSelectedLineIdx(sLine + 1)
    else setSelectedLineIdx(0)
}

function setSelectedLineIdx(lineIdx = gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = lineIdx
}

function increaseLinesTxtSize() {
    const line = getSelectedLine()
    line.size += 5
}

function decreaseLinesTxtSize() {
    const line = getSelectedLine()
    line.size -= 5
}

function increaseLinesStickerSize() {
    const line = getSelectedLine()
    line.width += 5
    line.size = (line.width / line.ratio)
}

function decreaseLinesStickerSize() {
    const line = getSelectedLine()
    line.width -= 5
    line.size = (line.width / line.ratio)
}

function getImgs() {
    return gImgs
}

function addNewLine() {
    gMeme.lines.push(_addLine())
}

function addNewSticker(sticker) {
    gMeme.lines.push(_addStickerLine(sticker))
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
}

function removeLine() {
    gMeme.lines.splice([gMeme.selectedLineIdx], 1)
}

function alignLeft() {
    const sLine = getSelectedLine()
    sLine.pos.x = 0
}

function alignCenter(elCanvas) {
    const sLine = getSelectedLine()
    sLine.pos.x = elCanvas.width / 2 - sLine.width / 2
}

function alignRight(elCanvas) {
    const sLine = getSelectedLine()
    sLine.pos.x = elCanvas.width - sLine.width
}

function setFont(sFont) {
    const sLine = getSelectedLine()
    sLine.font = sFont
}

function saveMeme(imgUrl) {
    const memes = loadFromStorage('memes')
    gMeme.screenShot = imgUrl
    if (!memes) {
        saveToStorage('memes', [gMeme])
        return
    }
    memes.push(gMeme)
    saveToStorage('memes', memes)
}

function filterGallery(keyWord) {
    return gImgs.filter(img => img.keywords.includes(keyWord.toLowerCase()))
}

function addImg(img) {
    gImgs.unshift(_addImg(img))
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function _addLine(txt = '', size = 30, fillColor = '#ffffff', strokeColor = 'black', x = 20, y = 100, font = 'Impact') {
    
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

function _addStickerLine(sticker) {
    const img = new Image()
    img.src = sticker
    const width = img.naturalWidth
    const height = img.naturalHeight

    return {
        sticker,
        size: height / 5,
        width: width / 5,
        ratio: width / height,
        pos: {
            x: 50,
            y: 50
        }
    }
}

function _addImg(url) {
    return { id: getRandomInt(500, 1000), url, keywords: ['funny', 'cat'] }
}