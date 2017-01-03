'use strict';

const fs = require('fs');

const { sample, includes, assign, reduce, isArray } = require('lodash');
const yaml = require('js-yaml');

function getConfig(path) {

  const defaultConfig = {
    width: 800,
    height: 600,
    background: '000',
    foreground: 'fff',
    format: 'png',
    text: '',
    directory: process.cwd()
  };

  try {

    return Object.assign(
      {},
      defaultConfig,
      yaml.safeLoad(fs.readFileSync(path, 'utf8'))
    );

  } catch(e) {
    throw e;
  }
}

function normalizeConfig(config) {
  return reduce(config, (soFar, value, key) => {

    if (includes(['width', 'height', 'background', 'foreground', 'format'], key)) {
      soFar[key] = isArray(value) ? value : [value]
    } else {
      soFar[key] = value;
    }

    return soFar;
  }, {});
}

module.exports = (count, { config:configPath }) => {
  const config = normalizeConfig(getConfig(configPath));

  console.log(sample(config.width));

  // TODO: generate multi url with the line below
  console.log(`https://dummyimage.com/${sample(config.width)}x${sample(config.height)}/${sample(config.background)}/${sample(config.foreground)}.${sample(config.format)}`);

  // TODO:
  // x. read config as yaml
  // x. set current job config(from yaml)
  // 3. generate multiple urls, maybe yield?
  // 4. download with counter.
  // 5. should write some temp file for current status recording?

};
