'use strict'

function hideEl(elName) {
    const el = document.querySelector(elName)
    el.classList.add('hidden')
}

function showEl(elName) {
    const el = document.querySelector(elName)
    el.classList.remove('hidden')
}