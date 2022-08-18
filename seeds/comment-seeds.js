// seeds to create dummy data for the database for testing

const { Comment } = require('../models');

const commentdata = [
    {
        comment_text: 'Nunc rhoncus dui vel sem.',
        user_id: 1,
        content_id: 616037,
        content_type: 'movie'
    },
    {
        comment_text: 'Nunc rhoncus dui vel sem.',
        user_id: 6,
        content_id: 616037,
        content_type: 'movie'
    },
    {
        comment_text: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
        user_id: 6,
        content_id: 766507,
        content_type: 'movie'
    },
    {
        comment_text: 'Aliquam erat volutpat. In congue.',
        user_id: 3,
        content_id: 507086,
        content_type: 'movie'
    },
    {
        comment_text: 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
        user_id: 3,
        content_id: 438148,
        content_type: 'movie'
    },
    {
        comment_text: 'In hac habitasse platea dictumst.',
        user_id: 7,
        content_id: 361743,
        content_type: 'movie'
    },
    {
        comment_text: 'Vivamus vestibulum sagittis sapien.',
        user_id: 1,
        content_id: 585511,
        content_type: 'movie'
    },
    {
        comment_text: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
        user_id: 6,
        content_id: 756999,
        content_type: 'movie'
    },
    {
        comment_text: 'Sed vel enim sit amet nunc viverra dapibus.',
        user_id: 7,
        content_id: 718789,
        content_type: 'movie'
    },
    {
        comment_text: 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.',
        user_id: 6,
        content_id: 453395,
        content_type: 'movie'
    },
    {
        comment_text: 'Morbi a ipsum.',
        user_id: 6,
        content_id: 585511,
        content_type: 'movie'
    },

    {
        comment_text: 'Donec ut mauris eget massa tempor convallis.',
        user_id: 5,
        content_id: 718789,
        content_type: 'movie'
    },
    {
        comment_text:
            'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.',
        user_id: 2,
        content_id: 585511,
        content_type: 'movie'
    },
    {
        comment_text: 'Curabitur convallis.',
        user_id: 6,
        content_id: 718789,
        content_type: 'movie'
    },
    {
        comment_text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        user_id: 4,
        content_id: 507086,
        content_type: 'movie'
    },
    {
        comment_text: 'Morbi non quam nec dui luctus rutrum.',
        user_id: 3,
        content_id: 766507,
        content_type: 'movie'
    },
    {
        comment_text:
            'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.',
        user_id: 8,
        content_id: 507086,
        content_type: 'movie'
    },
    {
        comment_text: 'Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
        user_id: 4,
        content_id: 438148,
        content_type: 'movie'
    },
    {
        comment_text: 'Proin eu mi. Nulla ac enim.',
        user_id: 4,
        content_id: 507086,
        content_type: 'movie'
    },
    {
        comment_text: 'Sed ante. Vivamus tortor.',
        user_id: 7,
        content_id: 361743,
        content_type: 'movie'
    },
    {
        comment_text: 'Aliquam quis turpis eget elit sodales scelerisque.',
        user_id: 10,
        content_id: 616037,
        content_type: 'movie'
    },
    {
        comment_text: 'Maecenas ut massa quis augue luctus tincidunt.',
        user_id: 10,
        content_id: 766507,
        content_type: 'movie'
    },
    {
        comment_text: 'Etiam vel augue. Vestibulum rutrum rutrum neque.',
        user_id: 8,
        content_id: 361743,
        content_type: 'movie'
    },
    {
        comment_text:
            'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
        user_id: 5,
        content_id: 718789,
        content_type: 'movie'
    },
    {
        comment_text: 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.',
        user_id: 10,
        content_id: 616037,
        content_type: 'movie'
    },
    {
        comment_text: 'Proin risus. Praesent lectus.',
        user_id: 10,
        content_id: 616037,
        content_type: 'movie'
    },
    {
        comment_text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus.',
        user_id: 10,
        content_id: 453395,
        content_type: 'movie'
    }
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;