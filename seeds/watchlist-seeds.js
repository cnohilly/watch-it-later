const sequelize = require('../config/connection');
const { Watchlist } = require('../models');

const watchlistData = [
    {
        id: 1,
        user_id: 1,
        content_id: 616037,
        content_type: 'movie',
        poster_path: 'https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
        release_year: 2022,
        status: 0
    },
    {
        id: 3,
        user_id: 1,
        content_id: 766507,
        content_type: 'movie',
        poster_path: 'https://image.tmdb.org/t/p/w500/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg',
        release_year: 2022,
        status: 0
    },
    {
        id: 5,
        user_id: 1,
        content_id: 507086,
        content_type: 'movie',
        poster_path: 'https://image.tmdb.org/t/p/w500/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg',
        release_year: 2022,
        status: 0
    },
    {
        id: 6,
        user_id: 1,
        content_id: 438148,
        content_type: 'movie',
        poster_path: 'https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg',
        release_year: 2022,
        status: 0
    },
    {
        id: 7,
        user_id: 1,
        content_id: 361743,
        content_type: 'movie',
        poster_path: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
        release_year: 2022,
        status: 0
    },
    {
        id: 8,
        user_id: 1,
        content_id: 585511,
        content_type: 'movie',
        poster_path: 'https://image.tmdb.org/t/p/w500/1HOYvwGFioUFL58UVvDRG6beEDm.jpg',
        release_year: 2022,
        status: 0
    },
    {
        id: 9,
        user_id: 1,
        content_id: 756999,
        content_type: 'movie',
        poster_path: 'https://image.tmdb.org/t/p/w500/p9ZUzCyy9wRTDuuQexkQ78R2BgF.jpg',
        release_year: 2022,
        status: 0
    },
    {
        id: 10,
        user_id: 1,
        content_id: 718789,
        content_type: 'movie',
        poster_path: 'https://image.tmdb.org/t/p/w500/ox4goZd956BxqJH6iLwhWPL9ct4.jpg',
        release_year: 2022,
        status: 0
    },
    {
        id: 11,
        user_id: 1,
        content_id: 453395,
        content_type: 'movie',
        poster_path: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
        release_year: 2022,
        status: 0
    }
];

const seedWatchlist = () => Watchlist.bulkCreate(watchlistData, { individualHooks: true });

module.exports = seedWatchlist;