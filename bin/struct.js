#!/usr/bin/env node    //必须放到文件开头

'use strict'
const program = require('commander');

program
  .version(require('../package').version)     //  显示版本号
  .usage('<command> [options]');
  
program
    .command('list')
  .description('显示所有模板')
  .action(require('../lib/list'));

program
    .command('add')
    .description('添加模板')
    .action(require('../lib/add'));


program
    .command('delete')
//    .alias('d')
    .description('删除模板')
    .action(require('../lib/delete'));
