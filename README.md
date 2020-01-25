smol
===

A JavaScript test runner. Like Mocha but smol.

*Ok so basically I'm very smol*

[![npm][npm-image]][npm-url]

---

Why smol
---

- No global variables
- No preprocessing
- No dependencies
- Basically it's very smol

Installation
---

```sh
yarn add smoltest
```

Usage
---

Put the following code in the file **example.test.js**:

```javascript
const assert = require('assert').strict
const { describe, it } = require('smoltest')(exports)

describe('JavaScript programming language', () => {
    it('Arrays are fun', () => {
        const a = [,]
        assert.strictEqual(a.includes(a[0]), true)
        assert.strictEqual(a.indexOf(a[0]), -1)
    })

    it('constructor constructor constructor', () => {
        assert.strictEqual(
            constructor.constructor.constructor('return 9')(), 9)
    })
})
```

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

| Mocha "BDD" | Mocha "TDD"
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

You can also write test functions without any special syntax whatsoever,
similar to pytest. Make sure to export any functions that are meant to be
test cases with names starting with **test**.

For example:

```javascript
exports.testParseInt = () => {
    assert.strictEqual(parseInt(0.000001), 0)
    assert.strictEqual(parseInt(0.0000001), 1)
}
```

License
---

MIT

[npm-image]: https://img.shields.io/npm/v/smoltest.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/smoltest
