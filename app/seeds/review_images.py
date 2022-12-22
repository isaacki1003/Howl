from app.models import db, ReviewImages, environment, SCHEMA

def seed_review_images():
    thebc1 = ReviewImages(
        review_id=1,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/6aZTzeKn0VngP_GFNPB5sw/o.jpg'
    )
    thebc2 = ReviewImages(
        review_id=2,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/2Jm8Gfp94_EhSA0l_Uhh-g/o.jpg'
    )
    thebc3 = ReviewImages(
        review_id=3,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/YFnElmoTr9cscYRAzHfbRw/o.jpg'
    )
    panera1 = ReviewImages(
        review_id=4,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/01cL_cJiQgBqsrlaG7n8gw/o.jpg'
    )
    panera2 = ReviewImages(
        review_id=5,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/WF_Ahu1ZUWu8OLXLVSY_EA/o.jpg'
    )
    panera3 = ReviewImages(
        review_id=6,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/c9ddxGsDZgLI4JoF73gMUA/o.jpg'
    )
    luskin1 = ReviewImages(
        review_id=7,
        url='https://luskinconferencecenter.ucla.edu/wp-content/uploads/2014/06/gallery-university-suite-1200r.jpg'
    )
    luskin2 = ReviewImages(
        review_id=8,
        url='https://luskinconferencecenter.ucla.edu/wp-content/uploads/2015/11/gallery-powell.jpg'
    )
    luskin3 = ReviewImages(
        review_id=9,
        url='https://luskinconferencecenter.ucla.edu/wp-content/uploads/2018/05/presidential-suite-master-bedroom.jpg'
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

def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM review_images")
    db.session.commit()
