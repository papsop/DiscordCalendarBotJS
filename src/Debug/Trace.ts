import { Config } from "../Core/Config"

const config : Config = require("../config.json");

function getTraceDateTimeString() : string
{
    // add leading zero if date below 10
    function fx(date : number) : string | number { return (date < 10) ? "0"+date : date; }
    const today = new Date();
    const date = fx(today.getDate())+"."+fx(today.getMonth())+"."+fx(today.getFullYear());
    const time = fx(today.getHours()) + ":" + fx(today.getMinutes()) + ":" + fx(today.getSeconds());
    return date+' '+time;
}

export enum Level    
{
    IMPORTANT = 0,
    ERROR = 1,
    WARN = 2,
    SUCCESS = 3,
    INFO = 4,
}

function Log(level : Level, source : string, content : string) : void
{
    if(level > config.Trace.level) return;   

    // let colorFunc : any = chalk.bgBlack;
    // switch(level)
    // {
    //     case Level.INFO:
    //         colorFunc = chalk.blue;
    //         break;
    //     case Level.SUCCESS:
    //         colorFunc = chalk.green;
    //         break;
    //     case Level.WARN:
    //         colorFunc = chalk.yellow;
    //         break;
    //     case Level.ERROR:
    //         colorFunc = chalk.red;
    //         break;
    //     case Level.IMPORTANT:
    //         colorFunc = chalk.white;
    //         break;
    // }
    const spaces_num = config.Trace.max_source_length - source.length;
    const spaces = " ".repeat( (spaces_num < 0) ? 0 : spaces_num );

    console.log(`${getTraceDateTimeString()} | ${level} | ${source}${spaces} | ${content}`);
}

export namespace Trace{
    export function LogImportant(source: string, content: string) : void { Log(Level.IMPORTANT, source, content); }
    export function LogError(source: string, content: string) : void { Log(Level.ERROR, source, content); }
    export function LogWarn(source: string, content: string) : void { Log(Level.WARN, source, content); }
    export function LogSuccess(source: string, content: string) : void { Log(Level.SUCCESS, source, content); }
    export function LogInfo(source: string, content: string) : void { Log(Level.INFO, source, content); }
}
