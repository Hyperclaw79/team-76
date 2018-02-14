import os


class Config(object):
    SQLALCHEMY_DATABASE_URI = 'postgresql://{username}:{password}@{hostname}:{port}/hasuradb'.format(
        username=os.environ.get('POSTGRES_USERNAME'),
        password=os.environ.get('POSTGRES_PASSWORD'),
        hostname=os.environ.get('POSTGRES_HOSTNAME'),
        port=os.environ.get('POSTGRES_PORT'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False