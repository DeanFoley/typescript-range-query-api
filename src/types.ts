enum TimeUnit { 
    Year = "y",
    Month = "M",
    Week = "w",
    Day = "d",
    Hour = "h",
    Minute = "m",
    Second = "s"
}

type DateString = String;

interface ParseRequest {
    dateString: DateString;
}

interface StringifyRequest {
    date: Date
}

export {
    TimeUnit,
    DateString,
    ParseRequest,
    StringifyRequest
}