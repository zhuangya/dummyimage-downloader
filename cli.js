#!/usr/bin/env node

'use strict';

const meow = require('meow');
const dmd = require('.');;

const cli = meow(`
    Usage
      $ dmd <count>

    Options
      --config, -c config file(in yaml)
      --dist, -d download destination

    Examples
      $ dmd 4 -c colorful.yml
`, {
  alias: {
    c: 'config',
    d: 'dist'
  }
});

if (!Boolean(cli.input.length)) {
  cli.showHelp()
}

dmd(cli.input[0], cli.flags);
