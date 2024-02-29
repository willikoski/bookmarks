const express = require('express');
const router = express.Router();
const bookmarkCtrl = require('../../controllers/api/bookmarks');
const auth = require('../../controllers/api/users').auth; // Import the auth middleware

// INDEX Bookmarks as User
router.get('/', bookmarkCtrl.index, bookmarkCtrl.respondWithBookmarks);

// DELETE Bookmarks as User
router.delete('/:id', bookmarkCtrl.destroy, bookmarkCtrl.respondWithBookmark);

// UPDATE Bookmarks as User
router.put('/:id', bookmarkCtrl.update, bookmarkCtrl.respondWithBookmark);

// CREATE Bookmark as User
router.post('/',  bookmarkCtrl.create, bookmarkCtrl.respondWithBookmark);

module.exports = router;