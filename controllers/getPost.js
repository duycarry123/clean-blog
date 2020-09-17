const BlogPost = require('../model/BlogPost')

module.exports = (req, res) => {
    BlogPost.findById(req.params.id, (err, detailPost) => {
        res.render('post', {
            detailPost
        })
    })
}