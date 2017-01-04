'use strict';

const fs = require('fs');
const path = require('path');
const { sample, reduce, isArray } = require('lodash');
const yaml = require('js-yaml');
const got = require('got');

function getConfig(path) {

  const defaultConfig = {
    width: 800,
    height: 600,
    background: '000',
    foreground: 'fff',
    format: 'png',
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
    soFar[key] = isArray(value) ? sample(value) : value
    return soFar;
  }, {});
}

function generateImageURL(configPath, text) {
  const { width, height, background, foreground, format } = normalizeConfig(getConfig(configPath));
  return {
    imageURL: `https://dummyimage.com/${width}x${height}/${background}/${foreground}.${format}?text=${text}`,
    filename: `${background}-${foreground}-${text}.${format}`
  };
}

function download(url, name, dist=process.cwd()) {
  console.log('downloading ', url);
  return new Promise((resolve, reject) => {
    got.stream(url).pipe(fs.createWriteStream(path.join(dist, name))).on('close', () => {
      return resolve(name);
    }).on('error', error => {
      return reject(error);
    });
  });
}

module.exports = {
  download,
  generateImageURL,
  normalizeConfig,
  getConfig
}
