#!/usr/bin/env node
'use strict';

var program = require('commander');

var pkg = require('../package.json');

var converter = require('./converter');

program.version(pkg.version).description('Convert Bitcoin to any currency defined').option('-C, --currency <currency>', 'Currency to be converted. (Default: USD)').option('-E, --exchange <exchange>', 'Exchange to be converted. (Default: BTC)').parse(process.argv);

converter(program.currency, program.exchange);