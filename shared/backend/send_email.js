import aws from 'aws-sdk'
import axios from 'axios'


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
	    console.log(obj)
	    console.log(send_headers)
	    var toa = [to]
	    aws.config.update({region: 'us-east-1'});
	    var ses = new aws.SES({apiVersion: '2010-12-01'});
	    var from = 'orders@dataskeptic.com'
	    var subject = obj['subject']
	    var resp = {status: 200, msg: "ok"}
	    var header = ''
	    var footer = ''
	    if (send_headers == "1") {
		    header = '<div><img src="https://s3.amazonaws.com/dataskeptic.com/img/png/email-header.png" /></div><br/>'
		    footer = '<br/><br/><div><img src="https://s3.amazonaws.com/dataskeptic.com/img/png/email-footer.png" /></div>'	    
	    }
	    var body = header + msg + footer
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