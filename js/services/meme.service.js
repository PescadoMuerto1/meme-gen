var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] }]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            fillColor: 'red',
            strokeColor: 'red'
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

function setLineTxt(txt, lineIdx) {
    gMeme.lines[lineIdx].txt = txt
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setLineColor(color) {
    console.log(color);
    gMeme.lines[0].fillColor = color
    gMeme.lines[0].strokeColor = color
}

function increaseLinesTxtSize() {
    gMeme.lines[0].size += 5
}

function decreaseLinesTxtSize() {
    gMeme.lines[0].size -= 5
}

function getImgs() {
    return gImgs
}
