const aws = require('aws-sdk');
const ses = new aws.SES();
const myEmail = process.env.EMAIL;
const myDomain = process.env.DOMAIN;

function generateResponse (code, payload) {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': myDomain,
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(payload)
  }
}

function generateError (err) {
  const code = err.statusCode || 500;
  console.log(err);
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': myDomain,
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true
    },
    body: err.message
  }
}

function generateEmailParams (body) {
  const { email, name, content } = JSON.parse(body);
  console.log(email, name, content);
  if (!(email && name && content)) {
    const error = new Error('Missing parameters! Make sure to add parameters \'Name\', \'Email\', \'Content\'.');
    error.statusCode = 400;
    throw error;
  }

  return {
    Source: myEmail,
    Destination: { ToAddresses: [myEmail] },
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Message sent from email ${email} by ${name} \nContent: ${content}`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `You received a message from ${myDomain}!`
      }
    }
  }
}

module.exports.send = async (event) => {
  try {
    const emailParams = generateEmailParams(event.body);
    const data = await ses.sendEmail(emailParams).promise();
    return generateResponse(200, data)
  } catch (err) {
    return generateError(err)
  }
};
