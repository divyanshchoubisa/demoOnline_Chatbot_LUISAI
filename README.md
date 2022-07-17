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
**Coming to the application** <br/><br/>
The application is designed in a way such that whatever input the user enters, the cognitive feature is going to identify its intent and respond accordingly.<br/><br/>
*Conversation flow* <br/><br/>
Consider a scenario, where a user comes to chatbot and say starts conversation with a greeting and then asks for the available material in the store for sale. Then starts looking for t-shirts to buy with their brands and other choices. And at the end finally asks for payment details and end the conversation with a goodbye message.<br/><br/>
An example for this is shown below: <br/><br/>
![image](https://user-images.githubusercontent.com/32264134/179416123-fe207c14-8aa8-42ba-a1fb-959a9a7f371c.png)
<br/><br/>
![image](https://user-images.githubusercontent.com/32264134/179416132-f294ac08-35c5-4e0b-a91d-8fba0b1358a3.png)
<br/><br/>
**Important Point to Note:** <br/><br/>
The application is highly expandable and scalable along with LUIS AI model. More features, functionalities, dialogs and responses, conversation flow and design, model training etc.… can be added and done anytime as per the business requirements and needs and can be easily done. This application is going to help you understand all the important core concepts of Azure AI Cognitive Services, LUIS AI and Chatbot Development with Nodejs. <br/><br/>
**How to run the application?** <br/><br/>
Install Nodejs and Microsoft Bot Framework. <br/><br/>
Go to the Folder: demoOnline_Chatbot_LUISAI. <br/><br/>
Open cmd. <br/><br/>
Write ‘ npm install ‘ to install all the necessary dependencies. [If not installed] <br/><br/>
Write ‘ npm start ’. <br/><br/>
Once the bot is successfully started go to the Microsoft Bot Framework. <br/><br/>
Open the URL ‘ http://localhost:3978/api/messages ’. <br/><br/>
Start using chatbot.  <br/><br/>
_______________________________________________________________________________________________________________________________________________________________________

