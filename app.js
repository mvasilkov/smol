#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')

const { getFileType } = require('./util')

async function test(a) {
    const tests = require(a)
    for (const b in tests) {
        if (!b.startsWith('test') || typeof tests[b] != 'function')
            continue

        console.log(`\t* ${b}`)
        await tests[b]()
    }
}

async function run(root) {
    const files = fs.readdirSync(root, { encoding: 'utf8', withFileTypes: true })
    for (let a of files) {
        switch (true) {
            case a.isDirectory():
                run(path.join(root, a.name))
            case !a.isFile():
                continue
        }
        a = a.name
        if (!a.startsWith('test_') || !a.endsWith('.js'))
            continue

        console.log(`* ${a.substr(0, a.length - 3)}`)
        await test(path.join(root, a))
    }
}

if (require.main === module) {
    process.on('unhandledRejection', err => { throw err })

    const root = process.argv.length == 3 ? path.resolve(process.argv[2]) : ''
    const type = root ? getFileType(root) : ''

    if (type == 'Directory') run(root)
    else if (type == 'File') test(root)
    else console.log('Usage: smol <DIR>')
}
