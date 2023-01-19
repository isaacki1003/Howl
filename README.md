# Howl
Howl is a clone of Yelp that allows users to create business pages and allows other users to leave their feedback by dropping a review. It provides a simple interface for creating businesses and reviews, also allowing users to view, edit, and delete any businesses and reviews they've created.

## Live Site: https://howl-qdy6.onrender.com/

## Wiki
* [User Stories](https://github.com/isaacki1003/Howl/wiki/User-Stories)
* [Database Schema](https://github.com/isaacki1003/Howl/wiki/Database-Diagram)
* [Feature List](https://github.com/isaacki1003/Howl/wiki/Features-List)
* [Wireframe](https://github.com/isaacki1003/Howl/wiki/Wireframe)

## Built With:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

# Features
## Businesses
View all Businesses (Home Page):
![view-all-businesses](https://user-images.githubusercontent.com/86988475/211367860-0c781c4e-f1b3-41e1-800b-5c8a7e930896.png)

View/Delete single Business (Business Page):
* Delete option if business if yours
![view-single-business](https://user-images.githubusercontent.com/86988475/211368309-2ec99d90-736d-4cef-8eb4-9b7f3b6aad75.png)

Create a Business:
![create-business](https://user-images.githubusercontent.com/86988475/211368437-88a74e6d-7514-4772-91c3-75156fc84dd1.png)

Edit a Business:
![edit-business](https://user-images.githubusercontent.com/86988475/211368665-3d171034-b275-47c4-9003-804b6c7a2de6.png)

## Reviews
View all Reviews (Business Page):
![view-business-reviews](https://user-images.githubusercontent.com/86988475/211368984-53fdcd34-6473-4bec-bff9-ee8c3c84246a.png)

Create a Review:
![create-review](https://user-images.githubusercontent.com/86988475/211369325-080f8972-0f76-4f7a-914d-3550eebe5b6b.png)

Edit/Delete a Review:
![edit-review](https://user-images.githubusercontent.com/86988475/211369144-291f984c-3430-4827-a31f-e28e311a3a4b.png)

# Future Offerings
* Search
* Google Maps
* Likes


# Setup
* Clone repo [here](https://github.com/isaacki1003/Howl)
* CD into the app directory and run `pipenv install` to install back-end dependencies
* Run `flask db upgrade` to run migrations and `flask seed all` to seed database
* Run `flask run` to start server
* CD in the react-app directory and run `npm install` to install front-end dependencies
* Run `npm start`
