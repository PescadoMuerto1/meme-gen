var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] }]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    isDrag: false,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            width: 0,
            fillColor: 'red',
            strokeColor: 'red',
            pos: {
                x: 0,
                y: 50
            }
        },
        {
            txt: 'I dont like Falafel',
            size: 30,
            width: 0,
            fillColor: 'white',
            strokeColor: 'white',
            pos: {
                x: 0,
                y: 400
            }
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgById(imgId) {
    const img = gImgs.find(img => img.id === imgId)
    return img.url
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

function setLineColor(color) {
    const lineIdx = gMeme.selectedLineIdx

    gMeme.lines[lineIdx].fillColor = color
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

function _addLine(txt = 'write here', size = 30, fillColor = 'white', strokeColor = 'white', x = 100, y = 100) {
    return {
        txt,
        size,
        fillColor,
        strokeColor,
        pos: {
            x,
            y
        }
    }
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