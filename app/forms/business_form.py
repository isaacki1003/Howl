from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, URL, NumberRange, Length
from app.models import Business

class BusinessForm(FlaskForm):
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired('Please enter your business name.')])
    address = StringField('address', validators=[DataRequired('Please enter an address for your business')])
    city = StringField('city', validators=[DataRequired('Please enter a city.')])
    state = StringField('state', validators=[DataRequired('Please enter a state.')])
    country = StringField('country', validators=[DataRequired('Please enter a country.')])
    zip_code = StringField('zip_code', validators=[DataRequired('Please enter Postal Code.')])
    description = TextAreaField('description', validators=[DataRequired('Please tell everyone about your business.')])
    phone_number = StringField('phone_number', validators=[DataRequired('Please enter a phone number.')])
    hours = StringField('hours', validators=[DataRequired('Let everyone know about your business hours.')])
    business_type = StringField('type', validators=[DataRequired('what do you specialize in? (Japanese cuisine, Italian...).')])
    price = IntegerField('price', validators=[DataRequired('Please enter a price.')])
    url = StringField('url')
