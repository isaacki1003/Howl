from app.models import db, BusinessImages, environment, SCHEMA

def seed_business_images():
    thebc = BusinessImages(
        business_id=1,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/_0CFehunR55ZHvI5Wcz-AA/o.jpg",
        preview=True
    )
    panera = BusinessImages(
        business_id=2,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/XJ7tpujWoDpUWnPHSprcEg/o.jpg",
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
    sushiTaro = BusinessImages(
        business_id=5,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/m2GLJbP2cTi2kTb8L4owjQ/o.jpg",
        preview=True
    )
    carbone = BusinessImages(
        business_id=6,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/rnJccYsA1_I9P9X8K9FGHw/o.jpg",
        preview=True
    )
    theLobsterRoll = BusinessImages(
        business_id=7,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/q5vevyMl8FEO-mly8hh1wA/o.jpg",
        preview=True
    )
    theBao = BusinessImages(
        business_id=8,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/AD3DSey_ezw9qbWo95kxJg/o.jpg",
        preview=True
    )
    theCheesecakeFactory = BusinessImages(
        business_id=9,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/aWlJTzOBkUWgBFDxVD1LoA/o.jpg",
        preview=True
    )
    shakeShack = BusinessImages(
        business_id=10,
        url="https://s3-media0.fl.yelpcdn.com/bphoto/PWvW-MQvR8UTqENG15b0IA/o.jpg",
        preview=True
    )

    db.session.add(thebc)
    db.session.add(panera)
    db.session.add(luskin)
    db.session.add(appAcademy)
    db.session.add(sushiTaro)
    db.session.add(carbone)
    db.session.add(theLobsterRoll)
    db.session.add(theBao)
    db.session.add(theCheesecakeFactory)
    db.session.add(shakeShack)
    db.session.commit()

def undo_business_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.business_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM business_images")
    db.session.commit()
