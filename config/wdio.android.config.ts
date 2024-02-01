// @ts-ignore
import { join } from 'path';
import config from './wdio.share.config';

config.capabilities = [
  {
    platformName: 'Android',
    maxInstances: 1,
    'appium:appWaitActivity': 'io.appium.android.apis.ApiDemos',
    'appium:automationName': 'UiAutomator2',
    'appium:noReset': false,
    'appium:app': join(process.cwd(), './app/ApiDemos-debug.apk'),
    'appium:printPageSourceOnFindFailure': true,
    'appium:newCommandTimeout': 240,
    // @ts-ignore
    'appium:autoGrantPermissions': true,
  },
];

exports.config = config;
