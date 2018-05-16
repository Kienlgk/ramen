var events = require('events');
const eventEmitter = new events.EventEmitter();

eventEmitter.on('Order:afterCreate', function (evt, data) {
    console.log('Order:afterCreate', evt, data);
});

eventEmitter.on('Order:afterUpdate', function (evt, data) {
    console.log('Order:afterUpdate', evt, data);
});

export = eventEmitter;
