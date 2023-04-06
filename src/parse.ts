import { TimeUnit, DateString } from './types';

const parse = (datestring: DateString): Date | Error => {
    try {
        let now = new Date();

        const timeInstructions: Array<String> = datestring.match(/[\+|\-][0-9]*[yMwdhms]*/g) ?? [];
        const roundingMetric: Array<String> = datestring.match(/\/[yMwdhms]?/) ?? [];
        const rounding: boolean = roundingMetric.length > 0

        let parsedTime: Date = new Date(now);

        for (let instruction of timeInstructions) {
            const polarity: boolean = instruction[0] == "+" ? true : false
            const unit: String = instruction.slice(-1)
            const time: number = parseInt(instruction.substring(1, instruction.length - 1))
                    
            switch (unit) {
                case TimeUnit.Year:
                    polarity ? 
                        parsedTime.setFullYear(now.getFullYear() + time) :
                        parsedTime.setFullYear(now.getFullYear() - time) 
                    break  
                    
                case TimeUnit.Month:
                    polarity ? 
                        parsedTime.setMonth(now.getMonth() + time) :
                        parsedTime.setMonth(now.getMonth() - time) 
                    break  
                        
                case TimeUnit.Week:
                    polarity ? 
                        parsedTime.setDate(now.getDate() + (time * 7)) :
                        parsedTime.setDate(now.getDate() - (time * 7)) 
                    break     
                            
                case TimeUnit.Day:
                    polarity ? 
                        parsedTime.setDate(now.getDate() + time) :
                        parsedTime.setDate(now.getDate() - time) 
                    break    
                                
                case TimeUnit.Hour:
                    polarity ? 
                        parsedTime.setHours(now.getHours() + time) :
                        parsedTime.setHours(now.getHours() - time) 
                    break   

                case TimeUnit.Minute:                                    
                    polarity ? 
                        parsedTime.setMinutes(now.getMinutes() + time) :
                        parsedTime.setMinutes(now.getMinutes() - time) 
                    break   
                                        
                case TimeUnit.Second:
                    polarity ? 
                        parsedTime.setSeconds(now.getSeconds() + time) :
                        parsedTime.setSeconds(now.getSeconds() - time) 
                    break   
                                            
                default:
                    throw new Error(`unrecognised time unit in query: ${unit}`)
            }
        }
                                            
        if (rounding) {
            const roundingUnit = roundingMetric[0][1]
            switch (roundingUnit) {
                case TimeUnit.Year:
                    parsedTime =
                        parsedTime.getMonth() > 5 ?
                            new Date(Date.UTC(parsedTime.getFullYear() + 1, 0, 1)) :
                            new Date(Date.UTC(parsedTime.getFullYear(), 0, 1))
                    break
                    
                case TimeUnit.Month:
                    parsedTime = 
                        parsedTime.getDate() > (new Date(parsedTime.getFullYear(), parsedTime.getMonth(), 0).getDate() / 2) ? 
                            new Date(Date.UTC(parsedTime.getFullYear(), parsedTime.getMonth() + 1, 1, 0, 0, 0)) :
                            new Date(Date.UTC(parsedTime.getFullYear(), parsedTime.getMonth(), 1, 0, 0, 0))
                    break
                        
                case TimeUnit.Week:
                    const dayOfWeek = parsedTime.getDay()
                    parsedTime = dayOfWeek > 2 ? 
                        new Date(Date.UTC(parsedTime.getFullYear(), parsedTime.getMonth(), (parsedTime.getDate() + (7 - dayOfWeek)))) :
                        new Date(Date.UTC(parsedTime.getFullYear(), parsedTime.getMonth(), (parsedTime.getDate() - dayOfWeek)))
                    break
                    
                case TimeUnit.Day:
                    parsedTime =
                        parsedTime.getHours() > 11 ? 
                            new Date(Date.UTC(parsedTime.getFullYear(), parsedTime.getMonth(), parsedTime.getDate() + 1)) :
                            new Date(Date.UTC(parsedTime.getFullYear(), parsedTime.getMonth(), parsedTime.getDate()))
                    break

                case TimeUnit.Hour:
                    parsedTime = 
                        parsedTime.getMinutes() > 29 ? 
                            new Date(Date.UTC(parsedTime.getFullYear(), parsedTime.getMonth(), parsedTime.getDate(), parsedTime.getHours())) :
                            new Date(Date.UTC(parsedTime.getFullYear(), parsedTime.getMonth(), parsedTime.getDate(), parsedTime.getHours() - 1))
                    break
            
                case TimeUnit.Minute:
                    parsedTime = 
                        parsedTime.getSeconds() > 29 ? 
                            new Date(parsedTime.getFullYear(), parsedTime.getMonth(), parsedTime.getDate(), parsedTime.getHours(), parsedTime.getMinutes() + 1) :
                            new Date(parsedTime.getFullYear(), parsedTime.getMonth(), parsedTime.getDate(), parsedTime.getHours(), parsedTime.getMinutes())
                    break

                case TimeUnit.Second:
                    parsedTime = 
                        parsedTime.getMilliseconds() > 499 ? 
                            new Date(parsedTime.getFullYear(), parsedTime.getMonth(), parsedTime.getDate(), parsedTime.getHours(), parsedTime.getMinutes(), parsedTime.getSeconds() + 1) :
                            new Date(parsedTime.getFullYear(), parsedTime.getMonth(), parsedTime.getDate(), parsedTime.getHours(), parsedTime.getMinutes(), parsedTime.getSeconds())
                    break

                default:
                    throw new Error(`unrecognised rounding unit in query: ${roundingUnit}`)
            }
        }

        return parsedTime;
    } catch (error) {
        throw error
    }
}

export { parse };