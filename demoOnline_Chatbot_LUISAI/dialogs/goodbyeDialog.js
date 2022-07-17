// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// const { TimexProperty } = require('@microsoft/recognizers-text-data-types-timex-expression');
const { InputHints, MessageFactory } = require('botbuilder');
const { ComponentDialog, ConfirmPrompt, TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');

const CONFIRM_PROMPT = 'confirmPrompt';
const TEXT_PROMPT = 'textPrompt';
const WATERFALL_DIALOG = 'waterfallDialog';

class GoodbyeDialog extends ComponentDialog {
    constructor(id) {
        super(id || 'GoodbyeDialog');

        this.addDialog(new TextPrompt(TEXT_PROMPT))
            .addDialog(new ConfirmPrompt(CONFIRM_PROMPT))
            .addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
                this.goodbyemessage.bind(this)
            ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    /**
     * Goodbye Conversation
     */
    async goodbyemessage(stepContext) {
        console.log('The step contex is: ', stepContext);
        const textDetails = stepContext.options;
        console.log('->>>>>>>>>>>>>>', textDetails);
        if (textDetails.text) {
            const messageText = 'Goodbye, it was nice having you as a customer.';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            await stepContext.prompt(TEXT_PROMPT, { prompt: msg });
            return await stepContext.endDialog();
        }
        return await stepContext.next(textDetails);
    }
}

module.exports.GoodbyeDialog = GoodbyeDialog;
