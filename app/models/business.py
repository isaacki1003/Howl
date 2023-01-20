from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .review import Review

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(60), nullable=False)
    address = db.Column(db.String(40), nullable=False)
    city = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(20), nullable=False)
    zip_code = db.Column(db.String(15), nullable=False)
    description = db.Column(db.String(250), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    hours = db.Column(db.String(400), nullable=False)
    business_type = db.Column(db.String(60), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    url = db.Column(db.String(50), nullable=True)

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
            'averageRating': self.average_rating(),
            'url': self.url,
            'images': [business_image.to_dict() for business_image in self.business_images],
            'owner': self.owner.to_dict(),
            'all_reviews': [review.to_dict() for review in self.business_reviews],
            'num_reviews': len(self.business_reviews),
        }

    def average_rating(self):
        if len(self.business_reviews) == 0:
            return 0
        else:
            return round(sum([review.stars for review in self.business_reviews]) / len(self.business_reviews), 2)

    def number_of_reviews(self):
        return len(self.business_reviews)

    def get_business_images(self):
        owner_image_urls = [each_image['url'] for each_image in [image.to_dict() for image in self.business_images]]
        review_images = [review.review_images for review in self.business_reviews]
        review_image_urls = [ image['url']  for review_images in review_images for image in review_images]
        images = owner_image_urls + review_image_urls
        return images

    def get_a_review(self):
        if self.business_reviews:
            return [review.to_dict() for review in self.business_reviews]
        return []
