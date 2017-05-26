# appium-controller
Starts and stops appium in the background

## Usage
### From Node/JS
```
  var autoEmulate = require('auto-emulate);

       autoEmulate.emulateAndroid({
         name: 'avd_device_name'
       });

  autoEmulate.waitForAndroidEmulator();

  let appiumController = require('appium-controller')

  appiumController.startUp({
    host:'0.0.0.0',
    port:'4723'
  });

  //or
  appiumController.startUp({});


  appiumController.shutDown({
    port:'4723'
  });

  //or
  appiumController.shutDown({});

```

### From CLI
```
  appium-controller --start

  Run appium-controller --help for full list of options.
