# jetronome-client
[![npm version](https://badge.fury.io/js/jetronome-client.svg)](https://badge.fury.io/js/jetronome-client)

Jetronome Client is the simplest application status checker.
- License: MIT License
- Documentation: [https://jetalog.net/79](https://jetalog.net/79)

## Features
- Creating periodic signal

## Install
```
$ npm i --save jetronome-client
```

## Usage
#### Starting at initialize
```
require('./jetronome-client').init({
    name: 'Dummy App', // Application Name (required)
    description: 'This is a test application.', // Description (required)
    server: 'http://localhost', // Jetronome Server (required)
    port: 7828, // Jetronome Server Port (optional) (default: 7828)
    interval: 3000, // Signal Interval (optional) (default: 3000)
    testApi: 'http://localhost/api/test', // App Test API (optional)
    autoStart: true,
});
```

#### Starting after initialize
```
const jetronome = require('./jetronome-client');
jetronome.init({
    name: 'Dummy App', // Application Name (required)
    description: 'This is a test application.', // Description (required)
    server: 'http://localhost', // Jetronome Server (required)
    port: 7828, // Jetronome Server Port (optional) (default: 7828)
    interval: 3000, // Signal Interval (optional) (default: 3000)
    testApi: 'http://localhost/api/test', // App Test API (optional)
});

setTimeout(() => {
    jetronome.start();
}, 5000);
```

## Server App
This app works in pairs with Jetronome Server.
- GitHub: https://github.com/jetronome/jetronome-server
- npm: https://npmjs.com/jetronome-server
- Documentation: https://jetalog.net/78