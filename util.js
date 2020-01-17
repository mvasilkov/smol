'use strict'

const fs = require('fs')

exports.getFileType = function getFileType(a) {
    if (!fs.existsSync(a)) return ''

    const b = fs.lstatSync(a)
    if (b.isFile()) return 'File'
    if (b.isDirectory()) return 'Directory'
    return ''
}
