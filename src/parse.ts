const parse = (datestring: String): Date => {
    const now = new Date();

    const timeInstructions: Array<String> = datestring.match(/[\+|\-][0-9]*[yMwdhms]*/g) ?? [];
    const roundingMetric: Array<String> = datestring.match(/\/[yMwdhms]?/) ?? [];
    const rounding: boolean = roundingMetric.length > 0

    let parsedTime: Date = now;

    for (let instruction of timeInstructions) {
        const polarity: boolean = instruction[0] == "+" ? true : false
        const unit: string = instruction.slice(-1)
        const time: number = parseInt(instruction.substring(1, instruction.length - 1))
                
        switch (unit) {
            case "y":
                polarity ? 
                    parsedTime.setFullYear(now.getFullYear() + time) :
                    parsedTime.setFullYear(now.getFullYear() - time) 
                break  
                
            case "M":
                polarity ? 
                    parsedTime.setMonth(now.getMonth() + time) :
                    parsedTime.setMonth(now.getMonth() - time) 
                break  
                    
            case "w":
                polarity ? 
                    parsedTime.setDate(now.getDate() + (time * 7)) :
                    parsedTime.setDate(now.getDate() - (time * 7)) 
                break     
                        
            case "d":
                polarity ? 
                    parsedTime.setDate(now.getDate() + time) :
                    parsedTime.setDate(now.getDate() - time) 
                break    
                            
            case "h":
                polarity ? 
                    parsedTime.setHours(now.getHours() + time) :
                    parsedTime.setHours(now.getHours() - time) 
                break   

            case "m":                                    
                polarity ? 
                    parsedTime.setMinutes(now.getMinutes() + time) :
                    parsedTime.setMinutes(now.getMinutes() - time) 
                break   
                                    
            case "s":
                polarity ? 
                    parsedTime.setSeconds(now.getSeconds() + time) :
                    parsedTime.setSeconds(now.getSeconds() - time) 
                break   
                                        
            default:
                break
        }
    }
                                        
    if (rounding) {
        switch (roundingMetric[0][1]) {
            case "y":
                parsedTime =
                    new Date(parsedTime.getFullYear(), 0, 1, 0, 0, 0, 0)
                break
                
            case "M":
                parsedTime =
                    new Date(parsedTime.getFullYear(), parsedTime.getMonth(), 1, 0, 0, 0, 0)
                break
                    
            case "w":
                parsedTime =
                    new Date(parsedTime.getFullYear(), parsedTime.getMonth(), (parsedTime.getDay()), 0, 0, 0, 0)
                break
                
            case "d":
                parsedTime =
                    new Date(parsedTime.getFullYear(), parsedTime.getMonth(), parsedTime.getDay(), 0, 0, 0, 0)
                break

            case "h":
                parsedTime =
                    new Date(parsedTime.getFullYear(), parsedTime.getMonth(), parsedTime.getDay(), parsedTime.getHours(), 0, 0, 0)
                break
        
            case "m":
                parsedTime =
                    new Date(parsedTime.getFullYear(), parsedTime.getMonth(), parsedTime.getDay(), parsedTime.getHours(), parsedTime.getMinutes(), 0, 0)
                break

            case "s":
                parsedTime =
                    new Date(parsedTime.getFullYear(), parsedTime.getMonth(), parsedTime.getDay(), parsedTime.getHours(), parsedTime.getMinutes(), parsedTime.getSeconds(), 0)
                break

            default:
                break
    
        }
    }

    return parsedTime;
}

export { parse };