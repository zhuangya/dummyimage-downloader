#!/usr/bin/env node

'use strict';

import meow from 'meow';
import dmd from './index.js';

const cli = meow(`
    Usage
      $ dmd <count>

    Options
      --config, -c config file(in yaml)
      --dist, -d download destination

    Examples
      $ dmd 4 -c colorful.yml
`, {
  importMeta: import.meta,
  flags: {
    config: {
      type: 'string', alias: 'c', isRequired: true,
    },
    dest: {
      type: 'string', alias: 'd', isRequired: true,
    }
  }
});

if (!Boolean(cli.input.length)) {
  cli.showHelp()
}

dmd(cli.input[0], cli.flags);
