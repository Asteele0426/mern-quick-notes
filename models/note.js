const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const noteSchema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);