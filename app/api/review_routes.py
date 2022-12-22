from flask import Blueprint, request
from flask_login import login_required, current_user, login_user, logout_user
from .auth_routes import validation_errors_to_error_messages
from app.models import User, db, Business, Review
from app.forms import ReviewForm

review_routes = Blueprint('review', __name__)
