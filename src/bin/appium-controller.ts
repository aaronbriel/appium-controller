#! /usr/bin/env node
import * as yargs from 'yargs';
import { startAppium, stopAppium } from './../controller';

const args = yargs
    .usage('Usage: $0 -h [host] -p [port] -s [shutdown] -wd [wdPath] -l [logpath] -dc [defaultCapabilities] -start -stop')
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
        describe: 'host (defaults to localhost)',
        type: 'string'
    })
    .default('host', 'localhost')
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
    .option('defaultCapabilities', {
        alias: 'dc',
        describe: 'the appium --default-capabilities CLI flag (see appium github repo for more info)',
        type: 'string'
    })
    .help('help', 'displays help')
    .argv;

if (args.start !== undefined)
    startAppium({host:args.h, port:args.p, shutdown:args.s, logDir:args.l, defaultCapabilities:args.dc});

if (args.stop !== undefined)
    stopAppium({port:args.p});

