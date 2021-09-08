'use strict';

import { getConfig } from '../lib.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('getConfig should read config from yml, and assign to default config correctly', () => {
  const expectedConfig = {
    width: [10, 20],
    height: '4:3',
    background: 'fff',
    foreground: ['000'],
    format: 'png'
  };
  expect(getConfig(path.join(__dirname, 'test.yml'))).toEqual(expectedConfig);
})

test('getConfig should throw error if yml invalid', () => {
  expect(() => {
    getConfig(path.join(__dirname, 'no-such-file'))
  }).toThrow();
});
