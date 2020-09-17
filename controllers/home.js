const BlogPost = require('../model/BlogPost')
module.exports = (req, res) => {
    BlogPost.find({}, (err, posts) => {
        res.render('index', {
            blogposts: posts
        })
    })
}