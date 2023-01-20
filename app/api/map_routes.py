from flask import Blueprint, jsonify
from flask_login import login_required
import os

map_routes = Blueprint('map', __name__)

@map_routes.route('/key', methods=['POST'])
@login_required
def load_map_key():
    key = os.environ.get('REACT_APP_MAPS_KEY')
    return {'googleMapsAPIKey': key}
