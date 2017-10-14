'use strict';

const APP_ID = process.env.ALEXA_APP_ID;

const STATES = {};

const SESSION_ATTRIBUTES = {
  CURRENT_QUESTION_INDEX: 'currentQuestionIndex',
  NUMBER_OF_VISITS: 'numberOfVisits',
  LAST_VISIT: 'lastVisit',
};

module.exports = {
  APP_ID,
  STATES,
  SESSION_ATTRIBUTES
};