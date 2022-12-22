from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, URL

class BusinessImageForm(FlaskForm):
    business_id = IntegerField('business_id', validators=[DataRequired()])
    url = StringField('url', validators=[URL('Please enter a valid URL.')])
    preview = BooleanField('preview')
