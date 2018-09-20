const Article = require('../models/article.model')

module.exports = {

    createOne: (req, res) => {
        let newArticle = {
            title: req.body.title,
            description: req.body.description,
            owner: req.decoded._id,
            category: req.body.category
        }
        let article = new Article(newArticle)
        article.save()
        .then( response => res.status(201).json(response))
        .catch( err => res.status(500).json(err))
    },

    getAll: (req, res) => {
        Article.find({})
        .populate('owner')
        .populate('category')
        .populate({ 
            path: 'comments',
            populate: {path: 'owner'} 
         })
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    },

    getAllMine: (req, res) => {
        Article.find({owner: req.decoded._id})
        .populate('owner')
        .populate('category')
        .populate({ 
            path: 'comments',
            populate: {path: 'owner'} 
         })
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    },

    getById: (req, res) => {
        Article.findById({_id: req.params.id})
        .populate('owner')
        .populate('category')
        .populate({ 
            path: 'comments',
            populate: {path: 'owner'} 
         })
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    },

    putById: (req, res) => {
        Article.findById({_id:req.params.id, owner: req.decoded._id})
        .populate('owner')
        .populate('category')
        .populate({ 
            path: 'comments',
            populate: {path: 'owner'} 
         })
        .then( oldArticle => {
            let dataArticle = {
                title: req.body.title || oldArticle.title,
                description: req.body.description || oldArticle.description,
            }
            Article.updateOne({_id: req.params.id}, dataArticle)
            .then( response => res.status(200).json(response))
            .catch( err => res.status(500).json(err))
        })
        .catch( err => res.status(500).json(err))
    },

    deleteById: (req, res) => {
        Article.findById({_id:req.params.id, owner: req.decoded._id})
        .then(result => {
            let article = new Article({_id: result._id})
            article.remove()
            .then( response => res.status(200).json(response))
            .catch( err => res.status(500).json(err))
        })
        .catch( err => res.status(500).json(err))
    }
}