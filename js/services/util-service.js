'use strict'

function hideEl(elName) {
    const el = document.querySelector(elName)
    el.classList.add('hidden')
}

function showEl(elName) {
    const el = document.querySelector(elName)
    el.classList.remove('hidden')
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}

function saveToStorage(key, val) {
    const strVal = JSON.stringify(val)
	localStorage.setItem(key, strVal)
}

function loadFromStorage(key) {
	var val = localStorage.getItem(key)
	return JSON.parse(val)
}
