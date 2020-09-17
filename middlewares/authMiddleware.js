const User = require('../model/UserModel')
module.exports = (req, res, next) => {
    User.findById(req.session.userId, (err, user) => {
        if (err || !user) {
            return res.redirect('/auth/login');
        }
        next();
    })
}