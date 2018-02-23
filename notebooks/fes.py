import unittest
import numpy as np
import pandas as pd
import datetime

# create dictionary for the mock data


def convert_df_to_dict(df):
    di = {}
    previous_user_id = ""
    previous_date = None
    for r in range(df.shape[0]):
        row = df.iloc[r]
        user_id = row['from_user']
        if user_id == previous_user_id:
            today = previous_date + datetime.timedelta(days=1)
            while today < row['date']:
                t['amount'].append(0)
                today = today + datetime.timedelta(days=1)
            t['amount'].append(row['amount'])
        else:
            t = {'start': row['date'], 'amount': []}
            t['amount'].append(row['amount'])
            previous_date = row['date']
            previous_user_id = user_id
            di[user_id] = t
    return di

# create get user transaction


def get_df_user_transaction(di, user_id, t_start, t_end):
    user_data = di[user_id]
    amts = []
    amounts = user_data['amount']
    user_start = user_data['start']
    i = 0
    n = len(user_data['amount'])
    user_end = user_start + datetime.timedelta(days=n)
    while t_start <= t_end:
        if t_start >= user_start and t_start < user_end:
            amount = amounts[i]
            i += 1
        else:
            amount = 0
        amts.append(amount)
        t_start = t_start + datetime.timedelta(days=1)
    return amts


def calculate_feature(w,df):
    di = convert_df_to_dict(df)
    rows = []
    df_user = df['from_user'].drop_duplicates()
    user_list = df_user.tolist()
    for i in range(len(user_list)):
        mock_s = datetime.datetime(2017, 11, 1)
        mock_e = mock_s + datetime.timedelta(days=w - 1)
        from_user = user_list[i]
        row = get_df_user_transaction(di, from_user, mock_s, mock_e)
        rows.append(row)
    return pd.DataFrame(rows)

def create_sub_segments(arr, w):
    #TODO: chunk this out into arrays of length w
    if len(arr) % w != 0 :
        