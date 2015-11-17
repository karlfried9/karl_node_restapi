var settings = require('../config/settings'),
Push = require("parse-push");


var push = new Push({
  applicationId: settings.parse.applicationId,
  restApiKey:    settings.parse.restApiKey
});

console.log(push);


exports.send = function(channel,message,res) {
 
//Now send to some channels
push.sendToChannels(channel, message, function(error, data){
  if (error) {
    console.error("Oh no it went wrong!: " + error.message);
  } else {
    console.log("It went well! ", data);
  }
});

};