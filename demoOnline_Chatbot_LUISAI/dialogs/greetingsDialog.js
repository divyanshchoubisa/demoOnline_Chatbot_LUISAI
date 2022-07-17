// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// const { TimexProperty } = require('@microsoft/recognizers-text-data-types-timex-expression');
const { InputHints, MessageFactory } = require('botbuilder');
const { ComponentDialog, ConfirmPrompt, TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');

const CONFIRM_PROMPT = 'confirmPrompt';
const TEXT_PROMPT = 'textPrompt';
const WATERFALL_DIALOG = 'waterfallDialog';

class GreetingsDialog extends ComponentDialog {
    constructor(id) {
        super(id || 'GreetingsDialog');

        this.addDialog(new TextPrompt(TEXT_PROMPT))
            .addDialog(new ConfirmPrompt(CONFIRM_PROMPT))
            .addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
                this.greetingsStep.bind(this)
            ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    /**
     * Greetings Conversation
     */
    async greetingsStep(stepContext) {
        console.log('The step contex is: ', stepContext);
        const textDetails = stepContext.options;
        console.log('->>>>>>>>>>>>>>', textDetails);
        if (textDetails.text) {
            const messageText = 'Hi, its great having you here. What do you want to buy?';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            await stepContext.prompt(TEXT_PROMPT, { prompt: msg });
            return await stepContext.endDialog();
        }
    }
}

module.exports.GreetingsDialog = GreetingsDialog;
