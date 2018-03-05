import aws from 'aws-sdk';
import {getEmail} from '../../../Emails/template';

const ses = new aws.SES({apiVersion: '2010-12-01'});


export const send = (destination, message, subject, source) => {
    var email = process.env.ADMIN_EMAIL;
    const body = getEmail({msg: message});
    const emailRequestData = {
        Source: source ? source : email,
        Destination: { ToAddresses: [destination], BccAddresses: []},
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

    console.log('send email');
    return new Promise((res, rej) => {
        ses.sendEmail(emailRequestData, function(err, data) {
            if (err) {
                console.log('fail');
                console.error(err);
                rej(err);
            } else {
                console.log('success');
                res(data);
            }
        })
    });
};