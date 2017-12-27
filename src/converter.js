const request = require('request');
const chalk = require('chalk');
const ora = require('ora')

const spinner = ora({
  text: 'Retrieving data...',
  color: 'yellow',
});

function convert(currency = 'USD', exchange = 'BTC') {
  const url = `https://min-api.cryptocompare.com/data/price?fsym=${exchange}&tsyms=${currency}`;
  spinner.start();
  request(url, (error, response, body) => {
    let apiResponse;
    spinner.stop();
    try{
      apiResponse = JSON.parse(body);
      console.log(`${chalk.yellow(exchange)} to ${chalk.cyan(currency)} = ${chalk.yellow(apiResponse[currency])}`);
    }catch(parseError){
      console.log(chalk.red('Something went wrong in the API. Try in a few minutes.'));
    }
  });
  
}

module.exports = convert;
