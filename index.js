'use strict';

const Rx = require('rx');

const {
  getConfig,
  normalizeConfig,
  generateImageURL,
  download
} = require('./lib');

module.exports = (count, { config:configPath, dist }) => {
  Rx.Observable.range(1, count).map((c) => {
    const { imageURL, filename } = generateImageURL(configPath, c);
    return Rx.Observable.defer(() => download(imageURL, filename, dist));
  }).concatAll().subscribe(x => console.log(x), e => console.error(e), () => console.log('done'));
};
