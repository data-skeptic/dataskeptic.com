import axios from 'axios'

module.exports = {
	send_email: function(req, res) {
	    var obj = req.body
	    var msg = obj['msg']
	    var to = obj['to']
	    var toa = [to]
	    var ses = new aws.SES({apiVersion: '2010-12-01'});
	    var from = 'orders@dataskeptic.com'
	    var subject = obj['subject']
	    var resp = {status: 200, msg: "ok"}
	    var header = '<div><img src="https://s3.amazonaws.com/dataskeptic.com/img/png/email-header.png" /></div><br/>'
	    var footer = '<br/><br/><div><img src="https://s3.amazonaws.com/dataskeptic.com/img/png/email-footer.png" /></div>'
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
	    }
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