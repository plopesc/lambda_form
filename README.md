# Lambda Form

Lambda from is an example module to show how a Drupal Form can be connected to a
lambda function in order to handle the form in a serverless way.

This is a proof of concept to be extended in real world static projects built
using [Tome](https://www.drupal.org/project/tome) module.

## Contents
  * Drupal module providing a basic contact form
  * [Serverless](https://serverless.com) Lambda function. It sends an email with
   the data entered in the from above. 

## Setup

### Lambda function
This repository contains a `serverless` folder where it is included the
serverless template and the nodejs code of a basic lambda function.

In order to deploy this lambda function, you need to have an AWS account and
serverless installed in your machine.To setup serverless you need to:
  * Install the serverless framwork `npm i -g serverless`
  * Setup your AWS CLI credentials in `~/.aws/credentials` file

Then it is necessary to configure the app. You need to rename
`secrets.example.json` to `secrets.json` and replace the variables.

Finally run `serverless deploy`. If everything goes well, you will get the URL
of the lambda endpoint. Something like
`https://{id}.execute-api.{region}.amazonaws.com/{stage}/email/send`. This URl
Will be used in the Drupal module to connect both parts.

**NOTE**: This is a very brief summary. It is encouraged to read this
[post](https://dev.to/adnanrahic/building-a-serverless-contact-form-with-aws-lambda-and-aws-ses-4jm0)
, from where I took most of the ideas to build this function. 

### Drupal module
  * Add this repository to your composer.json file :
  ```
  {
    "type": "vcs",
    "url": "https://github.com/plopesc/lambda_form.git"
  }
  ```
  * Run `composer require drupal/lambda_form`
  * Enable the module as usual
  * Visit http://yourdomain.com/admin/config/development/lambda_form and enter
   your lambda endpoint URL
  * Go to http://yourdomain.com/admin/lambda-form
  * Fill the form and enjoy!
 
  