#!/usr/bin/env node

const program = require('commander');
const lint = require('./lint.js')

// function collect(val, item) {
//     console.log(val, item)
//     item.push(val);
//     return item;
//   } 


program
    .command('lint <file>')
    .option('-r, --rules [ruleFile]', 'provide rule file') //, collect, [])
    .action(lint.command)

program.parse(process.argv);