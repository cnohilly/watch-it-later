const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');



module.exports = router;
