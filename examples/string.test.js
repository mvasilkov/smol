const assert = require('assert').strict
const { describe, it } = require('smoltest')(exports)

describe('String', () => {
    it('#concat()', () => {
        assert.strictEqual('a'.concat('b'), 'ab')
    })

    it('#repeat()', () => {
        assert.strictEqual('a'.repeat(2), 'aa')
    })
})
