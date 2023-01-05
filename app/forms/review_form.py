from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange
from app.models import Review

class ReviewForm(FlaskForm):
    review = TextAreaField('review', validators=[DataRequired('Please give an explanation of your rating (1-2000 characters).'), Length(min=1, max=2000, message='Your review might be too longer, consider shortening your review to 2000 characters.')])
    stars = IntegerField('stars', validators=[DataRequired('Please give a rating for this business.'), NumberRange(min=1, max=5, message='Rating must be between 1 and 5.')])
