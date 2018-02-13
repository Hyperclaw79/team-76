from src import db

class User(db.Model):
    '''Stores information about all the users who have registered'''

    hasura_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    avatar_file_id = db.Column(db.String)
    score = db.Column(db.Integer, server_default='0')
    last_event_id = db.Column(db.Integer, db.ForeignKey('event.id'))

    def __repr__(self):
        return '<User {}>'.format(self.name)


class Event(db.Model):
    '''Stores list of all events currently running or open'''

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    subtitle = db.Column(db.String)
    tags = db.Column(db.String)
    phase = db.Column(db.String, db.CheckConstraint('phase IN (\'running\', \'open\')'))
    deadline = db.Column(db.DateTime, nullable=False)
    votes = db.Column(db.Integer, nullable=False, server_default='0')
    nominations = db.relationship('Nomination', backref='event', lazy=True)

    def __repr__(self):
        return '<Event {}>'.format(self.title)


class Nomination(db.Model):
    '''Stores all the nominations for various events'''

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_id = Db.Column(db.Integer, db.ForeignKey('event.id'))
    username = db.Column(db.String, db.ForeignKey('user.username'), nullable=False)
    filename = db.Column(db.String, nullable=False)
    desc = db.Column(db.String, server_default='No description')
    file_id = db.Column(db.String, nullable=False)