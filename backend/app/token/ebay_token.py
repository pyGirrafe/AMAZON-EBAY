import os
import time
import base64
import requests

# Get the directory where the script is located
script_directory = os.path.dirname(os.path.abspath(__file__))

# Define the folder for OAuth credentials in the same directory as the script
oauth_root = os.path.join(script_directory, "ebay_oauth")

oauth_clientIdfile = os.path.join(oauth_root, "ebay_apiuser.txt") # appID  = clientID
oauth_secretIdfile = os.path.join(oauth_root, "ebay_apisecret.txt") # certID = clientSecret
oauth_basictokenfile = os.path.join(oauth_root, "ebay_token_basic.txt") # will update every 2 hours

def get_basic_oauth_token():
    global oauth_basictokenfile
    # Look at timestamp to see if it has expired.
    now = time.time()
    duration = 7200  # Life of the token, 2 hours
    margin = 60  # Remaining time before we request a new token, 1 minute
    if os.path.exists(oauth_basictokenfile):
        tstamp = os.path.getmtime(oauth_basictokenfile) # get last modified time 
        if tstamp + duration - now > margin:  # Some time remains on token
            with open(oauth_basictokenfile, 'r') as f:
                return f.read().strip()
        else:
            return create_basic_oauth_token()
    else:
        return create_basic_oauth_token()

def create_basic_oauth_token():
    global oauth_clientIdfile, oauth_secretIdfile, oauth_basictokenfile

    url = 'https://api.ebay.com/identity/v1/oauth2/token'
    clientID = open(oauth_clientIdfile, 'r').read().strip()
    clientSecret = open(oauth_secretIdfile, 'r').read().strip()

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + base64.b64encode((clientID + ':' + clientSecret).encode()).decode()
    }

    body = {
        'grant_type': 'client_credentials',
        'scope': 'https://api.ebay.com/oauth/api_scope'
    }

    response = requests.post(url, headers=headers, data=body)
    
    if response.ok:
        token = response.json()
        if 'access_token' in token:
            with open(oauth_basictokenfile, 'w') as f:
                f.write(token['access_token'])
            return token['access_token']
    else:
        response.raise_for_status() # write some code to deal with error

# Example usage:
# token = get_basic_oauth_token()
# print(token)