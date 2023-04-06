const MS_IN_SECOND: number = 1000;
const MS_IN_MINUTE: number = MS_IN_SECOND * 60;
const MS_IN_HOUR: number = MS_IN_MINUTE * 60;
const MS_IN_DAY: number = MS_IN_HOUR * 24;
const MS_IN_WEEK: number = MS_IN_DAY * 7;
const MS_IN_YEAR: number = MS_IN_DAY * 365;
const MS_IN_MONTH: number = MS_IN_YEAR / 12;

import { TimeUnit, DateString } from './types'

let dateString: string;
let differenceInMs: number;
let leapOffset: number;
let isCurrentLeapYear: boolean;

const stringify = (date: Date): DateString => {
    try {
        if (!valiDate(date)) {
            throw new Error("not a valid date!")
        }

        dateString = 'now';

        const now = new Date();

        differenceInMs = date.getTime() - now.getTime();

        leapOffset = now.getFullYear() % 4;
        isCurrentLeapYear = leapOffset == 0

        // calc years
        let diff: number = timeCalculator(MS_IN_YEAR, TimeUnit.Year)
        if (doneChecker(differenceInMs)) {
            return dateString
        }

        // calc leap years
        if (isCurrentLeapYear && diff < -1) {
            differenceInMs += MS_IN_DAY
        } else if (isCurrentLeapYear && diff > 1) {
            differenceInMs -= MS_IN_DAY
        }
        let leaps: number = diff / -4
        if (leaps > 1) {
            differenceInMs += MS_IN_DAY * Math.floor(leaps)
        }
        leaps = diff / 4
        if (leaps > 2) {
            differenceInMs -= MS_IN_DAY * Math.floor(leaps - 1)
        }

        // calc months
        timeCalculator(MS_IN_MONTH, TimeUnit.Month)
        if (doneChecker(differenceInMs)) {
            return dateString
        }

        // calc weeks
        timeCalculator(MS_IN_WEEK, TimeUnit.Week)
        if (doneChecker(differenceInMs)) {
            return dateString
        }

        // calc days
        timeCalculator(MS_IN_DAY, TimeUnit.Day)
        if (doneChecker(differenceInMs)) {
            return dateString
        }

        // calc hours
        timeCalculator(MS_IN_HOUR, TimeUnit.Hour)
        if (doneChecker(differenceInMs)) {
            return dateString
        }

        // calc minutes
        timeCalculator(MS_IN_MINUTE, TimeUnit.Minute)
        if (doneChecker(differenceInMs)) {
            return dateString
        }
        
        // calc seconds
        timeCalculator(MS_IN_SECOND, TimeUnit.Second)

        return dateString
    } catch (error) {
        throw error
    }
}

const doneChecker = (ms: number): boolean => {
    return ms == 0
}

const timeCalculator = (timeUnit: number, timeString: string): number => {
    const diff: number = differenceInMs / timeUnit;
    if (diff <= -1) {
        const wholeUnit: number = Math.ceil(diff)
        dateString = dateString.concat(wholeUnit + timeString)
        differenceInMs = differenceInMs - (wholeUnit * timeUnit);
    } else if (diff >= 1) {
        const wholeUnit: number = Math.floor(diff)
        dateString = dateString.concat("+" + wholeUnit + timeString)
        differenceInMs = differenceInMs - (wholeUnit * timeUnit);
    }
    return diff
}

const valiDate = (date: Date): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
}

export { stringify }