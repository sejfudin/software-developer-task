# Movies/Shows Search App

This is my solution to the task I received from Mistral.

# Application's main features:
- Show top 10 movies
- Show top 10 shows
- OAuth authentication
- Movie/Show rating
- Only logged in user can rate a movie/show
- User can rate certain movie/show just once
- Movies/Shows searching
- Load more button
- Log out

Search functionality is the core functionality of this application.<br />
User can use searching by:
  - title
  - crew member
  - year
  - rating

in addition to the standard search, the application also recognizes certain phrases:
  
  - after year
  - before year
  - older than year
  - younger than year
  - numberOfStars stars
  - at least numberOfStars stars
  - less than numberOfStars stars
  - more than numberOfStars stars

# Used Technologies:
1. React - frontend
2. NodeJs/Express - backend
3. MongoDB - database

# Used Frontend Libraries:
1. create-react-app - create react app
2. axios - fetching data
3. redux - global state management
4. redux-thunk - middleware
5. redux-devtools-extension - debugging application's state
6. bootstrap - style
7. react-rating-stars-component - rating movies
8. bootstrap-switch-button-react - toggle button
9. react-google-login - OAuth login
10. jwt-decode - decoding JWT token
11. is-empty - Check whether a value is empty

# Used Backend Libraries
1. axios - fetching data
2. cors - cross origin communication
3. dotenv - storing secret data
4. express - node framework
5. google-auth-library - OAuth login
6. jsonwebtoken - for token
7. mongoose - communications with MongoDB

# Database
- Database seeded with data from external API https://imdb-api.com/api
- Database can be seeded again as fallows:
1. Navigate to server folder
2. Execute `npm run seed`
3. Seeding process will be finished and process will be killed automatically

Note: With every new seed previous data from database will be erased

## How to clone, install and start the aplication
To get a local copy up and running follow these simple steps:

1. Clone the repository

### `git clone https://github.com/sejfudin/software-developer-task.git`

2. Install NPM packages
- Go to client folder and run `npm install`

- Go to server folder and run `npm install`

3. Start the project

- Go to server folder and run `npm start`

- Go to client folder and run `npm start`
