from src import app
from flask import jsonify, abort


@app.route("/")
def home():
    return "Hasura Hello World"


@app.route('/events/<phase>')
def get_events(phase):
    ''' Returns a JSON with all events data currently in a perticular phase i.e (running/open)'''
    if phase not in ['open', 'running']:
        abort(404)
    dummy_data = [
        {
            "title": "Selfie Contest",
            "subtitle": "Who's the best looking?",
            "tags": "#faces #selfies",
            "deadline": '5days',
            "phase": 'running',
            "nominationData": [
            {
                "username": "ymmIADMSK",
                "filename": "QLhosFCXRngD",
                "description": "LuqGEzcASVDVcFIAGPWM",
                "submission": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Iron_Man_bleeding_edge.jpg/220px-Iron_Man_bleeding_edge.jpg"
            },
            {
                "username": "gYpfSMWpXFf",
                "filename": "KmgnPmWM",
                "description": "ycxbzbIFbRGsymaB",
                "submission": "https://vignette.wikia.nocookie.net/ironman/images/2/21/47.jpg"
            },
            {
                "username": "DQuClE",
                "filename": "SHBIgOwkvMfV",
                "description": "hBZuPcmsJUDOrXzTPowLY",
                "submission": "https://www.sideshowtoy.com/assets/products/400310-iron-man-mark-iii/lg/marvel-iron-man-mark-3-life-size-figure-400310-08.jpg"
            },
            {
                "username": "DZTFNUgiCb",
                "filename": "pAHlFdbb",
                "description": "MmGdoODojEVkypGLxmbwBo",
                "submission": "https://images-na.ssl-images-amazon.com/images/I/91qvAndeVYL._RI_.jpg"
            },
            {
                "username": "FHCegEPGd",
                "filename": "AeBNKdu",
                "description": "FcuntDPGFeKOtDWUVW",
                "submission": "https://vignette.wikia.nocookie.net/marveldatabase/images/0/06/Iron_Man_Armor_Model_37.jpg"
            }
        ]
        },
        {
            "title": "Audiophilia",
            "subtitle": "Anyone's gonna rule the music league here?",
            "tags": "#recordings #songs",
            "deadline": '4days',
            "phase": 'open'
        }
    ]
    return jsonify(data=[event for event in dummy_data if event['phase']==phase])


@app.route('/vote', methods=['POST'])
def vote():
    '''Gives vote to specified event'''
    pass


@app.route('/nominate', methods=['POST'])
def nominate():
    '''Nominate a new entry in a event'''
    pass


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
    dummy_data = {
        "name": "Tony Stark",
        "avatar": "http://www.telegraph.co.uk/content/dam/films/2016/04/28/tonystark2-xlarge_trans_NvBQzQNjv4BqeuRHplZSizlnIpEPA_wgci-oMky92GODLj7YayikDrk.jpg",
        "score": 7,
        "latest": "Robot Hacking"
    }
    return jsonify(data=dummy_data)
