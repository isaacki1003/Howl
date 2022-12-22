from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(200), nullable=False)
    address = db.Column(db.String(150), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    zip_code = db.Column(db.String(15), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    hours = db.Column(db.String(300), nullable=False)
    business_type = db.Column(db.String(150), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    url = db.Column(db.String(250), nullable=True)

    owner = db.relationship("User", back_populates="user_businesses")
    business_reviews = db.relationship("Review", back_populates="business", cascade='all, delete')
    business_images = db.relationship("BusinessImages", back_populates="business", cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'zip_code': self.zip_code,
            'description': self.description,
            'phone_number': self.phone_number,
            'hours': self.hours,
            'business_type': self.business_type,
            'price': self.price,
            'url': self.url,
            'images': [business_image.to_dict() for business_image in self.business_images],
            'owner': self.owner.to_dict(),
            'all_reviews': [review.to_dict() for review in self.business_reviews],
            'num_reviews': len(self.business_reviews),
        }
