/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#/documentation/concepts/Logging
 */

/***************************************************************************
*                                                                          *
* Instaniate a Winson logger                                               *
* See documentation Winston:  https://github.com/flatiron/winston          *
*                                                                          *
***************************************************************************/
var winston = require('winston');
require('winston-mongodb').MongoDB;

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/debug.log',
            handleExceptions: false,
            json: true,
            maxsize: ( 5000 * 1024 ),  // 5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

// add transport or db log
// TODO: Figure out why winston is replacing Exception messages with stack trace.
logger.add(winston.transports.MongoDB, {
    level: 'warn',
    db: 'kanon',
    collection: 'logs',
    safe: false,
    host: 'localhost',
    port: 27017,
    //username: '',
    //password: '',
    errorTimeout: 10000,
    name: 'dblog',
    handleExceptions: true
});

module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/

  level: 'info',
  custom: logger

};