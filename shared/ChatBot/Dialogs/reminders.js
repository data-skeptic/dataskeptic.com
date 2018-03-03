var chatter = require("./chatter")

function get_opening_remark(dispatch) {
	return "Ok, reminders"
}
function handler(dispatch, reply, cstate, message) {
	var msg = "Under construction reminders!"
    var payload = cstate.payload
    // TODO: check if the payload is a blog (has blog_id), if so, its a podcast recommendation
	var handler = undefined
	return {msg, handler}
}

function can_handle(message) {
	var lmsg = message.text.toLowerCase()
	if (lmsg.indexOf('reminder') != -1) {
		return true
	} else {
		return false
	}
}

module.exports = {handler, get_opening_remark, can_handle}


/*
"use strict"

var builder = require('botbuilder');
var axios = require('axios');
var AWS = require("aws-sdk");

var chatter = require("../chatter")

var url                    = "http://0.0.0.0:3500/"
var microsoft_app_id       = process.env.MICROSOFT_APP_ID
var microsoft_app_password = process.env.MICROSOFT_APP_PASSWORD
var aws_accessKeyId        = process.env.AWS_ACCESS_KEY_ID
var aws_secretAccessKey    = process.env.AWS_ACCESS_SECRET_KEY
var aws_region             = process.env.AWS_REGION
AWS.config.update(
    {
        "accessKeyId": aws_accessKeyId,
        "secretAccessKey": aws_secretAccessKey,
        "region": aws_region
    }
);

var e164 = require('e164'), assert = require('assert');

AWS.config.update(
    {
        "accessKeyId": aws_accessKeyId,
        "secretAccessKey": aws_secretAccessKey,
        "region": aws_region
    }
);
var params = {
    TableName: "dsbot-phrase-lookup"
};

// var ses = new AWS.SES({apiVersion: '2010-12-01'});
// const c = require('../config/config.json')
// var url = c['api'] 
// let send_reminder = function(contact_type, contact_account, reminder_time,  episode_title = null, episode_link = null) {
//     // console.log("In send_reminder function, what is the input episode_title? ", episode_title)
//     return new Promise(function(resolve, reject) {
//         axios.post(url +'listener_reminder', 
//         {"contact_type": contact_type, 
//          "contact_account": contact_account,
//          "reminder_time": reminder_time, 
//          "episode_link":episode_link,
//          "episode_title":episode_title
//         }
//         ) 
//         .then(function(result) {
//                 console.log('** successful in calling sending message.')
//                 resolve(result.data)
//             })
//             .catch(function(err) {
//                     console.log("** something is wrong in calling record_answer_to_database and "+ err)
//                     reject(err)
//             });
//         })
// };

let send_reminder2 = function(contact_type, contact_account, reminder_time,  episode_titles = null, episode_links = null) {
    // console.log("In send_reminder function, what is the input episode_title? ", episode_title)
    return new Promise(function(resolve, reject) {
        axios.post(url +'listener_reminder', 
        {
            "contact_type": contact_type, 
            "contact_account": contact_account,
            "reminder_time": reminder_time, 
            "episode_links":episode_links,
            "episode_titles":episode_titles
        })
        .then(function(result) {
            console.log('Seeming success setting listener reminder.')
            resolve(result)
        })
        .catch(function(err) {
            console.log("**listener_reminder.js:  something is wrong in calling record_answer_to_database and "+ err)
            reject(err)
        });
    })
};

var listener_reminder = {}
var with_episode = true
var waterfall = [
	function (session, results, next) {
        console.log("data when enter the reminder session is ",results)
        if (results != undefined && results.title != undefined && results.link != undefined){
            listener_reminder.title = results.title
            listener_reminder.link = results.link
            // if (listener_reminder.title.length == 1){
            //     var resp2 = chatter.get_message("REMINDER>START1") + results.title[0] + "?"
            // }else{
            //     var resp2 = chatter.get_message("REMINDER>START1") + results.title[0] + " and " + results.title[1] + "?"
            // }
            // builder.Prompts.confirm(session, resp2);
            with_episode = true
            next()
        } else{
            with_episode = false
            var resp1 = chatter.get_message("REMINDER>START0")
            listener_reminder = {}
            //console.log('when no episode, the var episode_title is ', results.title)
            builder.Prompts.confirm(session, resp1);
        }
    },
    function (session, results, next) {
        if (with_episode){
            var resp = chatter.get_message("REMINDER>ASK_TIME")
            builder.Prompts.time(session, resp)
        } else{
            if (results.response) {
                var resp = chatter.get_message("REMINDER>ASK_TIME")
                builder.Prompts.time(session, resp)
            } else {
                var resp = chatter.get_message("REMINDER>ENDREMINDER")
                session.endConversation(resp)
            }
        }
        
    },
    function (session, results, next){
    	var temp_time = builder.EntityRecognizer.resolveTime([results.response])
    	listener_reminder.time = temp_time //+ session.userData.listener_reminder.diff
        // console.log("listener_reminder.time is ", listener_reminder.time)
    	var resp = chatter.get_message("REMINDER>ASK_METHOD")
        builder.Prompts.choice(session, resp, ["Email", "SMS"], builder.ListStyle.button)
    },
    function (session, result, next){
    	var c = result.response.entity
        listener_reminder.contact_type = c
		if (c == 'Email' ) {
			var resp = chatter.get_message("REMINDER>ASK_EMAIL")
			builder.Prompts.text(session, resp)
		} else if (c == 'SMS') {
			resp = chatter.get_message("REMINDER>ASK_PHONE")
			builder.Prompts.text(session, resp)
        } 
    },
    function (session, results) {
        // email case
        listener_reminder.contact_account = undefined
        if (results.response.includes('@')){
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(results.response)){
                listener_reminder.contact_account = results.response
            }else{
                console.log("listener_reminder.js: the format of email is invalid.")
                // session.send(chatter.get_message("REMINDER>FAILURE"))
                // session.replaceDialog('/', { reprompt: true});
            }
        } else { 
            // non-email case
            // check whether it is a phone number
            // 1.Remove any characters which are not digits. For example, users may type 123-233-4444
            // 2.If number doesn't start with 1, add a 1
            // 3.add a + in front of the number
            // 4.Save this transformed version
            var phone_num = results.response.replace(/[^0-9]/g, "");
            if(phone_num[0] != 1){
                phone_num = "1" + phone_num
            }
            console.log(phone_num)
            try{
                assert.deepEqual({country: "United States", code: "US"}, e164.lookup(phone_num)); 
                phone_num = "+" + phone_num
                listener_reminder.contact_account = phone_num
                console.log('listener_reminder.js: phone number is ', phone_num)  
            } 
            catch(err){
                console.log('listener_reminder.js: The phone number is invalid')
            }

        }
        console.log('listener_reminder.js: listener_reminder.contact_account is ', listener_reminder.contact_account)
        if(listener_reminder.contact_account != undefined){
            var reminder_sent = send_reminder2(listener_reminder.contact_type, 
                listener_reminder.contact_account, 
                listener_reminder.time,
                listener_reminder.title,
                listener_reminder.link
            )
            reminder_sent.then(function(result) {
                if (result) {
                    console.log("listener_reminder.js: result is ", result)
                    session.send(chatter.get_message("REMINDER>SUCCESS"))
                    var after_dialog = chatter.get_message("AFTER_SUBDIALOG")
                    session.endConversation(after_dialog)                    
                } else {
                    console.log("err0:" + err)
                    session.endConversation("Oh no, I've encountered a bug.  Let's start over.")                    
                }
               
            }).catch(function(err) {
                console.log("err:" + err)
                session.endConversation("Oh no, I've encountered a bug.  Let's start over.")
            })

        } else {
            console.log('listener_reminder.js: contact info is not defined.')
            session.send(chatter.get_message("REMINDER>FAILURE"))
            var after_dialog = chatter.get_message("AFTER_SUBDIALOG")
            session.endConversation(after_dialog)
            
            //session.replaceDialog('/', { reprompt: true});
        }
        
        // if (/^\+[1-9]\d{1,14}$/.test(String(results.response)) || results.response.includes("@")){
        //     listener_reminder.contact_account = results.response
        //     // console.log('contact info is ', listener_reminder.contact_account)
        //     // console.log("listener_reminder info is ", listener_reminder)
        //     // session.send( "I will send you a reminder to " + listener_reminder.contact_account) //+ " at " + String(listener_reminder.time) + ".")
        //     // console.log("what is listener_reminder.title? ", listener_reminder.title)
        //     var reminder_sent = Promise.resolve(send_reminder(listener_reminder.contact_type, 
        //                                                       listener_reminder.contact_account, 
        //                                                       listener_reminder.time,
        //                                                       listener_reminder.title,
        //                                                       listener_reminder.link))
        //     reminder_sent.then(function(result){
        //         console.log(result)
        //         session.send(chatter.get_message("REMINDER>SUCCESS"))
        //         session.endDialog()
        //         }
        //     )           
        // } else {
        //     session.send(chatter.get_message("REMINDER>FAILURE"))
        //     session.replaceDialog('/', { reprompt: true});
        // } 
    }
]

exports.waterfall = waterfall

*/
