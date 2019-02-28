from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import pymysql

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:toor@localhost/remindyou'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column('id', db.Integer, primary_key=True)
    fName = db.Column('fName', db.Unicode)
    lName = db.Column('lName', db.Unicode)
    email = db.Column('email', db.Unicode)
    


@app.route('/')
def hello():
    return "Hello world!"

@app.route('/ryan')
def ryan():
    data = {
        "name": 'Ryan McDonagh',
        "age": '25',
        "color": 'Purple'
    }
    return jsonify(data)

@app.route('/test')
def test():
    user = User.query.filter_by(id=1).first()
    data = {
        "fName": user.fName,
        "lName": user.lName,
        "email": user.email
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)