import * as path from 'path';
import allureReporter from '@wdio/allure-reporter';
import { Options } from '@wdio/types';

const fs = require('fs');
const videosFolderPath = __dirname.replace('config', 'testVideos');
let videoOptions = {};
const config: Options.Testrunner = {
  runner: 'local',
  specs: ['../specs/**/*.spec.ts'],
  logLevel: 'error',
  waitforTimeout: 45000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  // @ts-ignore
  services: [],
  framework: 'jasmine',
  reporters: [
    ['spec', {}],
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: true,
      },
    ],
  ],
  jasmineOpts: {
    defaultTimeoutInterval: 300000,
    stopSpecOnExpectationFailure: true,
  },
  port: 4723,
  bail: 0,
  baseUrl: 'http://localhost',
  path: '/wd/hub',
  capabilities: {},

  onPrepare: () => {
    fs.mkdirSync(videosFolderPath, { recursive: true });
  },
  before: async () => {
    videoOptions = driver.isAndroid
      ? { timeLimit: '400' }
      : { timeLimit: '400', videoType: 'mpeg4' };
    console.log('start recording');
    await driver.startRecordingScreen(videoOptions);
  },

  afterTest: async (test, context, result) => {
    if (result.error) {
      await driver.takeScreenshot();
    }
  },
  after: async (result, capabilities, specs) => {
    allureReporter.addFeature(specs[0]);
    if (result !== 0) {
      const file = `${specs[0].split('/').pop()!.split('.').shift()!}.mp4`;
      await driver.saveRecordingScreen(path.join(videosFolderPath, file));
    }
    // await driver.stopRecordingScreen();
  },
};

export default config;
