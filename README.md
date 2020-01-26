smol
===

A JavaScript test runner. Like Mocha but smol.

*Ok so basically I'm very smol*

[![npm][npm-image]][npm-url]

---

Why smol
---

- No global variables
- No dependencies
- Basically it's very smol

Installation
---

```sh
yarn add smoltest
```

Usage
---

Put the following code in a file:

```javascript
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
```

<center><sup>File: string.test.js</sup></center>

Run the tests:

```sh
npx smol .
```

Test files are those

- Starting with **test_**
- Ending with **.test.js**
- Ending with **.spec.js**

Syntax
---

Smol supports the following Mocha syntax:

| Mocha "BDD" [🔗][docs-bdd] | Mocha "TDD" [🔗][docs-tdd]
| --- | ---
| describe | suite
| it | test
| before | suiteSetup
| after | suiteTeardown
| beforeEach | setup
| afterEach | teardown
| context |
| specify |
| xdescribe |
| xit |

Unlike Mocha, these functions aren't global. They can be imported
as follows:

```javascript
const { describe, it, beforeEach, afterEach } = require('smoltest')(exports)
```

You can also write test functions without any special syntax whatsoever,
similar to pytest. Make sure to export any functions that are meant to be
test cases with names starting with **test**.

For example:

```javascript
const assert = require('assert').strict

exports['test Array#concat()'] = () => {
    assert.deepStrictEqual(['a'].concat(['b']), ['a', 'b'])
}

exports['test Array#fill()'] = () => {
    assert.deepStrictEqual(Array(2).fill('a'), ['a', 'a'])
}
```

<center><sup>File: array.test.js</sup></center>

License
---

MIT

[npm-image]: https://img.shields.io/npm/v/smoltest.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/smoltest
[docs-bdd]: https://mochajs.org/#bdd
[docs-tdd]: https://mochajs.org/#tdd
