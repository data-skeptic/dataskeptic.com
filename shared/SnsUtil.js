const aws = require('aws-sdk')

var env = (process.env.NODE_ENV === 'dev') ? 'dev' : 'prod'

var sns = new aws.SNS()

/*
Member signup		ds-new-mbr
Member login		ds-mem-log
Item sold			ds-salesuc
RFC login			ds-rfc-log
New episode posted	ds-new-epi
New blog posted		ds-newblog
*/

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

function snserror(location, msg, topic) {
	// For now errors and alert are the same,
	// but eventually it will be two separate Topics
	// Maybe other changes too.
	snsalert(location, msg, topic)
}

function snsalert(details, msg, topic) {
	if (topic == undefined) {
		topic = "ds-error"
	}
	var sns = new aws.SNS();
	var endpointArn = "arn:aws:sns:us-east-1:085318171245:" + topic;
	console.log(endpointArn)
	var payload = {
    	default: 'Site error: ' + JSON.stringify({details, msg}),
    	APNS: {
     		aps: {
        		details, msg
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
	});
}

export {snsalert, snserror}