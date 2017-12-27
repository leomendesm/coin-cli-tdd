const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

const chalk = require('chalk');

chai.use(sinonChai);

const convert = require('../src/converter')

describe('Converter', () => {
  let consoleStub;
  
  const responseMockBRL = {
    "BRL": 55020
  };
  const responseMockUSD = {
    "USD": 2499
  };
  beforeEach(() =>{
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach( () => {
    console.log.restore();
  });		    
  
  		  
  it('should use exchange BTC and currency USD as amount default', done => {
    nock('https://min-api.cryptocompare.com')
      .get('/data/price')
      .query({ fsym: 'BTC', tsyms: 'USD'})
      .reply(200, responseMockUSD);
    convert();
    setTimeout(() =>{
      expect(consoleStub).to.have.been.calledWith(`${chalk.yellow('BTC')} to ${chalk.cyan('USD')} = ${chalk.yellow(2499)}`);
      done();
    }, 300)
  });
  
  it('should use exchange BTC and currency BRL when defined', done => {
   nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ fsym: 'BTC', tsyms: 'BRL'})
      .reply(200, responseMockBRL);
    convert('BTC', 'BRL');
    setTimeout(() =>{
      expect(consoleStub).to.have.been.calledWith(`${chalk.yellow('BTC')} to ${chalk.cyan('BRL')} = ${chalk.yellow(55020)}`);
      done();
   }, 500);
  });
  
  it('should message user when api reply with error', done => {
    
   nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 10})
      .replyWithError('Error');
      
    convert('BTC', 'BRL');
    
    setTimeout(() =>{
      expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong in the API. Try in a few minutes.'));
      done();
    }, 300);    
    
  })
});