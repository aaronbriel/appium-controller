# appium-controller
Starts and stops appium in the background programmatically. Runs on mac or windows.

## Usage
### From Node/JS

```
  let appiumController = require('appium-controller')

  //start appium
  appiumController.startUp({
    host:'0.0.0.0',
    port:'4723'
  });

  //or
  appiumController.startUp();


  appiumController.shutDown({
    port:'4723'
  });

  //or
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
