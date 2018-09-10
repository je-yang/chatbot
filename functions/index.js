// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

// a. the action name from the ask_name Dialogflow intent
const NAME_ACTION = 'ask_name';
// b. the parameters that are parsed from the ask_name intent
const GIVENNAME_ARGUMENT = 'givenname';
const LASTNAME_ARGUMENT = 'lastname';
//

// a. the action name from the ask_birthdate Diaglogflow intent
const BIRTHDATE_ACTION = 'ask_birthdate';
// b. the parameters that are parsed from the ask_birthdate intent
const BIRTHDATE_ARGUMENT = 'birthdate';

//Start the action
//ask name
exports.askName = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({request: request, response: response});  
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    agent.add(`Hi! Chatbot here. Let's get started.`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

// c. The function that gets the name
  function getName (agent) {
    let lastname = agent.getArgument(LASTNAME_ARGUMENT);
    let givenname = agent.getArgument(GIVENNAME_ARGUMENT);
    agent.add('Great! Thanks ' +
      givenname + ' ' + lastname +
      '! Let\'s keep going! What is your date of birth?');
  }

// c. The function that gets the name
  function getBirthdate (agent) {
    let birthdate = agent.getArgument(BIRTHDATE_ARGUMENT);
    agent.add('Okay, your date of birth is saved as ' +
      birthdate);
  }

  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set('Default Welcome Intent', welcome);
  actionMap.set('Default Fallback Intent', fallback);
  actionMap.set('NAME_ACTION', getName);
  actionMap.set('BIRTHDATE_ACTION', getBirthdate);


  agent.handleRequest(actionMap);
});
