// seeds to create dummy data for the database for testing

const seedUsers = require('./user-seeds');
const seedWatchlist = require('./watchlist-seeds');
const seedComments = require('./comment-seeds');
const seedVotes = require('./vote-seeds')

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await seedUsers();
    console.log('--------------');

    await seedComments();
    console.log('--------------');

    await seedWatchlist();
    console.log('--------------');

    await seedVotes();
    console.log('--------------');

    process.exit(0);
};

seedAll();
