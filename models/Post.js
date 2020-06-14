const mongoose = require('mongoose')
const date = Date.now()
const PostSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: date },
    id: { type: Number, required: true }

})
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Post', PostSchema)

