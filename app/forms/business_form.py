from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, URL, NumberRange, Length, Regexp
from app.models import Business

class BusinessForm(FlaskForm):
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired('Please enter your business name.'), Length(min=1, max=200, message='Business name must be between 1 and 200 characters.')])
    address = StringField('address', validators=[DataRequired('Please enter an address for your business'), Length(min=1, max=150, message='Address must be between 1 and 150 characters.')])
    city = StringField('city', validators=[DataRequired('Please enter a city.'), Length(min=1, max=50, message='City must be between 1 and 50 characters.')])
    state = StringField('state', validators=[DataRequired('Please enter a state.'), Length(min=1, max=50, message='State must be between 1 and 50 characters.')])
    country = StringField('country', validators=[DataRequired('Please enter a country.'), Length(min=1, max=50, message='Country must be between 1 and 50 characters.')])
    zip_code = StringField('zip_code', validators=[DataRequired('Please enter your postal code.'), Length(min=1, max=15, message='Postal code must be between 1 and 15 characters.'), Regexp(r'^[\d-]+$', message='Postal code must contain only numbers and the character "-"')])
    description = TextAreaField('description', validators=[DataRequired('Please tell everyone about your business.'), Length(min=1, max=250, message='Description must be between 1 and 250 characters.')])
    phone_number = StringField('phone_number', validators=[DataRequired('Please enter a phone number.'), Length(min=14, max=14, message='Phone number must be 10 characters.')])
    hours = StringField('hours', validators=[DataRequired('Let everyone know your business hours.'), Length(min=1, max=400, message='Business hours must be between 1 and 400 characters.')])
    business_type = StringField('type', validators=[DataRequired('Please list up to 3 comma-separated categories.'), Length(min=1, max=250, message='Business type must be between 1 and 250 characters.')])
    price = IntegerField('price', validators=[DataRequired('Please enter a price.'), NumberRange(min=1, max=5000, message='Price must be between $1 and $5,000.')])
    url = StringField('url', validators=[URL(), Length(max=250, message='Business page URL must be less than 250 characters.')])
