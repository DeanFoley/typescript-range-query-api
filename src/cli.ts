import { parse } from './parse'
import { stringify } from './stringify'

if (process.argv[2] && process.argv[2] === "-p") {
    if (process.argv[3]) {
        console.log(parse(process.argv[3]))
        process.exit()
    } else {
        console.log("Please provide something to parse!")
        process.exit()
    }
} else if (process.argv[2] && process.argv[2] === "-s") {
    if (process.argv[3]) {
        console.log(stringify(new Date(process.argv[3])))
        process.exit()
    } else {
        console.log("Please provide something to stringify!")
        process.exit()
    }
} else {
    console.log("No valid flag provided!")
    process.exit()
}