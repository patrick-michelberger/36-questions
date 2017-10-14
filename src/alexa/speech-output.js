'use strict';

const englishUsOutput = {
  NO_SESSION: {
    WELCOME: 'Welcome to 36 Questions!',
    WHAT_CITY: 'In which city you want to visit a concert?',
    STOP_MESSAGE: 'See you soon on 36 questions!',
  },
  COMMON: {
    WELCOME: 'Welcome to 36 Questions! The New York Times lists 36 questions you can ask someone if you want to fall in love. Or make your love even stronger. This skill provides the ideal experience for exploring these questions, so grab some wine, sit down with someone you want to love and lets get started.',
    WELCOME_BACK: 'Welcome back! ',
    HELP: '',
    UNHANDLED: 'Sorry, I could not understand you. What did you say? '
  },
  DEV_LOCALE: 'en'
};

const englishUkOutput = {
  DEV_LOCALE: 'en-gb'
};

const germanOutput = {
  DEV_LOCALE: 'de'
};

const speechOutput = {
  'en-US': {
    'translation': englishUsOutput
  },
  'en-GB': {
    // we use the us translation as default and only overwrite specific ones
    'translation': Object.assign({}, englishUsOutput, englishUkOutput)
  },
  'de-DE': {
    'translation': germanOutput
  }
};

module.exports = englishUsOutput;