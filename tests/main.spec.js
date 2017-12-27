const expect =  require('chai').expect;

const exec = require('child_process').exec;

const pkg = require('../package.json');

const btcConverter = './src/main.js';


describe('Main CLI', () => {
    it('should return version of cli', (done)=>{
        exec(`${btcConverter} --version`, (err, stdout, stderr) => {
            if(err) throw err;
            expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
            done();
        })        
    })
    it('should return description when coin-cli-tdd --help', (done)=>{
        exec(`${btcConverter} --help`, (err, stdout, stderr) => {
            if(err) throw err;
            expect(stdout.includes('Convert Bitcoin to any currency defined')).to.be.true;
            done();
        })        
    })
    it('should return the currency option when coin-cli-tdd --help', (done)=>{
        exec(`${btcConverter} --help`, (err, stdout, stderr) => {
            if(err) throw err;
            expect(stdout.includes('--currency')).to.be.true;
            done();
        })        
    })
    it('should return the amount option when coin-cli-tdd --help', (done)=>{
        exec(`${btcConverter} --help`, (err, stdout, stderr) => {
            if(err) throw err;
            expect(stdout.includes('--amount')).to.be.false;
            done();
        })        
    })
    it('should return the exchange option when coin-cli-tdd --help', (done)=>{
        exec(`${btcConverter} --help`, (err, stdout, stderr) => {
            if(err) throw err;
            expect(stdout.includes('--exchange')).to.be.true;
            done();
        })        
    })
});
