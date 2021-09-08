'use strict';

import Rx from 'rx';

import { generateImageURL, download }  from './lib.js';

export default function (count, { config:configPath, dist }) {
  Rx.Observable.range(1, count).map((c) => {
    const { imageURL, filename } = generateImageURL(configPath, c);
    return Rx.Observable.defer(() => download(imageURL, filename, dist));
  }).concatAll().subscribe(x => console.log(x), e => console.error(e), () => console.log('done'));
};
