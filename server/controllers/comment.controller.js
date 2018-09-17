const Comment = require('../models/comment.model')

module.exports = {

    createOne: (req, res) => {
        let newComment = {
            comment: req.body.comment,
            article: req.body.article,
            owner: req.decoded._id,
        }
        Comment.create(newComment)
        .then( response => res.status(201).json(response))
        .catch( err => res.status(500).json(err))
    },

    deleteById: (req, res) => {
        Comment.deleteOne({_id: req.params.id, owner: req.decoded._id})
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    }
}