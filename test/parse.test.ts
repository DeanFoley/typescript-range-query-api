import { parse } from '../src/parse';

describe('parse testing', () => {
    let today = '2020-05-01T00:00:00.000Z'

    beforeAll(() => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date(today))
    })
    
    test('subtract 1 year, rounded', () => {
        let query: String = 'now-1y/y'
        let expected: Date = new Date('2019-01-01T00:00:00.000Z');
        let actual: Date;

        actual = parse(query)

        expect(actual).toEqual(expected)
    })

    test('now, rounded', () => {
        let query: String = 'now/y'
        let expected: Date = new Date('2020-01-01T00:00:00.000Z');
        let actual: Date;

        actual = parse(query);

        expect(actual).toEqual(expected)
    })

    test('subtract 1 day', () => {
        let query: String = 'now-1d'
        let expected: Date = new Date('2020-04-30T00:00:00.000Z');
        let actual: Date;

        actual = parse(query)

        expect(actual).toEqual(expected)
    })

    test('add 1 day', () => {
        let query: String = 'now+1d'
        let expected: Date = new Date('2020-05-02T00:00:00.000Z');
        let actual: Date;

        actual = parse(query)

        expect(actual).toEqual(expected)
    })

    test('subtract 4 days & 4 hours', () => {
        let query: String = 'now-4d-4h'
        let expected: Date = new Date('2020-04-26T20:00:00.000Z');
        let actual: Date;

        actual = parse(query)

        expect(actual).toEqual(expected)
    })

    test('subtract 10 days & 10 hours', () => {
        let query: String = 'now-10d-10h'
        let expected: Date = new Date('2020-04-20T14:00:00.000Z');
        let actual: Date;

        actual = parse(query)

        expect(actual).toEqual(expected)
    })

    afterAll(() => {
        jest.useRealTimers();
    });
})