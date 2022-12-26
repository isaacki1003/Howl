from flask import Blueprint, request
from flask_login import login_required, current_user, login_user, logout_user
from .auth_routes import validation_errors_to_error_messages
from app.models import User, db, Business, Review, ReviewImages, BusinessImages
from app.forms import ReviewForm, ReviewImageForm

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

#EDIT A REVIEW
@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    review = Review.query.get(id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if review:
        if form.validate_on_submit():
            review.stars = form.data['stars']
            review.review = form.data['review']
            db.session.commit()
            return review.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': 'Review not found'}, 404

#DELETE A REVIEW
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return {'message': 'Review deleted'}
    return {'errors': 'Review not found'}, 404

#ADD REVIEW IMAGES
@review_routes.route('/<int:id>/images', methods=['POST'])
@login_required
def add_review_images(id):
    review = Review.query.get(id)
    form = ReviewImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if review:
        if form.validate_on_submit():
            image = ReviewImages(
                review_id = review.id,
                url = form.data['url']
            )
            db.session.add(image)
            db.session.commit()
            return image.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': 'Review not found'}, 404


#DELETE A REVIEW IMAGE
@review_routes.route('/images/<int:id>', methods=['DELETE'])
@login_required
def delete_review_image(id):
    image = ReviewImages.query.get(id)
    if image:
        db.session.delete(image)
        db.session.commit()
        return {'message': 'Image deleted'}
    return {'errors': 'Image not found'}, 404
