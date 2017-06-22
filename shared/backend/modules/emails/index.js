import aws from 'aws-sdk';
import config from '../../../../global-config.json';

const ADMIN_EMAIL = config.emails.admin;
const ses = new aws.SES({apiVersion: '2010-12-01'});

const header = '<div><img src="https://s3.amazonaws.com/dataskeptic.com/img/png/email-header.png" /></div><br/>';
const footer = '<br/><br/><div><img src="https://s3.amazonaws.com/dataskeptic.com/img/png/email-footer.png" /></div>';

const generateBody = (message) => header + message + footer;

export const send = (destination, message, subject, source) => {
    const body = generateBody(message);

    const emailRequestData = {
        Source: source ? source : ADMIN_EMAIL,
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