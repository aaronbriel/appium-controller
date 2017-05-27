# appium-controller
Starts and stops appium in the background programmatically. Runs on mac or windows.

## Usage
### From Node/JS

```
  let appiumController = require('appium-controller')

  //start appium with options
  appiumController.startUp({
    host:'127.0.0.1',
    port:'4724'
  });

  //or with default host:0.0.0.0, port:4723
  appiumController.startUp();

  //shutdown with options
  appiumController.shutDown({
    port:'4724'
  });

  //or with default port:4723
  appiumController.shutDown();

```

### From CLI
```
  appium-controller --start
  appium-controller --start -h 127.0.0.1 -p 4724
  appium-controller --stop
  appium-controller --stop -p 4724

```


Run 'appium-controller --help' for full list of options.
