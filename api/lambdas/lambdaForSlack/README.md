Before starting working with claudia.js you need to install and configure it.
Claudia is an npm package, so you can install it by executing next command:
npm i -g claudia
Then you have to go to your home directory on you computer (cd ~/) and create there directory
 .aws, and create file credentials into it (mkdir .aws && cd .aws && touch credentials)
 credentials file has next format:

 [claudia]
 aws_access_key_id = YOUR_ACCESS_KEY
 aws_secret_access_key = YOUR_ACCESS_SECRET

Then save it, and now, you are able to work with claudia.js
1. First you need to create webhook in your slack API. Go to https://api.slack.com/apps
2. On this page you need to create new app, related to your team, or choose existed
3. Then, in left menu you need to choose Incoming Webhooks. Then, on the bottom of page create one you need.
On next step you should paste is as SLACK_WEBHOOK_URL env variable.
4. Before deploying lambda function you have to look in package.json and find there lambda_export script.
You need to edit env.json, and set environment variables BUCKET and SLACK_WEBHOOK_URL;
5. `npm run i`
6. `npm run create`
7. `npm run update`
8. After previous step done, go to AWS lambda menu on your account, choose new created lambda
9. Go to trigger menu, select add trigger. YOu need to choose S3 trigger, set bucket you need, event type => Object create(all), suffix => wav
10. Now lambda will check for new wav files on bucket and post link on it into slack.