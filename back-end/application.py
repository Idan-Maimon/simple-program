from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

#Create the app
app = Flask (__name__)
CORS(app)
#Config the DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#Create the extension
db = SQLAlchemy(app)


class Drink(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(120))

    def __repr__(self):
        return f"{self.name} - {self.description}"

@app.route('/')
def index():
  return ('This is my bar menue, please press here')

@app.route('/api/drinks')
def get_drinks():
    drinks = Drink.query.all()
    output = []
    for drink in drinks:
        drink_data = {'name': drink.name, 'description': drink.description, 'id': drink.id}
        output.append(drink_data)
    return {"drinks": output}

@app.route('/api/drinks/<id>')
def get_drink(id):
    drink = Drink.query.get_or_404(id)
    return {"name": drink.name, "description": drink.description}

@app.route('/api/drinks', methods=['POST'])
def add_drink():
    drink = Drink(name=request.json['name'], description=request.json['description'])
    db.session.add(drink)
    db.session.commit()
    return {'id': drink.id}

@app.route('/api/drinks/<id>', methods=['DELETE'])
def delete_drink(id):
    drink = Drink.query.get(id)
    if drink is None:
        return {"error": "Drink Not Found"}
    db.session.delete(drink)
    db.session.commit()
    return {'Drink was deleted': drink.name}

if __name__ == '__main__':
   app.run(host='0.0.0.0',port=5000)