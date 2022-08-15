const User = require('./User');
const Comment = require('./Comment');
const Vote = require('./Vote');
const Watchlist = require('./Watchlist');

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Watchlist, {
    foreignKey: 'user_id'
});

Watchlist.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});


module.exports = { User, Comment, Vote, Watchlist };