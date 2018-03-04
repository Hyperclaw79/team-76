from src import app, db
from flask import jsonify, abort, request
from src.models import User, Event
import requests
import os
import json

CLUSTER_NAME = os.environ.get('CLUSTER_NAME')

@app.route("/")
def home():
    return "Hasura Hello World"


@app.route('/register', methods=['POST'])
def register():
    '''Register a new user'''
    headers = {'Content-Type': 'application/json'}
    request_data = request.get_json()
    # print(request_data)
    body = {
        'provider': 'email',
        'data': {
            'email': request_data['email'],
            'password': request_data['password']
        }
    }
    # print(body)
    auth_url = 'https://auth.{}.hasura-app.io/v1/signup'.format(CLUSTER_NAME)
    auth_response = requests.post(auth_url, data=json.dumps(body), headers=headers).json()
    print(auth_response)
    if 'hasura_id' not in auth_response:
        return 'Something went wrong', 400
    new_user = User(hasura_id=auth_response.get('hasura_id'),
                    username=request_data['username'],
                    avatar_file_link=request_data['avatar'])
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        print(e)
        return 'Something went wrong', 400
    return 'Successfully registered', 201


@app.route('/events/<phase>')
def get_events(phase):
    ''' Returns a JSON with all events data currently in a perticular phase i.e (running/open)'''
    try:
        events = Event.query.filter_by(phase=phase).all()
        events_data = [
            {
                'id': event.id,
                'title': event.title,
                'subtitle': event.subtitle,
                'tags': event.tags,
                'phase': event.phase,
                'nominationData': [
                    {
                        'id': nomination.id,
                        'username': User.query.filter_by(hasura_id=nomination.hasura_id).first().username,
                        'filename': nomination.filename,
                        'description': nomination.desc,
                        'submission': nomination.file_link,
                        'votes': nomination.votes
                    }
                    for nomination in event.nominations
                ]
            }
            for event in events
        ]
        return jsonify(data=events_data), 200
    except Exception as e:
        print(e)
        return json.dumps({
            'status': 'error',
            'description': 'Something went wrong. Could not find events. Please check the information correctly.'
            }), 404


@app.route('/vote', methods=['POST'])
def vote():
    '''Gives vote to specified event'''
    # try:
    #     request_data = request.get_json()
    #     voter = User.query.filter_by(hasura_id=request_data[])
    return 'Voted!'


@app.route('/nominate', methods=['POST'])
def nominate():
    '''Nominate a new entry in a event'''
    try:
        request_data = request.get_json()
        nomination = Nomination(event_id=request_data['event_id'],
                                hausra_id=request_data['user_id'],
                                filename=request_data['filename'],
                                desc=request_data['description'],
                                file_link=request_data['submission'])
        db.session.add(nomination)
        db.session.commit()
        return json.dumps({
            'status': 'success',
            'nomination_id': nomination.id
            }), 201
    except Exception as e:
        print(e)
        return json.dumps({
            'status': 'error',
            'description': 'Something went wrong. Could not create the nomination. Please check the information correctly.'
            }), 400


@app.route('/results')
def results():
    '''Send results of events which are over'''
    resultsData = [
        {
            "event": "Ironman pics",
            "details":
            {
                "winner":
                {
                    "username": "Hyper",
                    "filename": "Dope Ironman",
                    "description": "This is the dopest ironman pic. So it should win.",
                    "submission": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Iron_Man_bleeding_edge.jpg/220px-Iron_Man_bleeding_edge.jpg",
                    "votes": 123
                },
                "user":
                {
                    "username": "gYpfSMWpXFf",
                    "filename": "KmgnPmWM",
                    "description": "ycxbzbIFbRGsymaB",
                    "submission": "https://vignette.wikia.nocookie.net/ironman/images/2/21/47.jpg",
                    "votes": 100
                }
            }
        }
    ]
    return jsonify(data=resultsData)


@app.route('/users')
def users():
    '''Gives profile data of logged in user'''
    current_user = User.query.filter_by(hasura_id=request.args.get('user')).first_or_404()
    data = {
        "name": current_user.username,
        "avatar": current_user.avatar_file_link,
        "score": current_user.score,
        "latest": None # Handle this later
    }
    return jsonify(data=data)


@app.route('/fileUpload', methods=['POST'])
def upload():
    '''Uploads a file to Hasura filestore and returns the link to the file.'''
    filestore_url = 'https://filestore.{}.hasura-app.io/v1/file'.format(CLUSTER_NAME)
    headers = {
        "Content-Type": request.files['avatar'].mimetype,
        "Authorization": "Bearer {}".format(os.environ.get('ADMIN_BEARER_TOKEN'))
    }
    uploader = requests.post(filestore_url, data=request.files['avatar'], headers=headers)
    print(uploader.json())
    data = {
        "file_link": filestore_url+'/'+uploader.json()['file_id']
    }
    return jsonify(data=data)
