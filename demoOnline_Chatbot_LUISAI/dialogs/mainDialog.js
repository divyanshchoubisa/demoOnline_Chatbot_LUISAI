// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { InputHints } = require('botbuilder');
const { LuisRecognizer } = require('botbuilder-ai');
const { ConfirmPrompt, ComponentDialog, DialogSet, DialogTurnStatus, TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');
const { Searchtshirts } = require('./searchtshirts');
const { TshirttypesDialog } = require('./tshirttypesDialog');
const { StorecontainsDialog } = require('./storecontainsDialog');
const { OrderDialog } = require('./orderDialog');
const { GoodbyeDialog } = require('./goodbyeDialog');

const MAIN_WATERFALL_DIALOG = 'mainWaterfallDialog';

class MainDialog extends ComponentDialog {
    constructor(luisRecognizer, greetingsDialog) {
        super('MainDialog');

        if (!luisRecognizer) throw new Error('[MainDialog]: Missing parameter \'luisRecognizer\' is required');
        this.luisRecognizer = luisRecognizer;

        if (!greetingsDialog) throw new Error('[MainDialog]: Missing parameter \'greetingsDialog\' is required');

        // Define the main dialog and its related components.
        this.addDialog(new TextPrompt('TextPrompt'))
            .addDialog(new ConfirmPrompt('confirmPrompt'))
            .addDialog(greetingsDialog)
            .addDialog(new StorecontainsDialog('storecontainsDialog'))
            .addDialog(new TshirttypesDialog('tshirttypesDialog'))
            .addDialog(new Searchtshirts('searchtshirts'))
            .addDialog(new OrderDialog('orderDialog'))
            .addDialog(new GoodbyeDialog('goodbyeDialog'))
            .addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
                this.introStep.bind(this),
                this.actStep.bind(this),
                this.finalStep.bind(this)
            ]));

        this.initialDialogId = MAIN_WATERFALL_DIALOG;
    }

    /**
     * The run method handles the incoming activity (in the form of a TurnContext) and passes it through the dialog system.
     * If no dialog is active, it will start the default dialog.
     * @param {*} turnContext
     * @param {*} accessor
     */
    async run(turnContext, accessor) {
        const dialogSet = new DialogSet(accessor);
        dialogSet.add(this);

        const dialogContext = await dialogSet.createContext(turnContext);
        const results = await dialogContext.continueDialog();
        if (results.status === DialogTurnStatus.empty) {
            await dialogContext.beginDialog(this.id);
        }
    }

    /**
     * First step in the waterfall dialog. Prompts the user for a command.
     */

    async introStep(stepContext) {
        if (!this.luisRecognizer.isConfigured) {
            const messageText = 'NOTE: LUIS is not configured. To enable all capabilities, add `LuisAppId`, `LuisAPIKey` and `LuisAPIHostName` to the .env file.';
            await stepContext.context.sendActivity(messageText, null, InputHints.IgnoringInput);
            return await stepContext.next();
        }
        return await stepContext.prompt('TextPrompt');
    }

    /**
     * Second step in the waterfall.  This will use LUIS to attempt to extract the data and perform further actions.
     */
    async actStep(stepContext) {
        const greetings = {};
        const orderdata = {};
        const storedata = {};
        const tshirtdata = {};
        const searchdata = {};
        const goodbyedata = {};

        if (!this.luisRecognizer.isConfigured) {
            // LUIS is not configured, we just run the GreetingsDialog path.
            return await stepContext.beginDialog('greetingsDialog', greetings);
        }

        // Call LUIS and gather any potential data and perform required actions.
        const luisResult = await this.luisRecognizer.executeLuisQuery(stepContext.context);
        switch (LuisRecognizer.topIntent(luisResult)) {
        case 'Greetings': {
            console.log('LUIS extracted these greetings details:', JSON.stringify(luisResult));
            greetings.text = luisResult.text;
            greetings.intents = luisResult.intents;
            // Run the greetingsDialog
            return await stepContext.beginDialog('greetingsDialog', greetings);
        }

        case 'ordertshirts': {
            console.log('LUIS extracted these greetings details:', JSON.stringify(luisResult));
            orderdata.text = luisResult.text;
            orderdata.intents = luisResult.intents;
            // Run the orderDialog
            return await stepContext.beginDialog('orderDialog', orderdata);
        }

        case 'SearchTshirts': {
            console.log('LUIS extracted these greetings details:', JSON.stringify(luisResult));
            searchdata.text = luisResult.text;
            searchdata.intents = luisResult.intents;
            // Run the searchtshirts dialog
            return await stepContext.beginDialog('searchtshirts', searchdata);
        }

        case 'storeContains': {
            console.log('LUIS extracted these store details:', JSON.stringify(luisResult));
            storedata.text = luisResult.text;
            storedata.intents = luisResult.intents;
            // Run the storecontainsDialog
            return await stepContext.beginDialog('storecontainsDialog', storedata);
        }

        case 'tshirtstypes': {
            console.log('LUIS extracted these greetings details:', JSON.stringify(luisResult));
            tshirtdata.text = luisResult.text;
            tshirtdata.intents = luisResult.intents;
            // Run the tshirttypesDialog
            return await stepContext.beginDialog('tshirttypesDialog', tshirtdata);
        }

        case 'goodbye': {
            console.log('LUIS extracted these greetings details:', JSON.stringify(luisResult));
            goodbyedata.text = luisResult.text;
            goodbyedata.intents = luisResult.intents;
            // Run the goodbyeDialog.
            return await stepContext.beginDialog('goodbyeDialog', goodbyedata);
        }

        default: {
            // Catch all for unhandled intents
            const didntUnderstandMessageText = `Sorry, I didn't get that. Please try asking in a different way (intent was ${ LuisRecognizer.topIntent(luisResult) })`;
            await stepContext.context.sendActivity(didntUnderstandMessageText, didntUnderstandMessageText, InputHints.IgnoringInput);
        }
        }

        return await stepContext.next();
    }

    /**
     * This is the final step in the main waterfall dialog.
     * It wraps up the sample "book a flight" interaction with a simple confirmation.
     */
    async finalStep(stepContext) {
        // Restart the main dialog with a different message the second time around.
        return await stepContext.replaceDialog(this.initialDialogId, { restartMsg: '' });
    }
}

module.exports.MainDialog = MainDialog;
