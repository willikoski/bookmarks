require('dotenv').config()
const Bookmark = require('../../models/bookmark')
const User = require('../../models/user')

/****** C - Create *******/
async function create(req, res, next){
    try {
        const bookmark = await Bookmark.create(req.body)

        res.locals.data.bookmark = bookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

/****** R - Read *****/
async function index(_ ,res,next) {
    try {
        const bookmarks = await Bookmark.find({})
        res.locals.data.bookmarks = bookmarks
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


/****** U - Update *****/
async function update(req ,res,next) {
    try {
        const bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.locals.data.bookmark = bookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

/***** D - destroy/delete *****/
async function destroy(req ,res,next) {
    try {
        const bookmark = await Bookmark.findByIdAndDelete(req.params.id)
        res.locals.data.bookmark = bookmark
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// jsonBookmarks jsonBookmark
// viewControllers

function respondWithBookmarks (_, res) {
    res.json(res.locals.data.bookmarks)
}

const respondWithBookmark = (req, res) => {
    res.json(res.locals.data.bookmark)
}

module.exports = {
    create,
    index,
    update,
    destroy,
    respondWithBookmarks,
    respondWithBookmark
}