const Comment = require('../models/comment.model')

module.exports = {

    createOne: (req, res) => {
        let newComment = {
            comment: req.body.comment,
            article: req.params.article,
            owner: req.decoded._id,
        }
        let comment = new Comment(newComment)
        comment.save()
        .then( response => res.status(201).json(response))
        .catch( err => res.status(500).json(err))
    },

    deleteById: (req, res) => {
        Comment.findById({_id: req.params.id, owner: req.decoded._id})
        .then(result => {
            let comment = new Comment({_id: result._id})
            comment.remove()
            .then( response => res.status(200).json(response))
            .catch( err => res.status(500).json(err))
        })
        .catch( err => res.status(500).json(err))
    }
}
