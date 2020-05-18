smol
===

A JavaScript test runner. Like Mocha but smol.

[<img src="https://raw.githubusercontent.com/mvasilkov/smol/master/files/smol.png" width="200" height="200">][github]

*Ok so basically I'm very smol*

[![npm][npm-badge]][npm-url]
[![no dependencies][dependencies-badge]][dependencies-url]

---

Why smol
---

- No global variables
- No dependencies
- Basically it's very smol

Installation
---

```sh
npm add smoltest
```

Synopsis
---

```sh
smol <DIR>
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

<p align="center"><sup>File: string.test.js</sup></p>

Run the tests:

```sh
npx smol .
```

Test files are those

- Starting with **test** and ending with **.js**
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

<p align="center"><sup>File: array.test.js</sup></p>

License
---

MIT

[github]: https://github.com/mvasilkov/smol
[npm-badge]: https://img.shields.io/npm/v/smoltest.svg?style=flat
[npm-url]: https://www.npmjs.com/package/smoltest
[dependencies-badge]: https://img.shields.io/librariesio/release/npm/smoltest?style=flat
[dependencies-url]: https://www.npmjs.com/package/smoltest?activeTab=dependencies
[docs-bdd]: https://mochajs.org/#bdd
[docs-tdd]: https://mochajs.org/#tdd
