from app.models import db, BusinessImages, environment, SCHEMA

def seed_business_images():
    thebc = BusinessImages(
        business_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/_0CFehunR55ZHvI5Wcz-AA/o.jpg",
        preview=True
    )
    panera = BusinessImages(
        business_id=2,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/1jVtCzgdcw0RQ-0qzQ2WWQ/o.jpg",
        preview=True
    )
    luskin = BusinessImages(
        business_id=3,
        url="https://luskinconferencecenter.ucla.edu/wp-content/uploads/2016/11/front-entry-lg.jpg",
        preview=True
    )
    appAcademy = BusinessImages(
        business_id=4,
        url="https://imageio.forbes.com/blogs-images/forbestechcouncil/files/2019/01/canva-photo-editor-8-7.jpg?format=jpg&width=960",
        preview=True
    )

    db.session.add(thebc)
    db.session.add(panera)
    db.session.add(luskin)
    db.session.add(appAcademy)
    db.session.commit()

def undo_business_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.business_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM business_images")
    db.session.commit()
