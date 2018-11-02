const jetronome = require('./jetronome-client');

jetronome.init({
    name: 'Dummy App',
    description: 'This is a test application.',
    server: 'http://localhost',
});

console.log(jetronome.start());