#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const controller_1 = require("./../controller");
const args = yargs
    .usage('Usage: $0 -h [host] -p [port] -s [shutdown] -wd [wdPath] -l [logpath] -start -stop')
    .option('start', {
    describe: 'starts appium',
    type: 'string'
})
    .option('stop', {
    describe: 'stops appium',
    type: 'string'
})
    .option('host', {
    alias: 'h',
    describe: 'host (defaults to 0.0.0.0)',
    type: 'string'
})
    .default('host', '0.0.0.0')
    .option('port', {
    alias: 'p',
    describe: 'port (defaults to 4723)',
    type: 'string'
})
    .default('port', '4723')
    .option('shutdown', {
    alias: 's',
    describe: 'whether to shutdown appium if running (defaults to true)',
    type: 'boolean'
})
    .default('shutdown', true)
    .option('wdpath', {
    alias: 'wd',
    describe: 'wd hub status path (defaults to /wd/hub/status)',
    type: 'boolean'
})
    .default('wdpath', '/wd/hub/status')
    .option('logDir', {
    alias: 'l',
    describe: 'appium log path (defaults to ./logs)',
    type: 'string'
})
    .default('logDir', 'logs')
    .help('help', 'displays help')
    .argv;
if (args.start !== undefined)
    controller_1.startAppium({ host: args.h, port: args.p, shutdown: args.s, logDir: args.l });
if (args.stop !== undefined)
    controller_1.stopAppium({ port: args.p });
//# sourceMappingURL=appium-controller.js.map