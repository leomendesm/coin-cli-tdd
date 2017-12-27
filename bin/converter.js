'use strict';

var request = require('request');
var chalk = require('chalk');
var ora = require('ora');

var spinner = ora({
  text: 'Retrieving data...',
  color: 'yellow'
});

function convert() {
  var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
  var exchange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'BTC';

  var url = 'https://min-api.cryptocompare.com/data/price?fsym=' + exchange + '&tsyms=' + currency;
  spinner.start();
  request(url, function (error, response, body) {
    var apiResponse = void 0;
    spinner.stop();
    try {
      apiResponse = JSON.parse(body);
      console.log(chalk.yellow(exchange) + ' to ' + chalk.cyan(currency) + ' = ' + chalk.yellow(apiResponse[currency]));
    } catch (parseError) {
      console.log(chalk.red('Something went wrong in the API. Try in a few minutes.'));
    }
  });
}

module.exports = convert;