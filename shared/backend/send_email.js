import aws from 'aws-sdk'
import axios from 'axios'
import {getEmail} from '../../shared/Emails/template';

if (!aws.config.region) {
  aws.config.update({
    region: 'us-east-1'
  });
}

module.exports = {
	send_email: function(req, res) {
	    var obj = req.body
	    var msg = obj['msg']
	    var to = obj['to']
	    var send_headers = obj['send_headers']
	    var toa = [to]
	    var ses = new aws.SES({apiVersion: '2010-12-01'});
	    var from = 'orders@dataskeptic.com'
	    var subject = obj['subject']
	    var resp = {status: 200, msg: "ok"}
	    var header = ''
	    var footer = ''
	    var body = send_headers == "1" ? getEmail({msg: msg}) : msg
	    var email_request = {
	      Source: from, 
	      Destination: { ToAddresses: toa, BccAddresses: ["orders@dataskeptic.com"]},
	      Message: {
	        Subject: {
	          Data: subject
	        },
	        Body: {
	          Html: {
	            Data: body
	          }
	        }
	      }
	    };
	    ses.sendEmail(email_request, function(err, data) {
	      if (err != null) {
	        console.log("---[ERROR]-------------------")
	        console.log(err)
	        return res.status(500).end(JSON.stringify(err))
	      } else {
	        console.log("Email sent")
	        resp = {status: 200, msg: err}
	        return res.status(200).end(JSON.stringify(resp))
	      }
	    });
	}
}