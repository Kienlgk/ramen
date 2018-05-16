import * as config from '../libs/config';

var fn = function (socket) {
    console.log('new websocket connnection');

    socket.on('login', function (data) {
        console.log('login event:', data);
        socket.id = data.id;
        //TODO: handle login event
    });

    socket.on('disconnect', function () {
        // TODO: handle logout event
    });
};

export = fn;