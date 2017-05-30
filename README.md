# appium-controller
Starts and stops appium in the background programmatically. Runs on mac or windows.

## Usage
### From Node/JS

```
  let appiumController = require('appium-controller')

  //start appium with options
  appiumController.startAppium({
    port:'4724'
  });

  //or with default host:localhost, port:4723
  appiumController.startAppium();

  //shutdown with options
  appiumController.stopAppium({
    port:'4724'
  });

  //or with default port:4723
  appiumController.stopAppium();

```

### From CLI
```
  appium-controller --start
  appium-controller --start -h localhost -p 4724
  appium-controller --stop
  appium-controller --stop -p 4724

```


Run 'appium-controller --help' for full list of options.
