'use strict'

const { _tests, _untitled } = require('./util')

const nop = () => undefined

const toPromise = fun => () => new Promise(done => fun(done))

function decorateMocha(fun) {
    return (a, b) => {
        let [title, test] = typeof a == 'function' ?
            ['Untitled', a] : [a, b]
        if (typeof test != 'function') test = nop
        else if (test.length) test = toPromise(test)
        return fun(title, test)
    }
}

function initStackFrame() {
    return {
        before: [],
        after: [],
        beforeEach: [],
        afterEach: [],
    }
}

function stackFrameInvoke(stackFrame, type) {
    return async () => {
        const functions = stackFrame[type]
        for (let n = 0; n < functions.length; ++n)
            await functions[n]()
    }
}

function stackInvokeMultiple(stack, type) {
    return async () => {
        for (let n = 0; n < stack.length; ++n)
            await stackFrameInvoke(stack[n], type)()
    }
}

function initUntitled(stack, type) {
    return {
        title: _untitled,
        test: stackInvokeMultiple(stack, type),
    }
}

module.exports = function smolMocha(exports) {
    const stack = [initStackFrame()]
    const tests = exports[_tests] = []

    function stackPushFunction(type) {
        return decorateMocha((_title, fun) => {
            stack[stack.length - 1][type].push(fun)
        })
    }

    const before = stackPushFunction('before')
    const after = stackPushFunction('after')
    const beforeEach = stackPushFunction('beforeEach')
    const afterEach = stackPushFunction('afterEach')

    const describe = decorateMocha((title, fun) => {
        const stackFrame = initStackFrame()

        tests.push({
            title,
            test: stackFrameInvoke(stackFrame, 'before'),
            indentLevel: 1,
        })

        stack.push(stackFrame)
        fun()
        stack.pop()

        tests.push({
            title: _untitled,
            test: stackFrameInvoke(stackFrame, 'after'),
            indentLevel: -1,
        })
    })

    const it = decorateMocha((title, test) => {
        tests.push(
            initUntitled(stack.slice(), 'beforeEach'),
            { title, test },
            initUntitled(stack.slice().reverse(), 'afterEach'))
    })

    const xdescribe = nop
    const xit = nop

    /*
    The BDD interface provides describe(), context(), it(),
    specify(), before(), after(), beforeEach(), and afterEach().

    context() is an alias for describe(), and specify() is
    an alias for it().

    The TDD interface provides suite(), test(), suiteSetup(),
    suiteTeardown(), setup(), and teardown().
    */

    return {
        // BDD
        before, after, beforeEach, afterEach, describe, it,
        xdescribe, xit,
        context: describe, specify: it,
        // TDD
        suite: describe, test: it,
        suiteSetup: before, suiteTeardown: after,
        setup: beforeEach, teardown: afterEach,
    }
}
