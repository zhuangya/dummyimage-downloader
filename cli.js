#!/usr/bin/env node

'use strict';

const meow = require('meow');
const dmd = require('.');;

const cli = meow(`
    Usage
      $ dmd <count>

    Options
      --config, -c config file(in yaml)

    Examples
      $ dmd 4 -c colorful.yml
`, {
  alias: {
    c: 'config'
  }
});

dmd(cli.input[0], cli.flags);
