'use strict'

const { _tests } = require('../util')

module.exports = function smolMocha(exports) {
    const count = {}
    const tests = exports[_tests] = []

    function describe(title, fun) {
        fun()
    }

    function it(title, fun) {
        if (count.hasOwnProperty(title)) title += ` (${++count[title]})`
        else count[title] = 0

        function test() {
            if (!fun.length) return fun()
            return new Promise(done => fun(done))
        }

        tests.push({ title, test })
    }

    function xdescribe() {
    }

    function xit() {
    }

    return { describe, it, xdescribe, xit }
}
