/// <reference path='../../typings/index.d.ts' />

import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as http from 'http';
import * as color from 'colors';

import { ServerConfig } from '../config';
const ENV = process.env.NODE_ENV || 'development';

const Config = ServerConfig[ENV];
import app from '../';

/**
 * Set JWT secret
 * @param {String} 'secret'      global App Secret
 * @param {String} Config.secret the secret defined according the envirioment
 */
app.set('secret', Config.secret);
/**
 * Get port from environment and store in Express.
 */

const PORT = normalizePort(Config.port || '3000');
app.set('port', PORT);

/**
 * Create HTTP/DB server.
 */

const SERVER = http.createServer(app);
mongoose.connect(Config.mongodb);
mongoose.Promise = global.Promise;
const DB = mongoose.connection;

/**
 * Listen on provided port, on all network interfaces.
 */
SERVER.listen(PORT);
SERVER.on('error', onError);
SERVER.on('listening', onListening);
DB.on('error', console.log.bind(color.red));
DB.on('connected', () => console.log(color.bgBlack.green('MongoDB Connected')));
DB.on('disconnected', () => console.log(color.bgBlack.green('Closing MongoDB connection')));
DB.on('reconnected', () => console.log(color.bgBlack.green('Reconecting')));

/**
 * Close MongoDB connection on proccess.exit
 */
process.on('SIGINT', () => {
  DB.close(() => {
    console.log(color.bgBlack.bold.green('MongoDB Disconnected'));
    process.exit(0);
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof PORT === 'string'
    ? 'Pipe ' + PORT
    : 'Port ' + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(color.bgBlack.red((bind + ' requires elevated privileges')));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(color.bgBlack.red(bind + ' is already in use'));
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = SERVER.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  logger('Listening on ' + bind);
  console.log(color.bgBlack(color.cyan(`App Listening on port: ${color.bold(bind)}`)));
}
