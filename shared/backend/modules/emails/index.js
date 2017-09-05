import aws from 'aws-sdk';

const ses = new aws.SES({apiVersion: '2010-12-01'});

const header = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1"><title>dataskeptic</title><style type="text/css">@media only screen and (min-width:481px) and (max-width: 600px){.whole-width{width:425px !Important;}.left-side{float: left !important;}.left-side img{width:100% !important;}.left-sideimg{width:100% !important;}.td_1{width:100% !important;float:left !important;}.td_12{width: 100% !important;float:left !important;}}@media only screen and (min-width:321px) and (max-width: 480px){.whole-width{width:355px !Important;}.hello{float: left !important;}.hello2{padding:0 0 0 14px !important;}.hello3{padding:0 15px 0 19px !important;}.hello4{padding:0px !important;}.access{padding:22px 0 25px 26px !important;}.pic{padding:25px 0 0 90px !important;}.left-side{float: left !important;}.left-side img{width:100% !important;}.left-sideimg{width:100% !important;}.td_1{width:100% !important;float:left !important;}.td_12{width: 100% !important;float:left !important;}.email_btn img{width:274px !important;}.centerr{text-align:center !important;}}@media only screen and (max-width:320px){.whole-width{width:300px !Important;}.left-side{float: left !important;}.left-side img{width:100% !important;}.left-sideimg{width:100% !important;}.td_1{width:100% !important;float:left !important;}.td_12{width: 100% !important;float:left !important;}.centerr{text-align:center !important;}}</style></head> <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center> <table bgcolor="#047595" align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" > <tr> <td align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" class="whole-width" style="width:600px;background:#002940;"><tr bgcolor="#3a3b3b"><td align="left" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="padding:20px 0 23px 0px;" align="center" valign="top" ><a title="dataskeptic" href="https://dataskeptic.com/"><img style="display:block;" width="180" align="center" src="https://dataskeptic.com/img/png/logo.png" border="0" alt=""/></a></td></tr></table></td></tr><tr bgcolor="#ffffff"><td align="left" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr> <td style="text-align:center;line-height:29px;font-size:24px;font-family:\'Helvetica Neue\',Arial,\'sans-serif\';padding:25px 30px 35px 30px;color:#333333;" align="left" valign="top" >`
const footer = `</td></tr></table></td></tr></table><table border="0" cellpadding="0" cellspacing="0" class="whole-width" class="wrapper" style="width:600px;background:#3a3b3b;"><tr bgcolor="#3a3b3b"><td style="padding:5px 0 5px 0;" align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr bgcolor="#3a3b3b"><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr> <td style="padding:13px 0 10px 0;" align="center" valign="top" ><a title="dataskeptic" style="display:inline-block;" href="https://www.facebook.com/dataskeptic"><img border="0" style="display:block;border-width:0;" src="https://gallery.mailchimp.com/aabfeb82daabbad28e6f6745e/images/a301be2d-6f98-445a-9737-70d211cacbf5.jpg" alt=""></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a title="dataskeptic" style="display:inline-block;" href="https://twitter.com/dataskeptic"><img border="0" style="display:block;border-width:0;" src="https://gallery.mailchimp.com/aabfeb82daabbad28e6f6745e/images/fd5592b5-72f5-4f44-bd49-3bc5205f0a55.jpg" alt=""></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a title="dataskeptic" style="display:inline-block;" href="https://youtube.com/dataskeptic"><img border="0" style="display:block;border-width:0;" src="https://gallery.mailchimp.com/aabfeb82daabbad28e6f6745e/images/e76d4bc1-5f25-4423-b5e3-8bdce65d5f83.jpg" alt=""></a></td></tr></table></td></tr></table></td></tr></table> </td></tr></table> </center> </body></html>`

const generateBody = (message) => header + message + footer;

export const send = (destination, message, subject, source) => {
    const body = generateBody(message);

    const emailRequestData = {
        Source: source ? source : "kyle@dataskeptic.com",
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