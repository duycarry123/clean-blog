const BlogPost = require('../model/BlogPost')
const path = require('path')
module.exports = (req, res) => {
    if (req.files !== null) {
        // path.resolve: Resolve một đường dẫn tuyệt đối.
        // The directory name of the current module. This is the same as the path.dirname() of the __filename.
        // image.mv:  A function to move the file elsewhere on your server. Can take a callback or return a promise.
        let image = req.files.image;
        image.mv('public/upload/'+image.name, function (error) {
            BlogPost.create({
                ...req.body,
                image: '/upload/' + image.name
            }, function (err) {
                res.redirect('/')
            })
        })
    } else {
        res.redirect('/posts/new')
    }
}