const { Schema, model } = require('mongoose')

const bookmarkSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    color: { type: String } 
}, {
    timestamps: true
})


module.exports = model('Bookmark', bookmarkSchema)