import { Bot } from './Core/Bot';
import { Config } from './Core/Config';
import { Trace } from './Debug/Trace';

const config : Config = require('./config.json');

let bot = new Bot(config);

Trace.LogInfo("main()", "Starting application");
bot.run();