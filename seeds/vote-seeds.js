const sequelize = require('../config/connection');
const { Vote } = require('../models');
616037
766507
507086
438148
361743
585511
756999
const votedata = [
    {
        user_id: 1,
        content_type: 'movie',
        content_id: 616037,
        rating: 5
    },
    {
        user_id: 2,
        content_type: 'movie',
        content_id: 766507,
        rating: 2
    },
    {
        user_id: 3,
        content_type: 'movie',
        content_id: 507086,
        rating: 3
    },
    {
        user_id: 4,
        content_type: 'movie',
        content_id: 438148,
        rating: 4
    },
    {
        user_id: 5,
        content_type: 'movie',
        content_id: 361743,
        rating: 4
    },
    {
        user_id: 6,
        content_type: 'movie',
        content_id: 585511,
        rating: 3
    },
    {
        user_id: 7,
        content_type: 'movie',
        content_id: 756999,
        rating: 2
    },
    {
        user_id: 8,
        content_type: 'movie',
        content_id: 756999,
        rating: 3
    },
    {
        user_id: 3,
        content_type: 'movie',
        content_id: 756999,
        rating: 4
    },
    {
        user_id: 3,
        content_type: 'tv',
        content_id: 756999,
        rating: 4
    },
];

const seedVotes = () => Vote.bulkCreate(votedata, { individualHooks: true });

module.exports = seedVotes;
