'use strict';

const APP_ID = process.env.ALEXA_APP_ID;

const STATES = {};

const SESSION_ATTRIBUTES = {
  CURRENT_QUESTION_INDEX: 'currentQuestionIndex',
};

module.exports = {
  APP_ID,
  STATES,
  SESSION_ATTRIBUTES
};