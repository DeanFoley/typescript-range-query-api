# The Dean Foley Calendar Distance Proximity Calculator (DFCDPC)

## Features

- Parse a string, receive a date in the future
- Accept a date, receive a string of how far away it is

## CLI

### Parse

To execute with your request:

`npm run exec:parse -- <string>`

For a pre-written demonstrative example:

`npm run demo:parse`

### Stringify

To execute with your request:

`npm run exec:parse -- <timestamp>`

For a pre-written demonstrative example:

`npm run demo:stringify`

## API

There is an API available for this tool, which can be served with `ts-node` from an NPM task:

`npm run serve`

You can also serve it yourself by running `npm run build`, then `node dist/api.js`

### POST Parse

#### Request

`curl -X POST http://localhost:1337/parse -H 'Content-Type:application/json' -d '{"dateString": "now+1y/y"}'`

#### Response

`"2024-01-01T00:00:00.000Z"`

### POST Stringify

#### Request

`curl -X POST http://localhost:1337/stringify -H 'Content-Type:application/json' -d '{"date": "2026-01-01T09:45:00.000Z"}'`

#### Response

`"now+3y+1M+3w+5d+1h+49m+11s"` (not legally guaranteed to be accurate)

## Problems

 - Leap years: working out a solution for leap years in `stringify` was tough, as they add a day to the *distance* between two days which isn't *technically* accurate (though this is a known general problem in programming e.g. Google smearing leap seconds). I worked out a solution in the end by working out how many leap years a given time difference passes through and subtracting one day per leap year to offset the leap days.
 - UTC/timezones: debugging TypeScript doesn't provide *quite* enough clarity to make timezones clear and this led to a bit of difficulty ensuring my operations were working as intended. It's possible that some errors still exist in my code that haven't surfaced yet due to BST being in place at time of typing. If you have any time-sensitive operations I don't recommend relying on this program to maintain them after October.

## Todo

Here's a few things I'd look into as further improvements & fixes:

 - better error handling, particularly in the API to properly check received data before trying it in the logical parts
 - more unit tests covering obscure scenarios (especially leap years)
 - I think `parse.ts` could be made a bit more elegant and easy to read rather than using two gigantic switch statements, especially in the rounding section where often we're doing the same operation but with varying input data (which could be passed into a helper function with a variadic argument)
 - I'm not 100% confident we're accounting for timezones. While all my unit tests pass I'm  not totally satisfied with the discrepency in the usage of `Date.UTC` in `stringify.ts`