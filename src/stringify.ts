const MS_IN_SECOND: number = 1000;
const MS_IN_MINUTE: number = MS_IN_SECOND * 60;
const MS_IN_HOUR: number = MS_IN_MINUTE * 60;
const MS_IN_DAY: number = MS_IN_HOUR * 24;
const MS_IN_WEEK: number = MS_IN_DAY * 7;
const MS_IN_YEAR: number = MS_IN_DAY * 365;
const MS_IN_MONTH: number = MS_IN_YEAR / 12;

const stringify = (date: Date): String => {
    let dateString: String = 'now';

    const now = new Date();

    let differenceInMs: number = date.getTime() - now.getTime();

    const leapOffset: number = now.getFullYear() % 4;
    const isCurrentLeapYear: boolean = leapOffset == 0

    // calc years
    let yearDiff: number = differenceInMs / MS_IN_YEAR
    if (yearDiff <= -1) {
        const wholeYears: number = Math.ceil(yearDiff)
        dateString = dateString.concat(wholeYears + "y")
        differenceInMs = differenceInMs - (wholeYears * MS_IN_YEAR);
    } else if (yearDiff >= 1) {
        const wholeYears: number = Math.floor(yearDiff)
        dateString = dateString.concat("+" + wholeYears + "y")
        differenceInMs = differenceInMs - (wholeYears * MS_IN_YEAR);
    }

    if (doneChecker(differenceInMs)) {
        return dateString
    }

    if (isCurrentLeapYear && yearDiff < -1) {
        differenceInMs += MS_IN_DAY
    } else if (isCurrentLeapYear && yearDiff > 1) {
        differenceInMs -= MS_IN_DAY
    }

    let leaps: number = yearDiff / -4
    if (leaps > 1) {
        differenceInMs += MS_IN_DAY * Math.floor(leaps)
    }

    leaps = yearDiff / 4
    if (leaps > 2) {
        differenceInMs -= MS_IN_DAY * Math.floor(leaps - 1)
    }

    // calc months
    const monthDiff: number = differenceInMs / MS_IN_MONTH
    if (monthDiff <= -1) {
        const wholeMonths: number = Math.ceil(monthDiff)
        dateString = dateString.concat(wholeMonths + "M")
        differenceInMs = differenceInMs - (wholeMonths * MS_IN_MONTH);
    } else if (monthDiff >= 1) {
        const wholeMonths: number = Math.floor(monthDiff)
        dateString = dateString.concat("+" + wholeMonths + "M")
        differenceInMs = differenceInMs - (wholeMonths * MS_IN_MONTH);
    }

    if (doneChecker(differenceInMs)) {
        return dateString
    }

    // calc weeks
    const weekDiff: number = differenceInMs / MS_IN_WEEK;
    if (weekDiff <= -1) {
        const wholeWeeks: number = Math.ceil(weekDiff)
        dateString = dateString.concat(wholeWeeks + "w")
        differenceInMs = differenceInMs - (wholeWeeks * MS_IN_WEEK);
    } else if (weekDiff >= 1) {
        const wholeWeeks: number = Math.floor(weekDiff)
        dateString = dateString.concat("+" + wholeWeeks + "w")
        differenceInMs = differenceInMs - (wholeWeeks * MS_IN_WEEK);
    }

    if (doneChecker(differenceInMs)) {
        return dateString
    }

    // calc days
    const dayDiff: number = differenceInMs / MS_IN_DAY;
    if (dayDiff <= -1) {
        const wholeDays: number = Math.ceil(dayDiff)
        dateString = dateString.concat(wholeDays + "d")
        differenceInMs = differenceInMs - (wholeDays * MS_IN_DAY);
    } else if (dayDiff >= 1) {
        const wholeDays: number = Math.floor(dayDiff)
        dateString = dateString.concat("+" + wholeDays + "d")
        differenceInMs = differenceInMs - (wholeDays * MS_IN_DAY);
    }

    if (doneChecker(differenceInMs)) {
        return dateString
    }

    // calc hours
    const hourDiff: number = differenceInMs / MS_IN_HOUR;
    if (hourDiff <= -1) {
        const wholeHours: number = Math.ceil(hourDiff)
        dateString = dateString.concat(wholeHours + "h")
        differenceInMs = differenceInMs - (wholeHours * MS_IN_HOUR);
    } else if (hourDiff >= 1) {
        const wholeHours: number = Math.floor(hourDiff)
        dateString = dateString.concat("+" + wholeHours + "h")
        differenceInMs = differenceInMs - (wholeHours * MS_IN_HOUR);
    }

    if (doneChecker(differenceInMs)) {
        return dateString
    }

    // calc minutes
    const minuteDiff: number = differenceInMs / MS_IN_MINUTE;
    if (minuteDiff <= -1) {
        const wholeMinutes: number = Math.ceil(minuteDiff)
        dateString = dateString.concat(wholeMinutes + "m")
        differenceInMs = differenceInMs - (wholeMinutes * MS_IN_MINUTE);
    } else if (minuteDiff >= 1) {
        const wholeMinutes: number = Math.floor(minuteDiff)
        dateString = dateString.concat("+" + Math.floor(minuteDiff) + "m")
        differenceInMs = differenceInMs - (wholeMinutes * MS_IN_MINUTE);
    }

    if (doneChecker(differenceInMs)) {
        return dateString
    }
    
    // calc seconds
    const secondDiff: number = differenceInMs / MS_IN_SECOND;
    if (secondDiff < -1) {
        const wholeSeconds: number = Math.ceil(secondDiff)
        dateString = dateString.concat(wholeSeconds + "m")
        differenceInMs = differenceInMs - (wholeSeconds * MS_IN_MINUTE);
    } else if (secondDiff > 1) {
        const wholeSeconds: number = Math.floor(secondDiff)
        dateString = dateString.concat("+" + wholeSeconds + "m")
        differenceInMs = differenceInMs - (wholeSeconds * MS_IN_MINUTE);
    }


    return dateString
}

const doneChecker = (ms: number): boolean => {
    return ms == 0
}

export { stringify }