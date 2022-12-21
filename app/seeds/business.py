from app.models import db, Business, environment, SCHEMA

def seed_businesses():
    theBoilingCrab = Business(
        owner_id=1,
        name='The Boiling Crab',
        address='10875 Kinross Ave',
        city='Los Angeles',
        state='CA',
        country='USA',
        zip_code='90024',
        description='Casual seafood restaurant that serves a variety of fresh seafood',
        phone_number='(310) 208-4888',
        hours='Mon-15:00-22:00,Tue-15:00-22:00,Wed-15:00-22:00,Thu-15:00-22:00,Fri-15:00-22:00:30,Sat-12:00-22:00,Sun-12:00-22:00',
        business_type='Seafood, Cajun/Creole',
        price=50,
        url='https://www.theboilingcrab.com',
    )

    paneraBread = Business(
        owner_id=2,
        name='Panera Bread',
        address='10990 Jefferson Blvd',
        city='Los Angeles',
        state='CA',
        country='USA',
        zip_code='90230',
        description='American chain store of bakery-café fast casual restaurants with over 2,000 locations.',
        phone_number='(310) 390-3763',
        hours='Mon-06:00-22:00,Tue-06:00-22:00,Wed-06:00-22:00,Thu-06:00-22:00,Fri-06:00-22:00:30,Sat-06:00-22:00,Sun-06:00-22:00',
        business_type='Sandwiches, Salads, Soup',
        price=20,
        url='https://www.panerabread.com',
    )

    theLuskinConferenceCenter = Business(
        owner_id=3,
        name='The Luskin Conference Center',
        address='425 Westwood Plaza',
        city='Los Angeles',
        state='CA',
        country='USA',
        zip_code='90095',
        description='Conference center that holds events and meetings for UCLA students and faculty.',
        phone_number='(855) 522-8252',
        hours='Mon-00:00-23:59,Tue-00:00-23:59,Wed-00:00-23:59,Thu-00:00-23:59,Fri-00:00-23:59:30,Sat-00:00-23:59,Sun-00:00-23:59',
        business_type='Buffet, Catering, Conference Center',
        price=70,
        url='https://luskinconferencecenter.ucla.edu/',
    )

    db.session.add(theBoilingCrab)
    db.session.add(paneraBread)
    db.session.add(theLuskinConferenceCenter)
    db.session.commit()


def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM businesses")

    db.session.commit()
