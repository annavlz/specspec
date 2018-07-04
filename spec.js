#!/usr/bin/env node

const program = require('commander');
const lint = require('./lint.js')

program
    .command('lint <file>')
    .option('-r, --rules [ruleFile]', 'provide rule file')
    .action(lint.command)

program.parse(process.argv);