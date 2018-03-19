import sqlalchemy
import pymysql
import os
import re
import pandas as pd
import boto3
pymysql.install_as_MySQLdb()
from sqlalchemy.orm import sessionmaker
import json
import requests
from os.path import join, dirname
from dotenv import load_dotenv

class Listener_Reminder():
    def __init__(self, user, pw, base_url):
        self.message = "It is time to listen to Data Skeptic! "
        self.user= user
        self.pw = pw
        self.base_url = base_url

    def get_reminders(self):
        url = self.base_url + 'bot/reminders/unfulfilled/list'
        print(url)
        r = requests.get(url)
        return json.loads(r.content.decode('utf-8'))

    def send_message2(self, contact_type, contact_account,episode_titles = [], episode_links = []):
        print('** Message is to be sent.')
        message = 'Listen to Data Skeptic on iTunes, Spotify, Stitcher, or at dataskeptic.com'
        html_message = '<p>' + message + '</p>'
        for link in episode_links:
            html_message = html_message + link + "\n" 
        if contact_type == 'Email':
            client = boto3.client('ses',
                        region_name = 'us-east-1', 
                        aws_access_key_id = self.user, 
                        aws_secret_access_key = self.pw
                        )
            source_email = "kyle@dataskeptic.com"
            destination_email = [contact_account] #add "kyle@dataskeptic.com" later when everything is fixed.
            reply_to_email = source_email
            try:
                response = client.send_email(
                            Source= source_email,
                            Destination={'ToAddresses': destination_email},
                            Message={
                                'Subject': {
                                    'Data': 'A reminder from Data Skeptic!'
                                },
                                'Body': {
                                    'Html': {
                                        'Data': html_message
                                    }
                                }
                            },
                            ReplyToAddresses=[reply_to_email]
                        )
                print(response)
            except:
                print('listener_reminder: error in sending email. Check the email address.')

            #return response if 'ErrorResponse' in response else 'successful. Check email box.'  
        if contact_type == 'SMS':
            sms_message = message
            for i in range(len(episode_links)):
                episode_link = episode_links[i]
                episode_title = episode_titles[i]
                if len(episode_link) > 5:
                    sms_message = sms_message + " " + episode_title+ " " + episode_link + " "
            
            client = boto3.client(
                "sns",
                aws_access_key_id = self.user,
                aws_secret_access_key = self.pw,
                region_name="us-east-1"
            )
            try:
                response = client.publish(
                    PhoneNumber = contact_account,  
                    Message = sms_message)
                print(response)
            except:
                print('listener_reminder: error in sending message. Check the phone number.')
        print('** sending message is done.')

    def checkForReminders2(self):
        r = self.get_reminders()
        n = len(r)
        if n > 0:
            print("listener_reminder: The number of new task is " + str(n))
        tasks_dict = {}
        for i in range(n):
            print("Starting to send reminder {i} of {n}".format(i=i+1, n=n))
            reminder_task = r[i]
            reminder_id = reminder_task['task_id']
            reminder_time = reminder_task['reminder_time']
            contact_type = reminder_task['contact_type']
            contact_account = reminder_task['contact_account']
            episode_title = reminder_task['episode_title']
            if episode_title == "None":
                episode_title = ""
                
            episode_link = reminder_task['episode_link']
            if episode_link == "None":
                episode_link = ""
            if contact_account not in tasks_dict.keys():
                tasks_dict[contact_account] = {"contact_type": contact_type, "episode_titles":[episode_title],'episode_links':[episode_link]}
            else:
                tasks_dict[contact_account]['episode_titles'].append(episode_title)
                tasks_dict[contact_account]['episode_links'].append(episode_link)
            url = self.base_url + "bot/reminders/update"
            data = {"reminder_id": reminder_id}
            resp = requests.post(url, json.dumps(data))
        if len(tasks_dict) > 0:
            print('listener_reminder: tasks_dict is ', tasks_dict)
        for contact_account, value in tasks_dict.items():      
            self.send_message2(value['contact_type'], contact_account,value['episode_titles'], value['episode_links'])


def send_survey_results(ses, base_url):
    url = base_url + 'bot/survey/get_deliveries_to_make'
    r = requests.get(url)
    s = r.content.decode('utf-8')
    responses_to_send = json.loads(s)
    print(len(responses_to_send))
    for response in responses_to_send:
        response_id = response['response_id']
        url = base_url + 'bot/survey/response/get?response_id=' + str(response_id)
        r = requests.get(url)
        s = r.content.decode('utf-8')
        resp = json.loads(s)
        df2 = pd.DataFrame(resp)
        result = send_email(ses, df2, user, pw)
        print(result)
        if result['success']:
            url = base_url + 'bot/survey/mark_delivered'
            data = {"response_id": response_id}
            r = requests.post(url, json.dumps(data))
            s = r.content.decode('utf-8')
            print(s)


def send_email(ses, result_dfs, user, pw):
    source_email = 'kyle@dataskeptic.com'
    destination_email = [ "kyle@dataskeptic.com"] 
    reply_to_email = source_email
    if not result_dfs.empty:
        with pd.option_context('display.max_colwidth', 1000):
            bodyhtml = result_dfs.to_html() 
            response = ses.send_email(
                Source= source_email,
                Destination={'ToAddresses': destination_email},
                Message={
                    'Subject': {
                        'Data': 'A survey is complete.'
                    },
                    'Body': {
                        'Html': {
                            'Data': bodyhtml
                        }
                    }
                },
                ReplyToAddresses=[reply_to_email]
            )
            print(response)
            return {"success": False, "resp": response} if 'ErrorResponse' in response else {"success": True}
    return {"success": False, "resp": "Not ready"}


if __name__ == '__main__':
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path)
    api = os.environ['API']
    env = os.environ['ENV']
    base_url = api + env + '/'
    user = os.environ['AWS_ACCESS_KEY_ID']
    pw = os.environ['AWS_ACCESS_SECRET_KEY']
    reminder_ins = Listener_Reminder(user, pw, base_url)
    reminder_ins.checkForReminders2()
    ses = boto3.client('ses',
        region_name = 'us-east-1', 
        aws_access_key_id = user, 
        aws_secret_access_key = pw)
    send_survey_results(ses, base_url)

