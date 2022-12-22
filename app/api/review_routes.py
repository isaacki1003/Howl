from flask import Blueprint, request
from flask_login import login_required, current_user, login_user, logout_user
from .auth_routes import validation_errors_to_error_messages
from app.models import User, db, Business, Review
from app.forms import ReviewForm

review_routes = Blueprint('review', __name__)

#GET ALL REVIEWS
@review_routes.route('/')
def get_reviews():
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}

#GET A SINGLE REVIEW
@review_routes.route('/<int:id>')
@login_required
def get_review(id):
    review = Review.query.get(id)
    if review:
        return review.to_dict()
    return {'errors': 'Review not found'}, 404
