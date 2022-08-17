const router = require("express").Router();
const { response } = require("express");
const e = require("express");
const axios = require("axios").default;
const sequelize = require('../config/connection');

const {
  getContentData,
  getPopularContent,
  getTopRatedContent,
  createContentObj,
  searchContent,
} = require("../utils/tmdb-api");
const { User, Comment, Vote, Watchlist } = require("../models");

router.get("/", async (req, res) => {
  try {
    // makes several queries to the third party api for content
    const contentData = await Promise.all([
      getPopularContent("movie"),
      getTopRatedContent("movie"),
      getPopularContent("tv"),
      getTopRatedContent("tv"),
    ]);
    // loops through the results to format the data
    for (let x = 0; x < contentData.length; x++) {
      for (let y = 0; y < contentData[x].data.results.length; y++) {
        contentData[x].data.results[y] = createContentObj(
          contentData[x].data.results[y]
        );
      }
    }
    // renders the homepage with the results from the third-party
    res.render("homepage", {
      popMovies: contentData[0].data.results,
      topMovies: contentData[1].data.results,
      popTV: contentData[2].data.results,
      topTV: contentData[3].data.results,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.render("404-page");
  }
});

// creates the content pages for movies and tv series
router.get("/movie/:id", async (req, res) => {
  createContentPage(req, res, 'movie', req.params.id);
});

router.get("/tv/:id", async (req, res) => {
  createContentPage(req, res, 'tv', req.params.id);
});

// used by both the movie and tv routes for specific ids
async function createContentPage(req, res, type, id) {
  try {
    // queries for the third-party api for info on the specific piece of content, queries vote for the ratings, and queries comments for the comments on the piece of content
    let dataQuery = await Promise.all([
      getContentData(type, id),
      Vote.findAll({
        where: {
          content_type: type,
          content_id: req.params.id
        },
        attributes: [
          [sequelize.fn("AVG", sequelize.cast(sequelize.col('rating'), 'integer')), 'avg_rating']
        ]
      }),
      Vote.findOne({
        where: {
          user_id: req.session.user_id,
          content_type: type,
          content_id: req.params.id
        }
      }),
      Comment.findAll({
        where: {
          content_type: type,
          content_id: req.params.id,
        },
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      })
    ]);
    // converts the data from the api call to a more uniform format for us to use
    const content = createContentObj(dataQuery[0].data);
    // converts the query result to the data we want to use
    const votes = dataQuery[1].map((entry) => entry.get({ plain: true }));
    // Gets the avg_rating from the query or defaults to 0, parses the float and sets precision to round to first decimal place
    let avg_rating = votes[0].avg_rating ? votes[0].avg_rating : 0;
    avg_rating = parseFloat(avg_rating).toPrecision(2);
    let user_rating;
    if (dataQuery[2]) {
      const rating = dataQuery[2].get({ plain: true });
      user_rating = {
        rated: true,
        rating: rating.rating
      }
    }
    // converts query result for comments to the data we want to use
    const comments = dataQuery[3].map((entry) => entry.get({ plain: true }));
    // renders the content-page with the content info, comments, avg rating and whether the user is logged in
    res.render("content-page", {
      content,
      comments,
      avg_rating,
      user_rating,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.render("404-page");
  }
}

router.get("/watchlist", async (req, res) => {
  // if the user is not logged in, the will be directed to login page, otherwise directed to their specific id's page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    res.redirect("/watchlist/" + req.session.user_id);
  }
});

// route for the watchlist for the specific user id
router.get("/watchlist/:id", async (req, res) => {
  try {
    // query to get all the content in the watchlist for this id, a query for each status type
    const dbQuery = await Promise.all([
      User.findByPk(req.params.id, { attributes: { exclude: ["password"] } }),
      Watchlist.findAll({ where: { user_id: req.params.id, status: 0 } }),
      Watchlist.findAll({ where: { user_id: req.params.id, status: 1 } }),
      Watchlist.findAll({ where: { user_id: req.params.id, status: 2 } }),
    ]);
    // if the user does not exist
    if (!dbQuery[0]) {
      res.render("404-page", { message: "No user found with this id" });
      return;
    }
    // tells whether this is the page for the current user or not
    const isCurrentUser = (req.session.loggedIn) ? req.session.user_id == req.params.id : false;
    let watchlist = [];
    // sets the different watchlist elements and specifies whether user is the owner of the watchlist
    for (let x = 1; x < dbQuery.length; x++) {
      watchlist.push(dbQuery[x].map((entry) => entry.get({ plain: true })));
      for (let y = 0; y < watchlist[x - 1].length; y++) {
        watchlist[x - 1][y].isCurrentUser = isCurrentUser
      }
    }
    // renders watchlist page with different lists for each status, status of if the user is logged in, and whether they are the owner of this page
    res.render("watchlist", {
      plan_to_watch: watchlist[0],
      watching: watchlist[1],
      completed: watchlist[2],
      loggedIn: req.session.loggedIn,
      isCurrentUser
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// if the user is already logged in, will redirect to homepage
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// redirects to the homepage if user is already logged in
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

//search page
router.get("/search/:type/:query", async (req, res) => {
  try {
    // replaces + signs with spaces in the query
    const query = req.params.query.split("+").join(" ");
    // forces type to be either movie or tv
    let type = req.params.type === "movie" ? "movie" : "tv";
    // calls the function for the third party api
    const searchData = await searchContent(query, type);
    // loops through the returned data to convert to a more uniform format to use
    for (let y = 0; y < searchData.data.results.length; y++) {
      searchData.data.results[y] = createContentObj(searchData.data.results[y]);
    }

    // renders the search page with the results
    res.render("search", {
      searchContent: searchData.data.results,

      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.render("404-page");
  }
});

module.exports = router;
