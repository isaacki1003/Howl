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
        hours='Mon-15:00-22:00,Tue-15:00-22:00,Wed-15:00-22:00,Thu-15:00-22:00,Fri-15:00-22:00,Sat-12:00-22:00,Sun-12:00-22:00',
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
        hours='Mon-06:00-22:00,Tue-06:00-22:00,Wed-06:00-22:00,Thu-06:00-22:00,Fri-06:00-22:00,Sat-06:00-22:00,Sun-06:00-22:00',
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
        hours='Mon-00:00-23:59,Tue-00:00-23:59,Wed-00:00-23:59,Thu-00:00-23:59,Fri-00:00-23:59,Sat-00:00-23:59,Sun-00:00-23:59',
        business_type='Buffet, Catering, Conference Center',
        price=70,
        url='https://luskinconferencecenter.ucla.edu/',
    )

    appAcademy = Business(
        owner_id=3,
        name='App Academy',
        address='10880 Wilshire Blvd',
        city='Los Angeles',
        state='CA',
        country='USA',
        zip_code='90024',
        description='App Academy is a full-stack software engineering program that teaches students how to code.',
        phone_number='(310) 208-4888',
        hours='Mon-00:00-23:59,Tue-00:00-23:59,Wed-00:00-23:59,Thu-00:00-23:59,Fri-00:00-23:59,Sat-00:00-23:59,Sun-00:00-23:59',
        business_type='Coding Bootcamp',
        price=100,
        url='https://www.appacademy.io/',
    )

    sushiTaro = Business(
        owner_id=2,
        name='Sushi Taro',
        address='1503 17th St NW',
        city='Washington',
        state='DC',
        country='USA',
        zip_code='20036',
        description='Fine dining Japanese restaurant that serves traditional and modern sushi, sashimi, and other dishes',
        phone_number='(202) 462-8999',
        hours='Mon-12:00-14:30,Tue-12:00-14:30,Wed-12:00-14:30,Thu-12:00-14:30,Fri-12:00-14:30,Sat-17:30-22:00,Sun-17:30-22:00',
        business_type='Japanese, Sushi',
        price=200,
        url='https://www.sushitaro.com',
    )

    carbone = Business(
        owner_id=3,
        name='Carbone',
        address='181 Thompson St',
        city='New York',
        state='NY',
        country='USA',
        zip_code='10012',
        description='Luxurious Italian-American restaurant that serves classic dishes with a modern twist',
        phone_number='(212) 254-3000',
        hours='Mon-17:30-22:00,Tue-17:30-22:00,Wed-17:30-22:00,Thu-17:30-22:00,Fri-12:00-14:00,Fri-17:30-22:00,Sat-12:00-14:00,Sat-17:30-22:00,Sun-12:00-14:00,Sun-17:30-22:00',
        business_type='Italian, American',
        price=150,
        url='https://www.carbonenewyork.com',
    )

    theLobsterRoll = Business(
        owner_id=2,
        name='The Lobster Roll',
        address='1980 Montauk Hwy',
        city='Amagansett',
        state='NY',
        country='USA',
        zip_code='11930',
        description='Seafood shack that serves lobster rolls, clam chowder, and other New England-style dishes',
        phone_number='(631) 267-3740',
        hours='Mon-10:00-20:00,Tue-10:00-20:00,Wed-10:00-20:00,Thu-10:00-20:00,Fri-10:00-20:00,Sat-10:00-20:00,Sun-10:00-20:00',
        business_type='Seafood',
        price=50,
        url='https://www.thelobsterroll.com',
    )

    theBao = Business(
        owner_id=3,
        name='The Bao',
        address='611 N Broadway',
        city='Los Angeles',
        state='CA',
        country='USA',
        zip_code='90012',
        description='Casual Chinese restaurant that specializes in steamed buns and other street food-style dishes',
        phone_number='(213) 935-8677',
        hours='Mon-11:00-22:00,Tue-11:00-22:00,Wed-11:00-22:00,Thu-11:00-22:00,Fri-11:00-22:00,Sat-11:00-22:00,Sun-11:00-22:00',
        business_type='Chinese, Street Food',
        price=30,
        url='https://www.thebaola.com',
    )

    theCheesecakeFactory = Business(
        owner_id=1,
        name='The Cheesecake Factory',
        address='189 The Grove Dr',
        city='Los Angeles',
        state='CA',
        country='USA',
        zip_code='90036',
        description='Casual dining chain that serves a variety of dishes, including burgers, pasta, seafood, and, of course, cheesecake',
        phone_number='(323) 930-2820',
        hours='Mon-11:00-23:00,Tue-11:00-23:00,Wed-11:00-23:00,Thu-11:00-23:00,Fri-11:00-00:00,Sat-10:00-00:00,Sun-10:00-23:00',
        business_type='American, Dessert',
        price=50,
        url='https://www.thecheesecakefactory.com',
    )

    shakeShack= Business(
        owner_id=1,
        name='Shake Shack',
        address='1564 Broadway',
        city='New York',
        state='NY',
        country='USA',
        zip_code='10036',
        description='Casual fast food chain that serves burgers, hot dogs, shakes, and other American favorites',
        phone_number='(212) 918-0106',
        hours='Mon-11:00-00:00,Tue-11:00-00:00,Wed-11:00-00:00,Thu-11:00-00:00,Fri-11:00-01:00,Sat-10:00-01:00,Sun-10:00-00:00',
        business_type='Fast Food, American',
        price=30,
        url='https://www.shakeshack.com',
    )

    db.session.add(theBoilingCrab)
    db.session.add(paneraBread)
    db.session.add(theLuskinConferenceCenter)
    db.session.add(appAcademy)
    db.session.add(sushiTaro)
    db.session.add(carbone)
    db.session.add(theLobsterRoll)
    db.session.add(theBao)
    db.session.add(theCheesecakeFactory)
    db.session.add(shakeShack)
    db.session.commit()


def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM businesses")

    db.session.commit()
