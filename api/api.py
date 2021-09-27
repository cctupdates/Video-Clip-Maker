import os
import flask
from flask import request
from flask import send_file
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)

def doesFileExists(x):
    return os.path.exists(x)

@app.route('/getVideo')
def getVideo():
    filepath = "./static/videos/vid.mp4"
    return send_file(filepath)

@app.route('/getState')
def getState():
    filepath = "./static/json/state.json"
    if(doesFileExists(filepath)): 
        return send_file(filepath)
    return {}

@app.route('/saveState', methods=['POST'])
def saveState():
    filepath = "./static/json/state.json"
    f = open(filepath, "w")
    f.write(request.data.decode("utf-8"))
    obj = {"status": "completed"}
    return obj

app.run()
