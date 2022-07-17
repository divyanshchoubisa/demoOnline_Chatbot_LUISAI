// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// const { TimexProperty } = require('@microsoft/recognizers-text-data-types-timex-expression');
const { InputHints, MessageFactory } = require('botbuilder');
const { ComponentDialog, ConfirmPrompt, TextPrompt, WaterfallDialog } = require('botbuilder-dialogs');

const CONFIRM_PROMPT = 'confirmPrompt';
const TEXT_PROMPT = 'textPrompt';
const WATERFALL_DIALOG = 'waterfallDialog';

class StorecontainsDialog extends ComponentDialog {
    constructor(id) {
        super(id || 'StorecontainsDialog');

        this.addDialog(new TextPrompt(TEXT_PROMPT))
            .addDialog(new ConfirmPrompt(CONFIRM_PROMPT))
            .addDialog(new WaterfallDialog(WATERFALL_DIALOG, [
                this.shopresponse.bind(this)
            ]));

        this.initialDialogId = WATERFALL_DIALOG;
    }

    /**
     * Store Items Conversation
     */
    async shopresponse(stepContext) {
        console.log('The step contex is: ', stepContext);
        const textDetails = stepContext.options;
        console.log('->>>>>>>>>>>>>>', textDetails);
        if (textDetails.text) {
            const messageText = 'Sure, here we can provide you with many different t-shirts with different colours, brands and prices.';
            const msg = MessageFactory.text(messageText, messageText, InputHints.ExpectingInput);
            await stepContext.prompt(TEXT_PROMPT, { prompt: msg });
            return await stepContext.endDialog();
        }
        return await stepContext.next(textDetails);
    }
}

module.exports.StorecontainsDialog = StorecontainsDialog;
