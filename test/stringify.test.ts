import { stringify } from '../src/stringify'
import { DateString } from '../src/types'
import { test } from '@jest/globals';

type TestCase = {
    name: String;
    query: Date;
    expected: DateString;
}

describe('stringify testing', () => {
    let today = '2020-05-01T00:00:00.000Z'

    beforeAll(() => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date(today))
    })

    const testCases: Array<TestCase> = [
        { name: 'subtract 1 year', query: new Date('2019-05-01T00:00:00.000Z'), expected: 'now-1y' },
        { name: 'subtract 2 years', query: new Date('2018-05-01T00:00:00.000Z'), expected: 'now-2y' },
        { name: 'add 2 years', query: new Date('2022-05-01T00:00:00.000Z'), expected: 'now+2y' },
        { name: 'subtract 6 years', query: new Date('2014-05-01T00:00:00.000Z'), expected: 'now-6y' },
        { name: 'add 6 years', query: new Date('2026-05-01T00:00:00.000Z'), expected: 'now+6y' },
        { name: 'subtract 22 years', query: new Date('1998-05-01T00:00:00.000Z'), expected: 'now-22y' },
        { name: 'add 22 years', query: new Date('2042-05-01T00:00:00.000Z'), expected: 'now+22y' },
        { name: 'now', query: new Date('2020-05-01T00:00:00.000Z'), expected: 'now' },
        { name: 'subtract 1 day', query: new Date('2020-04-30T00:00:00.000Z'), expected: 'now-1d' },
        { name: 'add 1 day', query: new Date('2020-05-02T00:00:00.000Z'), expected: 'now+1d' },
        { name: 'subtract 4 days & 4 hours', query: new Date('2020-04-26T20:00:00.000Z'), expected: 'now-4d-4h' },
        { name: 'add 1 week and 1 day', query: new Date('2020-05-09T00:00:00.000Z'), expected: 'now+1w+1d' },
        { name: 'subtract 1 week and 1 day', query: new Date('2020-04-23T00:00:00.000Z'), expected: 'now-1w-1d' },
        { name: 'add 1 week', query: new Date('2020-05-08T00:00:00.000Z'), expected: 'now+1w' },
        { name: 'add 15 minutes', query: new Date('2020-05-01T00:15:00.000Z'), expected: 'now+15m' },
        { name: 'subtract 15 minutes', query: new Date('2020-04-30T23:45:00.000Z'), expected: 'now-15m' },
        { name: 'add 15 seconds', query: new Date('2020-05-01T00:00:15.000Z'), expected: 'now+15s' },
        { name: 'subtract 15 seconds', query: new Date('2020-04-30T23:59:45.000Z'), expected: 'now-15s' },
    ]


    testCases.forEach(({ name, query, expected}) => {
        test(`${name}`, () => {
            const actual: DateString = stringify(query)

            expect(actual).toEqual(expected)
        })
    })

    afterAll(() => {
        jest.useRealTimers();
    });
})

describe('stringify testing (off a leap year)', () => {
    let today = '2018-05-01T00:00:00.000Z'

    beforeAll(() => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date(today))
    })

    const testCases: Array<TestCase> = [
        { name: 'subtract 1 year (not a leap year)', query: new Date('2017-05-01T00:00:00.000Z'), expected: 'now-1y' },
        { name: 'subtract 4 years (not a leap year)', query: new Date('2014-05-01T00:00:00.000Z'), expected: 'now-4y' },
    ]

    testCases.forEach(({ name, query, expected}) => {
        test(`${name}`, () => {
            const actual: DateString = stringify(query)

            expect(actual).toEqual(expected)
        })
    })

    afterAll(() => {
        jest.useRealTimers();
    });
})

describe('stringify error tests', () => {
    test('invalid date object', () => {
        let query: Date = new Date('2020-13-01T00:00:00.000Z')

        expect(() => stringify(query)).toThrow(Error)
    })
})