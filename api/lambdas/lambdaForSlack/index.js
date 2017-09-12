const URL = process.env.SLACK_WEBHOOK_URL;
const BUCKET = process.env.BUCKET;
const request = require('request');
exports.handler = function(event, context, callback) {

    console.dir(JSON.stringify(event.Records[0].s3.object.key))
    const name = JSON.stringify(event.Records[0].s3.object.key);
    const prettyname = name.replace(new RegExp('"', 'g'), '');
    request.post(
        URL,
        { json: { text: "https://s3-us-west-1.amazonaws.com/" + BUCKET + "/" + prettyname } },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body)
                callback(null, "ok")
            }
        }
    );
}