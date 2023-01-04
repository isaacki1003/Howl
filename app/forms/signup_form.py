from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')
    if not '@' in email or not '.' in email:
        raise ValidationError('Email address is invalid.')

def password_match(form, field):
    # Checking if passwords match
    password = form.password.data
    repeat_password = field.data
    if password != repeat_password:
        raise ValidationError('Passwords do not match.')

class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired('Please enter your first name.')])
    last_name = StringField('last_name', validators=[DataRequired('Please enter your last name.')])
    email = StringField('email', validators=[DataRequired('Please enter your email.') ,user_exists])
    password = StringField('password', validators=[DataRequired('Please enter a password.'), Length(min=8, message='Your password must be at least 8 characters.')])
    repeat_password = StringField('repeat_password', validators=[DataRequired('Please repeat your password.'), password_match])
