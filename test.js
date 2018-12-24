const jetronome = require('./jetronome-client');

jetronome.init({
    name: 'Dummy App',
    description: 'This is a test application.',
    server: 'http://localhost',
    advancedOptions: {
        diskPath: '/home',
    }
});

console.log(jetronome.start());