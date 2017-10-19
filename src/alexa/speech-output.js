'use strict';

const englishUsOutput = {
  NO_SESSION: {
    WELCOME: 'Welcome to 36 Questions!',
    WHAT_CITY: 'In which city you want to visit a concert?',
    STOP_MESSAGE: 'See you soon on 36 questions!',
  },
  COMMON: {
    WELCOME_FIRST_TIME: 'Hi, ready to fall in love? I have 36 questions you can discuss if you want to fall in love - Or make your love even stronger. Is that ok for you?',
    WELCOME_BACK: 'Welcome back! ',
    UNHANDLED: 'Sorry, I could not understand you. What did you say? ',
    GOODBYE: 'Good bye. See you later.',
    HELP: 'Ask fall in love for a question?',
    HELP_REPROMPT: 'Do you want to hear a new question?',
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