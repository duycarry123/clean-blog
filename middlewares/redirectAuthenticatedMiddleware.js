module.exports = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/') // if user logged in, redirect home page
    }
    next();
}