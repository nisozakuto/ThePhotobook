# ThePhotobook
Photobook app, connecting clients with the Photographers. 
Client's photographer will send you the pictures through this application. Client will be able to go into the brand new album, browse through the old albums, like, delete the photos that they like.

## Getting Started

Once you clone this to your local machine, make sure to run `npm install`, create your secret key and add your PEXEL's API key to your .env file.

# Heroku Link
Continuous integration implemented
- Staging App: https://secure-crag-66782.herokuapp.com/
- Production App: https://thephotobook.herokuapp.com/


## Wireframes
Please follow this link for the wireframes: https://www.figma.com/file/LFQLAejWD4ZWxUuVTjdRXd/Untitled?node-id=0%3A1



## Routes
- GET /

Users related
- POST /users/new
- GET /auth/login

Albums/Pictures
- GET /albums
- POST /albums
- GET /albums/:id
- GET /photos/:id

## DB Schema 

[Schema](https://imgur.com/7NQtBec)

## Built with
- Node JS
- Express JS
- Postgress
- PEXEL's API

## Authors
- Niso Zakuta 

If you would like to contribute, please create a PR.




