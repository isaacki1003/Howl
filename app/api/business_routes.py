from flask import Blueprint, request
from flask_login import login_required, current_user, login_user, logout_user
from .auth_routes import validation_errors_to_error_messages
from app.models import User, db, Business, BusinessImages, Review, ReviewImages
from app.forms import BusinessForm, BusinessImageForm, ReviewForm

business_routes = Blueprint('business', __name__)

#GET ALL BUSINESSES
@business_routes.route('/')
def get_businesses():
    businesses = Business.query.all()
    return {"businesses": [business.to_dict() for business in businesses]}

#GET A SINGLE BUSINESS
@business_routes.route('/<int:id>')
def get_business(id):
    business = Business.query.get(id)
    return {'business': business.to_dict()}

#CREATE A BUSINESS
@business_routes.route('', methods=['POST'])
@login_required
def create_business():
    user_id = current_user.id
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('FORM DATA -------------______---------> ', form.data)
        business = Business(
            owner_id = form.data['owner_id'],
            name = form.data['name'],
            address = form.data['address'],
            city = form.data['city'],
            state = form.data['state'],
            country = form.data['country'],
            zip_code = form.data['zip_code'],
            description = form.data['description'],
            phone_number = form.data['phone_number'],
            hours = form.data['hours'],
            business_type = form.data['business_type'],
            price = form.data['price'],
            url = form.data['url'],
        )
        db.session.add(business)
        db.session.commit()
        return business.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#UPDATE A BUSINESS
@business_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_business(id):
    business = Business.query.get(id)
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('FORM DATA -------------______---------> ', form.data)

    if form.validate_on_submit():
        business.name = form.data['name']
        business.address = form.data['address']
        business.city = form.data['city']
        business.state = form.data['state']
        business.zip_code = form.data['zip_code']
        business.description = form.data['description']
        business.phone_number = form.data['phone_number']
        business.hours = form.data['hours']
        business.business_type = form.data['business_type']
        business.price = form.data['price']
        business.url = form.data['url']
        db.session.commit()
        return business.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#DELETE A BUSINESS
@business_routes.route('/<int:id>', methods=['DELETE'])
def delete_business(id):
    business = Business.query.get(id)
    db.session.delete(business)
    db.session.commit()
    return {'message': 'Business deleted'}

#ADD IMAGES TO A BUSINESS
@business_routes.route('/<int:id>/images', methods=['POST'])
@login_required
def add_business_images(id):
    form = BusinessImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = BusinessImages(
            business_id = form.data['business_id'],
            url = form.data['url'],
            preview = form.data['preview']
        )
        db.session.add(image)
        db.session.commit()
        return image.to_dict()
    return {'error': 'Error with Image'}

#DELETE IMAGE FROM A BUSINESS
@business_routes.route('/<int:businessId>/images/<int:imageId>', methods=['DELETE'])
@login_required
def delete_business_image(businessId, imageId):
    image = BusinessImages.query.get(imageId)
    if image:
        db.session.delete(image)
        db.session.commit()
        return {'message': 'Image deleted'}
    return {'errors': 'Image not found'}, 404

#GET ALL REVIEWS FOR A BUSINESS
@business_routes.route('/<int:id>/reviews')
def get_business_reviews(id):
    business = Business.query.get(id)
    res = []
    if business:
        reviews = business.business_reviews
        for review in reviews:
            images = review.review_images
            result = review.to_dict()
            result['images'] = images
            result['reviewer'] = review.reviewer()
            res.append(result)
    return {'reviews': res}

#ADD A REVIEW TO A BUSINESS
@business_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def add_business_review(id):
    business = Business.query.get(id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if business:
        if form.validate_on_submit():
            review = Review(
                business_id = id,
                user_id = current_user.id,
                stars = form.data['stars'],
                review = form.data['review']
            )
            db.session.add(review)
            db.session.commit()
            return review.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'error': 'Business not found'}, 404
