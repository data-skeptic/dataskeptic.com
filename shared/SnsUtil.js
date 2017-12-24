const aws = require('aws-sdk')

var env = 'prod'

var sns = new aws.SNS()

const c = require('../config/config.json')
var aws_accessKeyId = c[env]['aws']['accessKeyId']
var aws_secretAccessKey = c[env]['aws']['secretAccessKey']
var aws_region = c[env]['aws']['region']

aws.config.update(
    {
        "accessKeyId": aws_accessKeyId,
        "secretAccessKey": aws_secretAccessKey,
        "region": aws_region
    }
);


export default function snserror(location, msg, topic) {
	if (topic == undefined) {
		topic = "ds-error"
	}
	var sns = new aws.SNS();
	var endpointArn = "arn:aws:sns:us-east-1:085318171245:" + topic;
	console.log(endpointArn)
	var payload = {
    	default: 'Site error: ' + JSON.stringify({location, msg}),
    	APNS: {
     		aps: {
        		location, msg
      		}
    	}
  	};
	payload.APNS = JSON.stringify(payload.APNS);
	payload = JSON.stringify(payload);
	sns.publish({
		Message: payload,
		MessageStructure: 'json',
		TargetArn: endpointArn
	}, function(err, data) {
		if (err) {
			console.log(err.stack);
			return;
		}
		console.log('push sent');
		console.log(data);
	});}
