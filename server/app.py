import db
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/icon/<name>')
def get_icon_url(name:str):
    return f"https://img.pokemondb.net/sprites/silver/normal/{name}.png"


@app.route('/')
def hello():
    data = db.get()
    return jsonify(data)


if __name__=='__main__':
    app.run(host='0.0.0.0',port=8080)