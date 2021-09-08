'use strict';

import got from 'got';
import yaml from 'js-yaml';
import lodash from 'lodash';
import { join } from 'path';
import fs from 'fs';

const { sample, reduce, isArray } = lodash;

export function getConfig(path) {
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
      yaml.load(fs.readFileSync(path, 'utf8'))
    );
  } catch(e) {
    throw e;
  }
}

export function normalizeConfig(config) {
  return reduce(config, (soFar, value, key) => {
    soFar[key] = isArray(value) ? sample(value) : value
    return soFar;
  }, {});
}

export function generateImageURL(configPath, text) {
  const { width, height, background, foreground, format } = normalizeConfig(getConfig(configPath));
  return {
    imageURL: `https://dummyimage.com/${width}x${height}/${background}/${foreground}.${format}?text=${text}`,
    filename: `${background}-${foreground}-${text}.${format}`
  };
}

export function download(url, name, dist=process.cwd()) {
  return new Promise((resolve, reject) => {
    got.stream(url).pipe(fs.createWriteStream(join(dist, name))).on('close', () => {
      return resolve(name);
    }).on('error', error => {
      return reject(error);
    });
  });
}
