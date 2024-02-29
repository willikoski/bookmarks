require('dotenv').config();
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10; // Increase salt rounds for better security
const jwt = require('jsonwebtoken');

const userSchema = new Schema ({
    name: { type: String, required: true },
    email: { type: String, unique: true, trim: true, lowercase: true, required: true },
    password: { type: String, trim: true, minLength: 5, required: true }, // Fix typo here
    bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Bookmark'}]
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    try {
        const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET);
    return token;
};

module.exports = model('User', userSchema);
