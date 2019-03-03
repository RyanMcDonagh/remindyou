from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import pymysql
import os

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://{0}:{1}@{2}:{3}/{4}'.format(
    os.getenv('DB_USER', default='root'),
    os.getenv('DB_PASS', default='toor'),
    os.getenv('DB_HOST', default='localhost'),
    os.getenv('DB_PORT', default='3306'),
    os.getenv('DB_NAME', default='remindyou')
)
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column('id', db.Integer, primary_key=True)
    fName = db.Column('fName', db.Unicode, nullable=False)
    lName = db.Column('lName', db.Unicode, nullable=False)
    email = db.Column('email', db.Unicode, nullable=False)
    lists = db.relationship('List', backref='author', lazy=True)

class List(db.Model):
    __tablename__ = 'lists'
    id = db.Column('id', db.Integer, primary_key=True)
    user = db.Column('user', db.ForeignKey('users.id'), nullable=False)
    title = db.Column('title', db.Unicode, nullable=False)
    items = db.relationship('Task', backref='list', lazy=True)

class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column('id', db.Integer, primary_key=True)
    list_id = db.Column('list_id', db.ForeignKey('lists.user'), nullable=False)
    title = db.Column('title', db.Unicode, nullable=False)
    description = db.Column('description', db.Text, nullable=False)


@app.route('/')
def hello():
    return "Hello world!"

@app.route('/lists/<id>')
def get_lists_by_user_id(id):
    lists = List.query.filter_by(user=id)
    resp = [{
        "list_id": l.id,
        "title": l.title
    } for l in lists]
    return jsonify(resp)


@app.route('/tasks/<id>')
def get_tasks_by_list_id(id):
    tasks = Task.query.filter_by(list_id=id)
    resp = [{
        "title": task.title,
        "description": task.description
    } for task in tasks]
    return jsonify(resp)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)