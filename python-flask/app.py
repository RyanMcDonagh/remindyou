from flask import Flask, jsonify, request, abort, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_security import Security, SQLAlchemyUserDatastore, \
    UserMixin, RoleMixin, login_required
from flask_login import current_user
import sqlalchemy
import json
import pymysql
import os

# State API version
api = 'v1.0'

# Initialise Flask application
app = Flask(__name__)

# Prevent CORS issue with Chrome
CORS(app)

# Configure XSF secret key
app.config['SECRET_KEY'] = os.getenv('XSF_SECRET', default='remindyou')

# Enable authentication through JWT (admittedly ill-advised!)
app.config['WTF_CSRF_ENABLED'] = False

# Configure Flask-Security settings
app.config['SECURITY_PASSWORD_SALT'] = os.getenv('FS_HASH', default='remindyou')
app.config['SECURITY_REGISTERABLE'] = True

# Configure Database location and initialise database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://{0}:{1}@{2}:{3}/{4}'.format(
    os.getenv('DB_USER', default='root'),
    os.getenv('DB_PASS', default='toor'),
    os.getenv('DB_HOST', default='localhost'),
    os.getenv('DB_PORT', default='3306'),
    os.getenv('DB_NAME', default='remindyou')
)
db = SQLAlchemy(app)

# Define database tables

# Define models
roles_users = db.Table('roles_users',
        db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
        db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))

class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))
    lists = db.relationship('List', backref='author', lazy=True)

class List(db.Model):
    __tablename__ = 'lists'
    id = db.Column('id', db.Integer, primary_key=True)
    user = db.Column('user', db.ForeignKey('user.id'), nullable=False)
    title = db.Column('title', db.String(255), nullable=False)
    items = db.relationship('Task', backref='list', lazy=True)

class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column('id', db.Integer, primary_key=True)
    list_id = db.Column('list_id', db.ForeignKey('lists.id'), nullable=False)
    title = db.Column('title', db.String(255), nullable=False)
    description = db.Column('description', db.Text, nullable=False)

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)

# Create a user to test with
@app.before_first_request
def create_user():
    db.create_all()
    if User.query.filter_by(email='ryan@gmail.com').first() is None:
        user_datastore.create_user(email='ryan@gmail.com', password='ilikecats')
        db.session.commit()

# API Routing
@app.route('/')
def hello():
    return "Hello world!"


@app.route('/login', methods=['POST'])
def login():
    print('success')




# Get lists for a given user id
@app.route('/{0}/lists/<id>'.format(api), methods=['GET'])
def get_lists_by_user_id(id):
    print(request)
    if List.query.filter_by(user=id).first() is None:
        return Response({
            'Could not find any lists for user id: {0}'.format(id)
        }, status=404, mimetype='application/json')

    lists = List.query.filter_by(user=id)
    resp = [{
        "list_id": l.id,
        "title": l.title
    } for l in lists]
    return jsonify(resp)


# Delete a list with a given id
@app.route('/{0}/lists/delete/<id>'.format(api), methods=['DELETE'])
def delete_list(id):
    try:
        List.query.filter_by(id=id).one()
    except sqlalchemy.orm.exc.NoResultFound:
        return Response({
            'Could not find list id: {0}'.format(id)
        }, status=404)

    Task.query.filter_by(list_id=id).delete()
    List.query.filter_by(id=id).delete()
    db.session.commit()
    return jsonify({
        'status': 'success'
    })


@app.route('/{0}/lists/new'.format(api), methods=['POST'])
def create_new_list():
    data = json.loads(request.data)
    l = List(
        user=data['user_id'],
        title=data['title']
    )
    db.session.add(l)
    db.session.commit()
    return jsonify({
        'status': 'success'
    })



@app.route('/{0}/tasks/<id>'.format(api))
def get_tasks_by_list_id(id):
    tasks = Task.query.filter_by(list_id=id)
    resp = [{
        "id": task.id,
        "title": task.title,
        "description": task.description
    } for task in tasks]
    return jsonify(resp)


@app.route('/{0}/tasks/new'.format(api), methods=['POST'])
def create_new_task():
    data=json.loads(request.data)
    t = Task(
        list_id=data['list_id'],
        title=data['title'],
        description=data['description']
    )
    db.session.add(t)
    db.session.commit()
    return jsonify({
        'status': 'success'
    })


@app.route('/{0}/tasks/d/<id>'.format(api), methods=['DELETE'])
def delete_task(id):
    if Task.query.filter_by(id=id).first() is None:
        return Response({
            'Could not find task id: {0}'.format(id)
        }, status=404, mimetype='application/json')

    Task.query.filter_by(id=id).delete()
    db.session.commit()
    return jsonify({
        'status': 'success'
    })


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)