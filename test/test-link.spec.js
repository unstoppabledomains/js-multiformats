/* globals describe, it */

import { assert } from 'aegir/chai'
import { sha256 } from '../src/hashes/sha2.js'
import * as Link from '../src/link.js'

const utf8 = new TextEncoder()

const h1 = 'QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n'
const h4 = 'bafyreidykglsfhoixmivffc5uwhcgshx4j465xwqntbmu43nb2dzqwfvae'
const CBOR = 0x71
// eslint-disable-next-line
const SHA256 = sha256.code

const sh1 = /** @type {Link.MultihashDigest<typeof sha256.code>} */ (
  Link.parse(h4).multihash
)

describe('Link', () => {
  it('isLink', () => {
    assert.equal(Link.isLink(0), false)
    assert.equal(Link.isLink(false), false)
  })

  describe('create', () => {
    it('create v1', async () => {
      const hash = await sha256.digest(utf8.encode('abc'))
      const link = Link.create(0x71, hash)
      /** @type {0x71} */
      const code = link.code
      assert.deepStrictEqual(code, 0x71)

      /** @type {1} */
      const version = link.version
      assert.deepEqual(version, 1)

      /** @type {Link.MultihashDigest<typeof sha256.code>}> */
      const multihash = link.multihash
      assert.deepStrictEqual(multihash, hash)
    })

    it('create v0', async () => {
      const hash = await sha256.digest(utf8.encode('abc'))
      const link = Link.createLegacy(hash)

      /** @type {0x70} */
      const code = link.code
      assert.deepStrictEqual(code, 0x70)

      /** @type {0} */
      const version = link.version
      assert.deepEqual(version, 0)

      /** @type {Link.MultihashDigest<typeof sha256.code>}> */
      const multihash = link.multihash
      assert.deepStrictEqual(multihash, hash)
    })
  })

  describe('parse', () => {
    it('can parse any string', () => {
      const link = Link.parse(h1)

      /** @type {Link.Link<unknown, typeof CBOR, typeof SHA256, 1>} */
      // @ts-expect-error - types can not be inferred
      const t1 = link
      assert.ok(t1)

      // it is possible to manually cast
      const t2 = /** @type {Link.LegacyLink<unknown>} */ (link)
      assert.ok(t2)
    })

    it('parse retains type info', () => {
      const original = Link.create(CBOR, sh1)
      const source = Link.format(original)
      const link = Link.parse(source)
      assert.equal(original.equals(link), true, 'format -> parse roundtrips')

      // ensure that type info is retained
      /** @type {Link.Link<unknown, typeof CBOR, typeof SHA256, 1>} */
      const t1 = link
      assert.ok(t1)

      // ensurate that you can't cast incorrectly
      const t2 =
        // @ts-expect-error - version is 1 not 0
        /** @type {Link.Link<unknown, typeof CBOR, typeof SHA256, 0>} */ (link)
      assert.ok(t2)
    })
  })

  describe('toJSON', () => {
    assert.deepStrictEqual(Link.toJSON(Link.parse(h1)), {
      '/': h1
    })

    assert.deepStrictEqual(Link.toJSON(Link.parse(h4)), {
      '/': h4
    })
  })

  describe('fromJSON', () => {
    assert.deepStrictEqual(Link.parse(h1), Link.fromJSON({
      '/': h1
    }))

    assert.deepStrictEqual(Link.parse(h1), Link.fromJSON({
      '/': h1,
      // @ts-expect-error
      foo: 1
    }))

    assert.deepStrictEqual(Link.parse(h4), Link.fromJSON({
      '/': h4
    }))
  })

  describe('JSON.stringify', () => {
    assert.equal(JSON.stringify(Link.parse(h1)), JSON.stringify({
      '/': h1
    }))

    assert.equal(JSON.stringify(Link.parse(h4)), JSON.stringify({
      '/': h4
    }))
  })
})

describe('decode', () => {
  it('decode', async () => {
    const hash = await sha256.digest(utf8.encode('abc'))
    const { bytes } = Link.create(0x71, hash)

    const link = Link.decode(bytes)

    /** @type {0x71} */
    const code = link.code
    assert.deepStrictEqual(code, 0x71)

    /** @type {1} */
    const version = link.version
    assert.deepEqual(version, 1)

    /** @type {Link.MultihashDigest<typeof sha256.code>}> */
    const multihash = link.multihash
    assert.deepStrictEqual(multihash, hash)
  })
})
