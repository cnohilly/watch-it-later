# Watch It Later

[![License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)

## Description

Check out the links section for the link to the deployed application on Heroku!

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Screenshots](#screenshots)
* [Technologies Used](#technologies-used)
* [Credits](#credits)
* [Links](#links)
* [License](#license)

## Installation

To install this application on your local machine:

- Clone the application's repository and place it into a local directory on your computer.
- Ensure that your computer has node.js installed. To check the current version installed, type:
```
    node -v
```
- Ensure that MySQL is installed on your computer.
- Open a command-line interface (VS Code, Git Bash, etc.) and navigate to the directory containing the application's server.js.
- In the command-line, download the application's dependencies by typing: 
```
    npm install
```
- Create an .env file in the root directory and input the following into the file while using your own username and password:
```
    DB_NAME='watch_it_later_db'
    DB_USER='your_username'
    DB_PASSWORD='your_password'
```
- Type the following command into the terminal to start the MySQL Shell. When prompted, input your password for the MySQL Shell to connect to the database.
```
    mysql -u root -p 
```
- While in the MySQL Shell, create the database by typing: 
```
    source db/schema.sql
```
- To exit the MySQL Shell, type:
```
    quit
```
- To seed data into the database, type:
```
    npm run seed
```

## Usage

- To start the server, type the following command:
```
npm start
```
- While the server is running, open a web browser and navigate to http://localhost:3001/
- Sign up as a new user or log in as an existing user in the upper right of the navigation bar to add movies and TV shows to your watchlist and add comments.
- On the homepage, a list of popular and top rated movies and TV shows will appear and clicking on a card will take you a content page displaying the info of the movie or TV show and the number of comments.
- In the navigation bar on the top of the page is a search bar allowing you to search for a movie or TV show. Select either a moive or TV show from the dropdown and input a title into the search field. A search results page will display the movies or TV shows matching the user input.
- On the content page, if you are logged in, you can add the title to their watchlist by selecting the green dropdown button below the poster and selecting the status of that title.
- You can rate a title by clicking on one of the stars below the poster. The content page will update with the average user rating.
- You can also leave a comment by filling out the comment form field and clicking on the post comment button. The page will automaticaly update with the new comments appearing below the form.
- Clicking on the dashboard link in the navigation bar will take you to your dashboard and allow them to add a profile picture, update their username, password, and email, and view the comments they have made.
- Clicking on the watchlist link in the navigation bar will take you to your personal watchlist with all the movies and TV shows that you added. To change the status of a card or remove a card from you watchlist, click on the button at the bottom of a card and select an option from the dropdown.
- To log out of your account, click on the logout button on the upper right of the navigation bar.

## Screenshots

The following images demonstrate the application's appearance and functionality:

## Technologies Used

- Node.js and Express.js
- Handlebars.js
- MySQL
- Sequelize ORM for the database
- Express-Session
- Bcrypt
- Axios
- Bulma (CSS Framework)
- Animate.css (CSS animation library)

## Credits

Special thanks to these developers for making this project possible:

- [cnohilly](https://github.com/cnohilly)
- [kt946](https://github.com/kt946)
- [StephonT](https://github.com/StephonT)
- [braulioloaizac](https://github.com/braulioloaizac)
- [ianzyvith](https://github.com/ianzyvith)

## Links

- [Link to deployed application on Heroku](https://watch-it-later.herokuapp.com/)

- [Link to GitHub repository](https://github.com/cnohilly/watch-it-later)

## License

This application is covered under the [MIT](https://opensource.org/licenses/MIT) License.