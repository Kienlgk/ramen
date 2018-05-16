require('app-module-path').addPath(__dirname);
import App from "./App";
import * as config from "./libs/config";
import {sequelize} from "./models";
var Socket = require('socket.io');
var socketRoute = require('./routes/serverSocket');
declare var global:any

var app = new App({
  routePath: './routes/index',
  debug: 'coupon',
  port: config.server.port,
  publicDirs: [{
      route: '/assets',
      path: '../client/dist/assets'
  }, {
      route: '/',
      path: 'public'
  }]
});

// Socket.IO "Routes"
var io = Socket(app.server);
io.of('/').on('connection', socketRoute);

sequelize.sync().then(() => {
  global.__dbReady = true;
});
