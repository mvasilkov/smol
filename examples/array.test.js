const assert = require('assert').strict

exports['test Array#concat()'] = () => {
    assert.deepStrictEqual(['a'].concat(['b']), ['a', 'b'])
}

exports['test Array#fill()'] = () => {
    assert.deepStrictEqual(Array(2).fill('a'), ['a', 'a'])
}
