const express = require('express')
const app = express();
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
const expressSession = require('express-session')
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const contactController = require('./controllers/contact')
const aboutController = require('./controllers/about')
const registerController = require('./controllers/register')
const storeUserController = require('./controllers/storeUser')
const storeLoginController = require('./controllers/storeLogin')
const loginController = require('./controllers/login')
const logoutController = require('./controllers/logout')
const authMiddleware = require('./middlewares/authMiddleware')
const redurectAuthenticatedMiddleware = require('./middlewares/redirectAuthenticatedMiddleware')
//* MONGODB */
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

//* MIDDLEWARE - USE */
app.use(express.static('public'))
app.use(fileupload())
app.use(expressSession({
  secret: "keyboard cat"
}))

//* BODY PARSER */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//* EJS */
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log("App listening on port 3000");
})

global.loggedIn = null;
app.get("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
})


app.get("/", homeController)
app.get("/about", aboutController)
app.get("/contact", contactController)
app.get('/post/:id', getPostController)
app.get('/posts/new', authMiddleware, newPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/auth/register', redurectAuthenticatedMiddleware, registerController)
app.post('/users/register', redurectAuthenticatedMiddleware, storeUserController)
app.post('/users/login', redurectAuthenticatedMiddleware, storeLoginController);
app.get('/auth/login', redurectAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController)
app.use((req, res) => {
  res.render('notfound')
})

