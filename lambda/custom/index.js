//https://ask-sdk-for-nodejs.readthedocs.io/en/latest/Developing-Your-First-Skill.html

const Alexa = require('ask-sdk-core');
let skill;

const LaunchRequestHandler = {
	canHandler(handlerInput){
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	handle(handlerInput){
		const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.withSimpleCard('Hello World', speechText)
			.getResponse();

	}
}

const GetNewLoveMessageIntent = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
		&& handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
	},
	handle(handlerInput){

		const randomLoveMessage = "Bonne journée mon amour je t'aime";

		return handlerInput.responseBuilder
			.speak(randomLoveMessage)
			.withSimpleCard('Hello World', randomLoveMessage)
			.getResponse();

	}
}

exports.handler = async function (event, context) {

	console.log(`REQUEST++++${JSON.stringify(event)}`);

 	if (!skill) {

		skill = Alexa.SkillBuilders.custom()
			.addRequestHandlers(
				LaunchRequestHandler,
				GetNewLoveMessageIntent,
			)
			.create();
	}

	const response = await skill.invoke(event, context);

	console.log(`RESPONSE++++${JSON.stringify(response)}`);

	return response;

};

exports.handler = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		LaunchRequestHandler,
		GetNewLoveMessageIntent,
	.lambda();