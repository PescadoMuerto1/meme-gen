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
  