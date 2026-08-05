/*
 * Copyright 2018-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

// sets up dependencies
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const languageStrings = require('./languageStrings');
const sprintf = require('i18next-sprintf-postprocessor');
/* personalization Utility */
const personalizationUtil = require('./personalizationUtil')
const personalizationStorageUtil = require('./personalizationStorageUtil')
const aplDoc = require('./documents/facts.json');
const DEFAULT_TOPIC = "Skyrim"
const SKYRIM = "Skyrim"
const OBLIVION = "Oblivion"
const MORROWIND = "Morrowind"
const SKYRIM_FACT_LOOKUP = "SKYRIM_FACTS"
const OBLIVION_FACT_LOOKUP = "OBLIVION_FACTS"
const MORROWIND_FACT_LOOKUP = "MORROWIND_FACTS"

// Initialization of skill 
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      var welcome = requestAttributes.t('START_MESSAGE');
      
  return handlerInput.responseBuilder
      .speak(welcome)
      .reprompt(requestAttributes.t('START_REPROMPT'))
      .getResponse();
  },
};

/**
 * Core functionality for fact skill
 * 
 * Gives fact based on Intent value
 * Else if Intent value not passed and personlized factTopic is set use that
 * Else default to skyrim facts.
*/

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    // checks request type
    return request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent';
  },
  async handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    //gets fact topic name
    var topicName = await getTopicName(handlerInput, requestAttributes);
    // gets a random fact by assigning an array to the variable
    // the random item from the array will be selected by the i18next library
    // the i18next library is set up in the Request Interceptor
    const randomFact = requestAttributes.t(getTopicLookupText(topicName, requestAttributes));
    const name = personalizationUtil.getPersonalizedPrompt(handlerInput);
    // concatenates a standard message with the random fact
    var speakOutput = ""
    if (name && name.length > 0) {
      speakOutput = requestAttributes.t('GET_FACT_MESSAGE_PERSONALIZED', name, topicName) + randomFact
    } else {
      speakOutput = requestAttributes.t('GET_FACT_MESSAGE', topicName) + randomFact
    }
    
     if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
        const datasource = {
            "factData": {
                "backgroundImage": "https://images.unsplash.com/photo-1732130318657-c8740c0f5215?q=80&w=1470&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "title": requestAttributes.t('SKILL_NAME', requestAttributes.t(topicName)),
                "primaryText": randomFact
            }
        }; 
        
        handlerInput.responseBuilder.addDirective(
        {
            type: "Alexa.Presentation.APL.RenderDocument",
            token: "facts",
            document: aplDoc,
            datasources: datasource
        });
     }

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(requestAttributes.t('HELP_REPROMPT'))
      .withSimpleCard(requestAttributes.t('SKILL_NAME', requestAttributes.t(topicName)), randomFact)
      .getResponse();
  },
};

/**
 * 
 * Get fact topic from intent else return default topic
 * 
 * @param handlerInput 
 * @returns 
 */
const getTopicName = async function (handlerInput, requestAttributes) {
  const currentIntent = handlerInput.requestEnvelope.request.intent;
  if (currentIntent && currentIntent.slots.factType && currentIntent.slots.factType.value) {
    console.log("inside current Intent " + currentIntent.slots.factType.value)
    return currentIntent.slots.factType.value;
  }
  return await personalizationStorageUtil.getPreferenceOrDefault(handlerInput, requestAttributes.t(DEFAULT_TOPIC));
}

/**
 * Use topic name map corresponding fact topic else default to SKYRIM_FACTS.
 * 
 * New topicName needs to be added here with ther corresponding FactTopic in languageStrings.
 * 
 * @param topicName passed as slot value.
 * @returns 
 */
const getTopicLookupText = (topicName, requestAttributes) => {
  if (topicName) {
    switch (topicName.toString().toLowerCase()) {
      case requestAttributes.t(OBLIVION).toLowerCase():
        return OBLIVION_FACT_LOOKUP
      case requestAttributes.t(MORROWIND).toLowerCase():
        return MORROWIND_FACT_LOOKUP
      default:
        return SKYRIM_FACT_LOOKUP;
    }
  }
  return SKYRIM_FACT_LOOKUP;
}

/**
 * Functionality for add personlized(favourite) fact topic 
 * Persists fact type intent details using personlized preference storage.
 * 
 */
const SetPersonalizedFactPreferencesHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    // checks request type
    return request.type === 'IntentRequest'
      && request.intent.name === 'AddNewFact';
  },
  async handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    var message = requestAttributes.t('ERROR_MESSAGE');
    if (currentIntent.slots.factType && currentIntent.slots.factType.value) {
      const factType = currentIntent.slots.factType.value;
      //persist new fact as personlized perference
      const persistenceConfirmation = await personalizationStorageUtil.savePreference(handlerInput, factType)
      //give back error message if personalization not enabled.
      message = persistenceConfirmation === undefined ? requestAttributes.t('PREFERENCE_ERROR') : (requestAttributes.t('CONFIRMATION_MESSAGE', personalizationUtil.getPersonalizedPrompt(handlerInput), factType))
    }
    return handlerInput.responseBuilder
      .speak(message)
      .reprompt(requestAttributes.t('HELP_REPROMPT'))
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('HELP_MESSAGE'))
      .reprompt(requestAttributes.t('HELP_REPROMPT'))
      .getResponse();
  },
};

const FallbackHandler = {
  // The FallbackIntent can only be sent in those locales which support it,
  // so this handler will always be skipped in locales where it is not supported.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('FALLBACK_MESSAGE'))
      .reprompt(requestAttributes.t('FALLBACK_REPROMPT'))
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('STOP_MESSAGE'))
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('ERROR_MESSAGE'))
      .reprompt(requestAttributes.t('ERROR_MESSAGE'))
      .getResponse();
  },
};

const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en', // fallback to EN if locale doesn't exist
      resources: languageStrings
    });

    localizationClient.localize = function () {
      const args = arguments;
      let values = [];

      for (var i = 1; i < args.length; i++) {
        values.push(args[i]);
      }
      const value = i18n.t(args[0], {
        returnObjects: true,
        postProcess: 'sprintf',
        sprintf: values
      });

      if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)];
      } else {
        return value;
      }
    }

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) { // pass on arguments to the localizationClient
      return localizationClient.localize(...args);
    };
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
    SetPersonalizedFactPreferencesHandler
  )
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  //define personalized persistence adapter for preference storage. 
  .withPersistenceAdapter(personalizationStorageUtil.personlizedPersitenceAdapter())
  .withCustomUserAgent('sample/basic-fact/v2')
  .lambda();