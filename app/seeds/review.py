from app.models import db, Review, environment, SCHEMA

def seed_reviews():
    thebc1 = Review(
        user_id=1,
        business_id=1,
        review="This is a great place to get a drink and hang out with friends. The staff is friendly and the drinks are great. I love the atmosphere and the music. I would definitely recommend this place to anyone looking for a good time.",
        stars=5
    )
    thebc2 = Review(
        user_id=2,
        business_id=1,
        review="I love this place! The staff is always friendly and the drinks are great. I love the atmosphere and the music. I would definitely recommend this place to anyone looking for a good time.",
        stars=5
    )
    thebc3 = Review(
        user_id=3,
        business_id=1,
        review="The food is amazing. Would definitely recommend this place to anyone looking for a good time.",
        stars=5
    )
    panera1 = Review(
        user_id=1,
        business_id=2,
        review="This place was alright. The food was good but the service was a little slow. I would definitely recommend this place to anyone looking for a good time.",
        stars=4
    )
    panera2 = Review(
        user_id=2,
        business_id=2,
        review="The food was heated in a microwave and the service was a little slow. I would definitely recommend this place to anyone looking for a good time. NOT!",
        stars=1
    )
    panera3 = Review(
        user_id=3,
        business_id=2,
        review="Isaac was so friendly and helpful but the food was cold! Not his fault!",
        stars=3
    )
    luskin1 = Review(
        user_id=1,
        business_id=3,
        review="Go to them for all your catering needs! They are the best!",
        stars=5
    )
    luskin2 = Review(
        user_id=2,
        business_id=3,
        review="I love this place! The staff is always friendly and the food is great. I love the atmosphere and the music. I would definitely recommend this place to anyone looking for a good time.",
        stars=4
    )
    luskin3 = Review(
        user_id=3,
        business_id=3,
        review="The place is so clean and nice! I loved the atmosphere and the music!",
        stars=5
    )

    db.session.add(thebc1)
    db.session.add(thebc2)
    db.session.add(thebc3)
    db.session.add(panera1)
    db.session.add(panera2)
    db.session.add(panera3)
    db.session.add(luskin1)
    db.session.add(luskin2)
    db.session.add(luskin3)
    db.session.commit()

def undo_reviews():
    if environment == 'production':
        db.session.execute(f'TRUNCATE {SCHEMA}.reviews RESTART IDENTITY CASCADE;')
    else:
        db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')

    db.session.commit()
