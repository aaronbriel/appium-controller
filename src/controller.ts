let childProcess = require('child_process'),
    fs = require('fs'),
    path = require('path'),
    http = require('http'),
    os = require('os'),
    shell = require('shelljs'),
    retries = 0;

export const startUp = (options?: any) => {

    let host = options.host !== undefined ? options.host : '0.0.0.0',
        port = options.port !== undefined ? options.port : '4723',
        stopAppium = options.stopAppium !== undefined ? options.stopAppium : true,
        logDir = options.logDir !== undefined ? options.logDir : 'logs';

    console.log('Starting appium...');

    if (stopAppium)
        shutDown({port:port});

    if (!fs.existsSync(logDir))
        fs.mkdirSync(logDir);

    let out = fs.openSync(path.join(logDir, 'appium'), 'w');
    let er = fs.openSync(path.join(logDir, 'appium-error'), 'w');

    let child = childProcess.spawn(
        'appium',
        {
            detached: true,
            stdio: ['ignore', out, er]
        }
    ).on('error', (err:any) => { throw err });

    statusCheck(host, port, child, 0)
};

export const statusCheck = (host: string, port: string, child: any, statusCode: number,
    wdPath = '/wd/hub/status', maxRetries = 20) => {

    retries += 1;

    http.get({
        host: host,
        port: port,
        path: wdPath
    }, (res:any) => {
        statusCode = res.statusCode;
    }).on('error', (err:any) => {
        if (retries === maxRetries) {
            console.log('Connection was refused after ' + maxRetries + ' attempts.');
            console.log(err);
            throw err;
        }
        return err;
    });

    if (statusCode === 200) {
        console.log('appium is running!');
        child.unref();
        retries = 0;
        statusCode = 0;
    } else {
        setTimeout(function () {
            console.log('appium status:' + statusCode);
            statusCheck(host, port, child, statusCode);
        }, 1000)
    }
};

export const shutDown = (options?:any) => {

    let platform = os.platform(),
        msg = 'appium is shutdown',
        port = options.port !== undefined ? options.port : '4723';

    if (platform.indexOf('darwin') > - 1 || platform.indexOf('linux') > -1) {
        shell.exec('pkill -f appium');
        console.log(msg)
    } else {
        shell.exec('for /f "tokens=5" %p in (\'netstat -a -o -n ^| ' +
            'findstr "LISTENING" ^| ' +
            'findstr ":' + port + '"\') do ( taskkill -F -PID %p )');
        console.log(msg)
    }
};
