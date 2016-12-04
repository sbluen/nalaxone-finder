'''
Created on Oct 23, 2016

@author: Steven
'''

from flask import Flask
application = Flask(__name__)

@application.route("/")
def hello():
    return "Hello World!"

@application.route("/set")
def set():
    return "Update request received"

if __name__ == "__main__":
    application.run(host='0.0.0.0', port=8080)
