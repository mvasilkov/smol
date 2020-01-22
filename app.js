#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')

const smolMocha = require('./mocha')
const { _tests, _untitled,
    getFileType, isTestFile, isTestFunction } = require('./util')

module.exports = smolMocha

function collect(testMod) {
    const tests = []
    for (const [title, test] of Object.entries(testMod)) {
        if (!isTestFunction(title) || typeof test != 'function')
            continue

        tests.push({ title, test })
    }
    return tests
}

async function test(testFile) {
    const testMod = require(testFile)
    const tests = Array.isArray(testMod[_tests]) ? testMod[_tests] : collect(testMod)

    for (let n = 0; n < tests.length; ++n) {
        const { title, test } = tests[n]
        if (title != _untitled)
            console.log(`\t* ${title}`)
        await test()
    }
}

async function run(root) {
    const files = fs.readdirSync(root, { encoding: 'utf8', withFileTypes: true })
    for (let a of files) {
        switch (true) {
            case a.isDirectory():
                await run(path.join(root, a.name))
            case !a.isFile():
            case !isTestFile(a = a.name):
                continue
        }

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
