'use strict'

const fs = require('fs')

exports.getFileType = function getFileType(a) {
    if (!fs.existsSync(a)) return ''

    const b = fs.lstatSync(a)
    if (b.isFile()) return 'File'
    if (b.isDirectory()) return 'Directory'
    return ''
}

exports.isTestFile = function isTestFile(a) {
    return a.endsWith('.test.js') || (a.startsWith('test_') && a.endsWith('.js'))
}

exports.isTestFunction = function isTestFunction(a) {
    return a.startsWith('test') || a.startsWith(isTestFunction.auto)
}

exports.isTestFunction.auto = '[[test]] '
