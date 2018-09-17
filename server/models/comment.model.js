const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({ 
    comment: String,
    article: { type: Schema.Types.ObjectId, ref: 'Article' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    deleteAt: { type: Date, default: null},    
}, { timestamps:true })

commentSchema.pre('save', function(next) {
    this.model('Article').updateOne(
        {_id: this.article}, 
        {$push: {comments: this._id}}
    )
    next()
})

commentSchema.pre('remove', function(next) {
    this.model('Article').updateOne(
        {_id: this.article}, 
        {$pull: {comments: this._id}}
    )
    next()
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment

// By Asrul Harahap - 2018