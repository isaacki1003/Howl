from flask import Blueprint, request
from flask_login import login_required, current_user, login_user, logout_user
from .auth_routes import validation_errors_to_error_messages
from app.models import User, db, Business
from app.forms import BusinessForm

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
@business_routes.route('/', methods=['POST'])
@login_required
def create_business():
    user_id = current_user.id
    form = BusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        business = Business(
            owner_id = form.data['owner_id'],
            name = form.data['name'],
            address = form.data['address'],
            city = form.data['city'],
            state = form.data['state'],
            zip_code = form.data['zip_code'],
            country = form.data['country'],
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
    if form.validate_on_submit():
        business.name = form.data['name'],
        business.address = form.data['address'],
        business.city = form.data['city'],
        business.state = form.data['state'],
        business.zip_code = form.data['zip_code'],
        business.country = form.data['country'],
        business.description = form.data['description'],
        business.phone_number = form.data['phone_number'],
        business.hours = form.data['hours'],
        business.business_type = form.data['business_type'],
        business.price = form.data['price'],
        business.url = form.data['url'],
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
