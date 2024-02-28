const { Schema, model } = require('mongoose')

const bookmarkSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, required: true, default: 'All' }, // Add category field
    isImportant: { type: Boolean, default: false },
    isVisible: { type: Boolean, default: false },
    color: { type: String } 
}, {
    timestamps: true
})

module.exports = model('Bookmark', bookmarkSchema)