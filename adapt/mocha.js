'use strict'

const { isTestFunction } = require('../util')

module.exports = function smolMocha(exports) {
    const count = {}

    function describe(title, fun) {
        fun()
    }

    function it(title, fun) {
        if (count.hasOwnProperty(title)) title += ` (${++count[title]})`
        else count[title] = 0

        exports[isTestFunction.auto + title] = function test() {
            if (!fun.length) return fun()
            return new Promise(done => fun(done))
        }
    }

    function xdescribe() {
    }

    function xit() {
    }

    return { describe, it, xdescribe, xit }
}
