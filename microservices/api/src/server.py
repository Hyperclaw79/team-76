from src import app
from flask import jsonify


@app.route("/")
def home():
    return "Hasura Hello World"


@app.route('/events')
def get_events():
    ''' Returns a JSON with all events data currently live'''
    dummy_data = [
        {
            "title": "Selfie Contest",
            "subtitle": "Who's the best looking?",
            "tags": "#faces #selfies",
            "deadline": '5days',
            "phase": 'running',
            "nominationData": [
            {
                "Username": "ymmIADMSK",
                "Filename": "QLhosFCXRngD",
                "Description": "LuqGEzcASVDVcFIAGPWM",
                "Submission": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Iron_Man_bleeding_edge.jpg/220px-Iron_Man_bleeding_edge.jpg"
            },
            {
                "Username": "gYpfSMWpXFf",
                "Filename": "KmgnPmWM",
                "Description": "ycxbzbIFbRGsymaB",
                "Submission": "https://vignette.wikia.nocookie.net/ironman/images/2/21/47.jpg"
            },
            {
                "Username": "DQuClE",
                "Filename": "SHBIgOwkvMfV",
                "Description": "hBZuPcmsJUDOrXzTPowLY",
                "Submission": "https://www.sideshowtoy.com/assets/products/400310-iron-man-mark-iii/lg/marvel-iron-man-mark-3-life-size-figure-400310-08.jpg"
            },
            {
                "Username": "DZTFNUgiCb",
                "Filename": "pAHlFdbb",
                "Description": "MmGdoODojEVkypGLxmbwBo",
                "Submission": "https://images-na.ssl-images-amazon.com/images/I/91qvAndeVYL._RI_.jpg"
            },
            {
                "Username": "FHCegEPGd",
                "Filename": "AeBNKdu",
                "Description": "FcuntDPGFeKOtDWUVW",
                "Submission": "https://vignette.wikia.nocookie.net/marveldatabase/images/0/06/Iron_Man_Armor_Model_37.jpg"
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
    return jsonify(data=dummy_data)


@app.route('/noms-native')
def noms_native():
    dummy_data = [
        {
            "title": "Selfie Contest",
            "subtitle": "Who's the best looking?",
            "tags": "#faces #selfies",
            "deadline": '5days',
            "phase": 'running',
            "nominationData": [
            {
                "Username": "ymmIADMSK",
                "Filename": "QLhosFCXRngD",
                "Description": "LuqGEzcASVDVcFIAGPWM",
                "Submission": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Iron_Man_bleeding_edge.jpg/220px-Iron_Man_bleeding_edge.jpg"
            },
            {
                "Username": "gYpfSMWpXFf",
                "Filename": "KmgnPmWM",
                "Description": "ycxbzbIFbRGsymaB",
                "Submission": "https://vignette.wikia.nocookie.net/ironman/images/2/21/47.jpg"
            },
            {
                "Username": "DQuClE",
                "Filename": "SHBIgOwkvMfV",
                "Description": "hBZuPcmsJUDOrXzTPowLY",
                "Submission": "https://www.sideshowtoy.com/assets/products/400310-iron-man-mark-iii/lg/marvel-iron-man-mark-3-life-size-figure-400310-08.jpg"
            },
            {
                "Username": "DZTFNUgiCb",
                "Filename": "pAHlFdbb",
                "Description": "MmGdoODojEVkypGLxmbwBo",
                "Submission": "https://images-na.ssl-images-amazon.com/images/I/91qvAndeVYL._RI_.jpg"
            },
            {
                "Username": "FHCegEPGd",
                "Filename": "AeBNKdu",
                "Description": "FcuntDPGFeKOtDWUVW",
                "Submission": "https://vignette.wikia.nocookie.net/marveldatabase/images/0/06/Iron_Man_Armor_Model_37.jpg"
            }
        ]
        }
    ]
    return jsonify(data=dummy_data)


@app.route('/vote-native')
def vote_native():
    dummy_data = [
        {
            "title": "Audiophilia",
            "subtitle": "Anyone's gonna rule the music league here?",
            "tags": "#recordings #songs",
            "deadline": '4days',
            "phase": 'open'
        }
    ]
    return jsonify(data=dummy_data)


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
        "Username": "Winner",
        "Filename": "Dope Ironman",
        "Description": "This is the dopest ironman pic. So it should win.",
        "Submission": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Iron_Man_bleeding_edge.jpg/220px-Iron_Man_bleeding_edge.jpg",
        "Votes": 123
        },
        {
        "Username": "User",
        "Filename": "KmgnPmWM",
        "Description": "ycxbzbIFbRGsymaB",
        "Submission": "https://vignette.wikia.nocookie.net/ironman/images/2/21/47.jpg",
        "Votes": 100
        }
    ]
    return jsonify(data=resultsData)


@app.route('/users')
def users():
    dummy_data = {
        "Name": "Tony Stark",
        "Avatar": "http://www.telegraph.co.uk/content/dam/films/2016/04/28/tonystark2-xlarge_trans_NvBQzQNjv4BqeuRHplZSizlnIpEPA_wgci-oMky92GODLj7YayikDrk.jpg",
        "Score": 7,
        "Latest": "Robot Hacking"
    }
    return jsonify(data=dummy_data)