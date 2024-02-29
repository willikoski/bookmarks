require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const bcrypt = require('bcrypt')

// auth 

const auth = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const data = jwt.verify(token, process.env.SECRET);
      const user = await User.findOne({ _id: data._id });
      if (!user) {
        throw new Error();
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).send('Not authorized');
    }
  };

// signup
const signUp = async (req, res) => {
    try {
      const user = new User(req.body);
      const token = user.generateAuthToken();
      await user.save();
      res.status(201).send({ user, token });
    } catch (error) {
      res.status(400).send(error);
    }
  };
  

// login
const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            res.status(400).send('Invalid login credentials');
        } else {
            // Send user data and bookmarks to the client
            res.json({ user, bookmarks: user.bookmarks });
        }
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
};

const getBookmarksByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId; // Get the user ID from the request parameters
        const userBookmarks = await Bookmark.find({ userId: userId }); // Filter bookmarks by user ID
        res.json(userBookmarks);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

const respondWithToken = (req, res) => {
    res.json(res.locals.data.token)
}

const respondWithUser = (req, res) => {
    res.json(res.locals.data.user)
}

const respondWithBookmarks = (req, res) => {
    res.json(res.locals.data.bookmarks)
}

module.exports = {
    auth,
    signUp,
    login,
    getBookmarksByUser,
    respondWithToken,
    respondWithUser,
    respondWithBookmarks
}



/* Helper Function */
function createJWT(user){
    return jwt.sign({ user }, process.env.SECRET, { expiresIn: '48h' })
}