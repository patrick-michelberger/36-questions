'use strict';

const speechOutput = require('../speech-output');
const cardBuilder = require('../utils/card-builder');
const { STATES, SESSION_ATTRIBUTES } = require('../config');

const QUESTIONS = require('../../data/questions.json').Questions;

module.exports = {
  'LaunchRequest' () {
    const numberOfVisits = this.attributes[SESSION_ATTRIBUTES.NUMBER_OF_VISITS] || 1;
    this.attributes[SESSION_ATTRIBUTES.NUMBER_OF_VISITS] = numberOfVisits + 1;
    this.attributes[SESSION_ATTRIBUTES.LAST_VISIT] = new Date();

    if (numberOfVisits === 1) {
      const card = cardBuilder.buildWelcomeCard();
      this.emit(':tellWithCard',
          speechOutput.COMMON.WELCOME_FIRST_TIME,
          card.title,
          card.content);
    } else {
      this.emit(':tell',
          speechOutput.COMMON.WELCOME_BACK);
    }
  },

  'GetQuestionIntent' () {
    const currentQuestionIndex = this.attributes[SESSION_ATTRIBUTES.CURRENT_QUESTION_INDEX] || 0;

    if (QUESTIONS.length > currentQuestionIndex) {
      this.emit(':tell', QUESTIONS[currentQuestionIndex]);
    } else {
      this.emit(':tell', 'Congratulations. You have answered all questions');
    }
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