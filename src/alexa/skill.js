'use strict';

require('dotenv-safe').load();

const Alexa = require('alexa-sdk');
const speechOutput = require('./speech-output');
const config = require('./config');

const intentHandlers = [
  require('./intent-handlers/default-intent-handlers')
];

exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.appId = config.APP_ID;
  alexa.registerHandlers(...intentHandlers);
  alexa.resources = speechOutput;
  alexa.dynamoDBTableName = process.env.EVENT_GURU_SESSION_TABLE;
  alexa.execute();
};