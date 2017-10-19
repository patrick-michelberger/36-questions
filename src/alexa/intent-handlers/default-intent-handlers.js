'use strict';

const speechOutput = require('../speech-output');
const cardBuilder = require('../utils/card-builder');
const {STATES, SESSION_ATTRIBUTES} = require('../config');

const QUESTIONS = require('../../data/questions.json').Questions;

console.log("SESSION: ", SESSION_ATTRIBUTES);

module.exports = {
  'LaunchRequest' () {
    const numberOfVisits = this.attributes[SESSION_ATTRIBUTES.NUMBER_OF_VISITS]
        || 1;
    this.attributes[SESSION_ATTRIBUTES.LAST_VISIT] = new Date();

    if (numberOfVisits == 1) {
      const card = cardBuilder.buildWelcomeCard();
      this.emit(':askWithCard',
          speechOutput.COMMON.WELCOME_FIRST_TIME,
          card.title,
          card.content,
          "Are you ready?");
    } else {
      this.emit(':ask',
          "Seems like you're getting to know each other better. Ready for another question?");
    }
  },

  'GetQuestionIntent' () {
    console.log("GetQuestionIntent");
    const currentQuestionIndex = this.attributes[SESSION_ATTRIBUTES.CURRENT_QUESTION_INDEX]
        || 0;

    if (QUESTIONS.length > currentQuestionIndex) {
      this.attributes[SESSION_ATTRIBUTES.CURRENT_QUESTION_INDEX] = currentQuestionIndex
          + 1;
      this.emit(':tell', QUESTIONS[currentQuestionIndex]);
    } else {
      this.attributes[SESSION_ATTRIBUTES.CURRENT_QUESTION_INDEX] = 0;
      this.emit(':tell', 'Congratulations. You have answered all questions');
    }
  },

  'SkipQuestionIntent'() {
    console.log("SkipQuestionIntent");
    const currentQuestionIndex = this.attributes[SESSION_ATTRIBUTES.CURRENT_QUESTION_INDEX]
        || 0;
    this.attributes[SESSION_ATTRIBUTES.CURRENT_QUESTION_INDEX] = currentQuestionIndex
        + 1;
    this.emit(':tell', 'Sure. We can come back to this question later.');
  },

  'ResetQuestionsIntent'() {
    console.log("ResetQuestionsIntent");
    this.attributes[SESSION_ATTRIBUTES.NUMBER_OF_VISITS] = 1;
    this.attributes[SESSION_ATTRIBUTES.CURRENT_QUESTION_INDEX] = 0;
    this.emit(':tell', 'Sure. See you later.');
  },

  'YesIntent'() {
    const numberOfVisits = this.attributes[SESSION_ATTRIBUTES.NUMBER_OF_VISITS]
        || 1;

    console.log("YesIntent: numberOfVisits: ", numberOfVisits);

    if (numberOfVisits == 1) {
      this.attributes[SESSION_ATTRIBUTES.NUMBER_OF_VISITS] = numberOfVisits + 1;
      this.emit(':ask',
          "Okay. I'll give you a question and both of you should take turns answering. Ready?",
          "Ready?");
    } else {
      this.emit('GetQuestionIntent');
    }
  },

  'NoIntent'() {
    console.log("NoIntent");
    this.emit(':tell', 'Sure. See you later.');
  },

  // ----------------------- cancel handling
  'AMAZON.CancelIntent'() {
    this.emit('ExitIntent');
  },

  'AMAZON.StopIntent'() {
    this.emit('ExitIntent');
  },

  'ExitIntent'() {
    this.emit(':tell', speechOutput.COMMON.GOODBYE);
  },

  // ----------------------- help handling
  'AMAZON.HelpIntent'(){
    this.emit(':ask', speechOutput.COMMON.HELP,
        speechOutput.COMMON.HELP_REPROMPT);
  },

  /**
   * This intent will be called when the user says something that cannot be matched to an intent or the intent
   * is not implemented in the current state.
   *
   * Every state handles it's own "I didn't understand" version so this intent just redirects.
   */
  'Unhandled'() {
    console.error('Unhandled error in default intent');
    this.emit(':tell', speechOutput.COMMON.UNHANDLED);
  }
};