import { hello } from '../src/hello'

describe('hello world', () => {
    test('hello world!', () => {
        let actual = hello();

        expect(actual).toMatch("Hello world!")
    })
})