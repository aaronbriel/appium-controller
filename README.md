# appium-controller
Starts and stops appium in the background programmatically. Runs on mac or windows.

## Usage
### From Node/JS

```
  let appiumController = require('appium-controller')

  //start appium with options
  appiumController.startAppium({
    port:'4724'
    defaultCapabilities:'{"deviceName": "iPhone Simulator"}'
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
  appium-controller --start -p 4724 --dc '{"deviceName": "iPhone Simulator"}'
  appium-controller --stop
  appium-controller --stop -p 4724

```


Run 'appium-controller --help' for full list of options.
