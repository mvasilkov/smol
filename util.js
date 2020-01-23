'use strict'

const fs = require('fs')

exports._tests = Symbol('tests')
exports._untitled = Symbol('untitled')

exports.getFileType = function getFileType(path) {
    if (!fs.existsSync(path)) return ''

    const stats = fs.lstatSync(path)
    if (stats.isFile()) return 'File'
    if (stats.isDirectory()) return 'Directory'
    return ''
}

exports.isTestFile = function isTestFile(a) {
    return a.endsWith('.test.js') || (a.startsWith('test_') && a.endsWith('.js'))
}

exports.isTestFunction = function isTestFunction(a) {
    return a.startsWith('test')
}

exports.logIndent = function logIndent(string) {
    const indent = ' '.repeat(2 * logIndent.indentLevel)
    console.log(`${indent}${string}`)
}

exports.logIndent.indentLevel = 1
