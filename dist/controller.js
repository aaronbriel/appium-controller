"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let childProcess = require('child_process'), fs = require('fs'), path = require('path'), http = require('http'), os = require('os'), shell = require('shelljs'), retries = 0;
exports.startAppium = (options) => {
    options = options || {};
    let host = options.host !== undefined ? options.host : 'localhost', port = options.port !== undefined ? options.port : '4723', shutdown = options.shutdown !== undefined ? options.shutdown : true, logDir = options.logDir !== undefined ? options.logDir : 'logs', defaultCapabilities = options.defaultCapabilities, appiumOptions = ['-a', host, '-p', port], platform = os.platform(), command = 'appium.cmd';
    if (shutdown)
        exports.stopAppium({ port: port });
    if (platform.indexOf('darwin') > -1 ||
        platform.indexOf('linux') > -1) {
        command = 'appium';
    }
    if (defaultCapabilities)
        appiumOptions.push('--default-capabilities', defaultCapabilities);
    console.log('Starting appium...');
    if (!fs.existsSync(logDir))
        fs.mkdirSync(logDir);
    let out = fs.openSync(path.join(logDir, 'appium'), 'w');
    let er = fs.openSync(path.join(logDir, 'appium-error'), 'w');
    let child = childProcess.spawn(command, appiumOptions, {
        detached: true,
        stdio: ['ignore', out, er]
    }).on('error', (err) => { throw err; });
    exports.statusCheck(host, port, child, 0);
};
exports.statusCheck = (host, port, child, statusCode, wdPath = '/wd/hub/status', maxRetries = 80) => {
    retries += 1;
    http.get({
        host: host,
        port: port,
        path: wdPath
    }, (res) => {
        statusCode = res.statusCode;
    }).on('error', (err) => {
        if (retries === maxRetries) {
            console.log('Connection was refused after ' + maxRetries + ' attempts.');
            console.log(err);
            throw err;
        }
        return err;
    });
    if (statusCode === 200) {
        console.log('appium is running on ' + host + ':' + port + '!');
        child.unref();
        retries = 0;
        statusCode = 0;
    }
    else {
        setTimeout(function () {
            exports.statusCheck(host, port, child, statusCode);
        }, 1000);
    }
};
exports.stopAppium = (options) => {
    options = options || {};
    let platform = os.platform(), msg = 'appium is shutdown', port = options.port !== undefined ? options.port : '4723';
    if (platform.indexOf('darwin') > -1 ||
        platform.indexOf('linux') > -1) {
        shell.exec('pkill -f appium');
        console.log(msg);
    }
    else {
        shell.exec('for /f "tokens=5" %p in (\'netstat -a -o -n ^| ' +
            'findstr "LISTENING" ^| ' +
            'findstr ":' + port + '"\') do ( taskkill -F -PID %p )');
        console.log(msg);
    }
};
//# sourceMappingURL=controller.js.map