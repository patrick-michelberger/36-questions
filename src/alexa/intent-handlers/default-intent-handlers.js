'use strict';

const speechOutput = require('../speech-output');
const cardBuilder = require('../utils/card-builder');
const { STATES, SESSION_ATTRIBUTES } = require('../config');

module.exports = {
  'LaunchRequest' () {
    const card = cardBuilder.buildWelcomeCard();
    this.emit(':tellWithCard',
        speechOutput.COMMON.WELCOME,
        card.title,
        card.content);
  },

  'GetQuestionIntent' () {
    this.emit(':tell', "It works.");
  },

  /**
   * This intent will be called when the user says "Stop" or "Cancel"
   */
  'AMAZON.CancelIntent'() {
    this.emit('ExitIntent');
  },
  'AMAZON.StopIntent'() {
    this.emit('ExitIntent');
  },

  /**
   * This intent will be called when the user says something that cannot be matched to an intent or the intent
   * is not implemented in the current state.
   *
   * Every state handles it's own "I didn't understand" version so this intent just redirects.
   */
  'Unhandled'() {
    console.error('Unhandled error in default intent');
    this.emit(':ask', speechOutput.COMMON.UNHANDLED, speechOutput.COMMON.UNHANDLED);
  }
};