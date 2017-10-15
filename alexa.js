var Alexa = require('alexa-sdk');

const APP_ID= 'amzn1.ask.skill.6fefa6be-05ed-4ea4-92cd-a963d9ed3e1c';

var data = [
{
  question: 'question1',
  answer: 'answer1'
},
{
  question: 'question2',
  answer: 'answer2'
},
{
  question: 'question3',
  answer: 'answer3'
}];


const states = {
    STARTMODE: '_STARTMODE',
    CARDMODE: '_CARDMODE'
}

const handlers = {

    'NewSession': function() {
        if(Object.keys(this.attributes).length === 0) { // Check if it's the first time the skill has been invoked
            //initialize attributes
        }

        this.handler.state = states.STARTMODE;
        message = 'Welcome to Quiz Me.';
        this.emit(':ask', message, message);
    }
};

//NOTE: this keyword refers to immediately enclosing object if used in an object, otherwise global object

const startModeHandlers = Alexa.CreateStateHandler(states.STARTMODE, {

    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },

    'AMAZON.HelpIntent': function() {
        message = 'My available functions are searching for a quiz, and searching by quiz ID.';
        this.emit(':tell', message);
    },

    'RetrieveQuizIntent': function () {
        let quizSlot = this.event.request.intent.slots.QuizID;
        let quizId;
        if (quizSlot && quizSlot.value) {
            quizId = quizSlot.value;


            //http call to quizlet
            //callback should be emit, but should transfer to state cardmode

            this.handler.state = states.CARDMODE;
            dataLength = Object.keys(data).length;
            dataIndex = 0;
            this.attributes['dataIndex'] = dataIndex;
            this.attributes['dataLength'] = dataLength;

            message = 'Fetched quiz ' + quizId + '. Say next question to begin.';
            this.emit(':ask', message, message);

        } else {
            message = 'I could not understand the quiz ID.';
            this.emit(':tell', message);
        }
    }
});

const cardModeHandlers = Alexa.CreateStateHandler(states.CARDMODE, {
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers; 
        //what's difference between this and emitWithState?
    },

    'AMAZON.HelpIntent': function() {
        message = 'Say next to move on to the next question.';
        this.emit(':tell', message);
    },

    'NextIntent': function() {
        dataIndex = this.attributes['dataIndex'];
        dataLength = this.attributes['dataLength'];

        if (dataIndex === dataLength) {
            this.handler.state = states.STARTMODE;
            this.emit(':tell', 'This concludes the end of this quiz.');
        } else {
            message = data[dataIndex].question;
            this.emit(':ask', message, message);
        }
    },

    'AnswerIntent': function() {
        dataIndex = this.attributes['dataIndex'];
        dataLength = this.attributes['dataLength'];

        if (dataIndex === dataLength) {
            this.handler.state = states.STARTMODE;
            this.emit(':tell', 'This concludes the end of this quiz.');
        } else {
            message = data[dataIndex].answer;
            dataIndex = dataIndex + 1;
            this.attributes['dataIndex'] = dataIndex;
            this.emit(':ask', message, message);
        }
    }
});

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.dynamoDBTableName = 'AlexaHackGT2017';
    alexa.registerHandlers(handlers, startModeHandlers, cardModeHandlers);
    alexa.execute();
};


