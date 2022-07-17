**Azure AI Cognitive Services** <br/>
<br/>
This is a chatbot application for an online shop where customers can buy different t-shirts. It is supported by Microsoft Cognitive Services, LUIS AI for Natural Language Understanding and the application is written in Nodejs. <br/>
<br/>
The LUIS AI cognitive model name is ` onlineStore `. The model is trained and published on production slot. The model has 6 main intents to keep the customer engaged in a conversation. Read the ‘onlineStore.json’ file stored in the folder ‘ cognitiveModels ‘ to get the understanding of the model.<br/>
<br/>
AGAIN, the model is expandable and can further be trained as per the business requirements.
The model has 6 intents mainly. These intents are shown in the below image. <br/>
<br/>
![image](https://user-images.githubusercontent.com/32264134/179413467-e01da029-ac30-4770-a139-5d6b5af051f6.png)
<br/>
And has different ENTITES. Everything is easily expandable as per the client and business requirements.<br/><br/>
**Coming to the application**
The application is designed in a way such that whatever input the user enters, the cognitive feature is going to identify its intent and respond accordingly.<br/><br/>
*Conversation flow*
Consider a scenario, where a user comes to chatbot and say starts conversation with a greeting and then asks for the available material in the store for sale. Then starts looking for t-shirts to buy with their brands and other choices. And at the end finally asks for payment details and end the conversation with a goodbye message.<br/><br/>
