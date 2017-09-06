const AWS = require("aws-sdk");
const {getEmail} = require('../../../../shared/Emails/template')
export const sendMail = (obj) => {


    var msg = obj['msg']
    var to = obj['to']
    var toa = [to]
    var ses = new AWS.SES({apiVersion: '2010-12-01'});
    var from = 'orders@dataskeptic.com'
    var subject = obj['subject']
    var resp = {status: 200, msg: "ok"}
    var body = getEmail({msg: msg});
    var email_request = {
        Source: from,
        Destination: {ToAddresses: toa, BccAddresses: ["orders@dataskeptic.com"]},
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
    return new Promise((resolve, reject) => {

        ses.sendEmail(email_request, function (err, data) {
            if (err !== null) {

                console.log(err)
                return reject(JSON.stringify(err))
            } else {

                resp = {status: 200, msg: err}
                return resolve(JSON.stringify(resp))
            }
        });
    })
};