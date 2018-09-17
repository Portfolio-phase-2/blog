const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({ 
    title: String,
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    deleteAt: { type: Date, default: null},    
}, { timestamps:true })

articleSchema.pre('save', function(next) {
    this.model('User').updateOne(
        {_id: req.decoded._id}, 
        {$push: {articles: this._id}}
    )
    this.model('category').updateOne(
        {_id: this.category}, 
        {$push: {articles: this._id}}
    )
    next()
})

articleSchema.pre('remove', function(next) {
    this.model('User').updateOne(
        {_id: req.decoded._id}, 
        {$pull: {articles: this._id}}
    )
    this.model('category').updateOne(
        {_id: this.category}, 
        {$pull: {articles: this._id}}
    )
    next()
})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article

// By Asrul Harahap - 2018