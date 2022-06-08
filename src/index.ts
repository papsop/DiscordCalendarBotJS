import { Bot } from './Core/Bot';
import { Config } from './Core/Config';

const config : Config = require('./config.json');

let bot = new Bot(config);

bot.run();