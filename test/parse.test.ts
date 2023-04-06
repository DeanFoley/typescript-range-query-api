import { parse } from '../src/parse';
import { DateString } from '../src/types'
import { test } from '@jest/globals';

type TestCase = {
    name: String;
    query: DateString;
    expected: Date;
}

describe('parse testing', () => {
    let today = '2020-05-01T00:00:00.000Z'

    beforeAll(() => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date(today))
    })

    const testCases: Array<TestCase> = [
        { name: 'subtract 1 year, rounded to the nearest year', query: 'now-1y/y', expected: new Date('2019-01-01T00:00:00.000Z') },
        { name: 'add 3 years', query: 'now+3y', expected: new Date('2023-05-01T00:00:00.000Z') },
        { name: 'now, rounded to the nearest year', query: 'now/y', expected: new Date('2020-01-01T00:00:00.000Z') },
        { name: 'subtract 1 day', query: 'now-1d', expected: new Date('2020-04-30T00:00:00.000Z') },
        { name: 'add 1 day', query: 'now+1d', expected: new Date('2020-05-02T00:00:00.000Z') },
        { name: 'subtract 4 days & 4 hours', query: 'now-4d-4h', expected: new Date('2020-04-26T20:00:00.000Z') },
        { name: 'subtract 10 days & 10 hours', query: 'now-10d-10h', expected: new Date('2020-04-20T14:00:00.000Z') },
        { name: 'add 20 days, rounded to the nearest month', query: 'now+20d/M', expected: new Date('2020-06-01T00:00:00.000Z') },
        { name: 'add 2 months, rounded to the nearest year', query: 'now+2M/y', expected: new Date('2021-01-01T00:00:00.000Z') },
        { name: 'subtract 7 months, rounded to the nearest year', query: 'now-7M/y', expected: new Date('2020-01-01T00:00:00.000Z') },
        { name: 'add 1 week', query: 'now+1w', expected: new Date('2020-05-08T00:00:00.000Z') },
        { name: 'subtract 7 weeks, rounded to nearest month', query: 'now-7w/M', expected: new Date('2020-03-01T00:00:00.000Z') },
        { name: 'add 4 days, round to the nearest week', query: 'now+4d/w', expected: new Date('2020-05-03T00:00:00.000Z') },
        { name: 'subtract 2 days, round to the nearest week', query: 'now-2d/w', expected: new Date('2020-05-03T00:00:00.000Z') },
        { name: 'subtract 25 minutes', query: 'now-25m', expected: new Date('2020-04-30T23:35:00.000Z') },
        { name: 'add 25 minutes', query: 'now+25m', expected: new Date('2020-05-01T00:25:00.000Z') },
        { name: 'subtract 40 seconds', query: 'now-40s', expected: new Date('2020-04-30T23:59:20.000Z') },
        { name: 'add 40 seconds', query: 'now+40s', expected: new Date('2020-05-01T00:00:40.000Z') },
        { name: 'add 10 days, rounded to the nearest month', query: 'now+10d/M', expected: new Date('2020-05-01T00:00:00.000Z') },
        { name: 'add 3 hours, rounded to the nearest day', query: 'now+3h/d', expected: new Date('2020-05-01T00:00:00.000Z') },
        { name: 'add 21 hours, rounded to the nearest day', query: 'now+21h/d', expected: new Date('2020-05-02T00:00:00.000Z') },
        { name: 'add 35 minutes, rounded to the nearest hour', query: 'now+35m/h', expected: new Date('2020-05-01T01:00:00.000Z') },
        { name: 'subtract 35 minutes, rounded to the nearest hour', query: 'now-35m/h', expected: new Date('2020-04-30T23:00:00.000Z') },
        { name: 'subtract 27 seconds, rounded to the nearest minute', query: 'now-27s/m', expected: new Date('2020-05-01T00:00:00.000Z') },
        { name: 'add 26 seconds, rounded to the nearest minute', query: 'now+26s/m', expected: new Date('2020-05-01T00:00:00.000Z') },
    ]

    testCases.forEach(({ name, query, expected}) => {
        test(`${name}`, () => {
            const actual: Date | Error = parse(query)

            expect(actual).toEqual(expected)
        })
    })

    afterAll(() => {
        jest.useRealTimers();
    });
})

describe('millisecond parse testing', () => {
    test('round down', () => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date('2020-05-01T00:00:00.400Z'))

        const actual: Date | Error = parse('now/s')

        expect(actual).toEqual(new Date('2020-05-01T00:00:00.000Z'))
    })

    test('round up', () => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date('2020-05-01T00:00:00.700Z'))

        const actual: Date | Error = parse('now/s')

        expect(actual).toEqual(new Date('2020-05-01T00:00:01.000Z'))
    })
})

describe('parse error tests', () => {
    test('invalid time difference query', () => {
        let query: DateString = 'now+10g'
        
        expect(() => parse(query)).toThrow(Error)
    })

    test('invalid rounding query', () => {
        let query: DateString = 'now+10m/g'
        
        expect(() => parse(query)).toThrow(Error)
    })
})