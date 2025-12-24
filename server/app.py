import os

import db
from flask import Flask, jsonify, request

app = Flask(__name__)

DB_PATH = "pokemon_db.json"

_cache = {
    "data": None,
    "mtime": None
}

def load_cache(force: bool = False):
    current_mtime = os.path.getmtime(db.DB_PATH)

    if force or _cache["data"] is None or _cache["mtime"] != current_mtime:
        _cache["data"] = db.get()
        _cache["mtime"] = current_mtime

    return _cache["data"]


@app.route('/icon/<name>')
def get_icon_url(name:str):
    return f"https://img.pokemondb.net/sprites/silver/normal/{name}.png"




@app.route('/pokemon')
def get_pokemon_paginated():
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 30))
    
    all_pokemon = load_cache()
    total = len(all_pokemon)
    
    start_index = (page - 1) * limit
    end_index = start_index + limit
    
    paginated_data = all_pokemon[start_index:end_index]
    
    return jsonify({
        'data': paginated_data,
        'pagination': {
            'page': page,
            'limit': limit,
            'total': total,
            'totalPages': (total + limit - 1) // limit,
            'hasMore': end_index < total
        }
    })


if __name__=='__main__':
    try:
        load_cache(force=True)
        print(
            f"[OK] Cache preloaded | items={len(_cache['data'])} | mtime={_cache['mtime']}"
        )
    except Exception as e:
        print(f"[ERROR] Failed to preload cache: {e}")
        raise

    app.run(host='0.0.0.0',port=8080)