from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, URL

class ReviewImageForm(FlaskForm):
    review_id = IntegerField('review_id', validators=[DataRequired()])
    url = StringField('url', validators=[URL('Please enter a valid URL.')])
