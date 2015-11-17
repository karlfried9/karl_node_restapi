# node-mobile api
Node API Exapmes 

Modules so far:    

##API 

**User**  
  Register  
  Login  
  Facebook Login  
  Token Access
  
**Profile**  
  Get Profile (created on sign-up)

**Email**  
Send email through sendgrid.com 

**Push Messaging**  
Send push through parse.com

##Prerequisites

** Mongo db **
Create Mongo Databse named "node_mobile_api"

** Node **
NodeJS - https://nodejs.org/
Gulp - “npm install gulp –g”  
Nodemon – “npm install nodemon –g”

##Install NPMs
npm install

##Run Project
gulp 

##web server 
127.0.0.1:3001

#API

##User Related API

**Signup**  

  - request:  

    POST /api/v1/register  
    {  
      "email" : "test@test.com",  
      "password" : "mypassword"  
    }  
    Note: you need to use vaild email address and password length should be more than 6 characters

  - response:

    * success
      {
        "success": "true",
        "token": "kwYWIcJcdqRRpWNQy0YpM9zgCP6hpG7I"}"
      }
    * fail
      get 400 error: Unauthorized

**API Login and receive token**

  -  request
    POST /api/v1/login 
    {
      "username" : "test@test.com",  
      "password" : "mypassword"  
    }

  - response:  

    * success
      {
        "success": "true",
        "token": "kwYWIcJcdqRRpWNQy0YpM9zgCP6hpG7I"}"
      }
    * fail
      {
        "success":"false",
        "result":"email already exists"
      }

**Facebook login and receive token**

  - request

    POST /fbtoken
    {
    "access_token" : "FB Auth Token"
    }

  - response:  
    {
    "success":"true","token":"uUr2Eln2rL7silJ5UgdXYscxpxZ3qvS9","info":"user exists - returning token"
    }

** Send Email **  

  var mail = require('./helpers/mail');

  var payload   = {
    to      : 'rob@dogtownmedia.com',
    from    : 'from@dtmeverythingapi.com',
    subject : 'backend mail',
    text    : 'This is from the backend, took about 5 minutes'
  }

  mail.send(payload, function(res) {
    console.log(res);
  });

TBD
