import { stringify } from '../src/stringify'

describe('stringify testing', () => {
    let today = '2020-05-01T00:00:00.000Z'

    beforeAll(() => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date(today))
    })
    
    test('subtract 1 year', () => {
        let query: Date = new Date('2019-05-01T00:00:00.000Z')
        let expected: String = 'now-1y'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })   

    test('subtract 2 years', () => {
        let query: Date = new Date('2018-05-01T00:00:00.000Z')
        let expected: String = 'now-2y'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })

    test('add 2 years', () => {
        let query: Date = new Date('2022-05-01T00:00:00.000Z')
        let expected: String = 'now+2y'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })

    test('subtract 6 years', () => {
        let query: Date = new Date('2014-05-01T00:00:00.000Z')
        let expected: String = 'now-6y'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })

    test('add 6 years', () => {
        let query: Date = new Date('2026-05-01T00:00:00.000Z')
        let expected: String = 'now+6y'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })

    test('subtract 22 years', () => {
        let query: Date = new Date('1998-05-01T00:00:00.000Z')
        let expected: String = 'now-22y'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })

    test('add 22 years', () => {
        let query: Date = new Date('2042-05-01T00:00:00.000Z')
        let expected: String = 'now+22y'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })

    test('now', () => {
        let query: Date = new Date('2020-05-01T00:00:00.000Z')
        let expected: String = 'now'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })

    test('subtract 1 day', () => {
        let query: Date = new Date('2020-04-30T00:00:00.000Z')
        let expected: String = 'now-1d'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })

    test('add 1 day', () => {
        let query: Date = new Date('2020-05-02T00:00:00.000Z')
        let expected: String = 'now+1d'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })

    test('subtract 4 days & 4 hours', () => {
        let query: Date = new Date('2020-04-26T20:00:00.000Z')
        let expected: String = 'now-4d-4h'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })

    test('add 1 week and 1 day', () => {
        let query: Date = new Date('2020-05-09T00:00:00.000Z')
        let expected: String = 'now+1w+1d'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })

    test('subtract 1 week and 1 day', () => {
        let query: Date = new Date('2020-04-23T00:00:00.000Z')
        let expected: String = 'now-1w-1d'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })

    test('subtract 1 year (not a leap year)', () => {
        jest.setSystemTime(new Date('2018-05-01T00:00:00.000Z'))

        let query: Date = new Date('2017-05-01T00:00:00.000Z')
        let expected: String = 'now-1y'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })
    
    test('subtract 4 years (not a leap year)', () => {
        jest.setSystemTime(new Date('2018-05-01T00:00:00.000Z'))

        let query: Date = new Date('2014-05-01T00:00:00.000Z')
        let expected: String = 'now-4y'
        let actual: String = '';

        actual = stringify(query)

        expect(actual).toEqual(expected)
    })
})