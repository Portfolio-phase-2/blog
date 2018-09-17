process.env.NODE_ENV = 'test'
const app       = require('../app')

const chai      = require('chai')
const chaiHttp  = require('chai-http')
const expect    = chai.expect

const Article   = require('../models/article.model')
const Category  = require('../models/category.model')

chai.use(chaiHttp)

describe('Article CRUD Testing', function() {
    // hooks before each
    let uid = null
    let uidCat = null
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjlmNmE2YTY1MDVkMDQxOGFiODNjN2YiLCJuYW1lIjoiVGFsayBBc3J1bCIsImVtYWlsIjoidGFsa2FzcnVsQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUzNzE3NTA3Mn0.0yg8fRnWwK5NDcTxjbAh5XB-AO0H08gjwQITAw1uQHk'
    
    beforeEach(function(done) {
        Category.create({name: 'testing'})
        .then( response => {
            uidCat = response._id
            let newArticle = {
                title: 'ini cerita lama yang masih terasa baru',
                description: 'cerit ini memang sudah lama tapi rasanya masih baru, gak percaya? yaudah',
                category: uidCat
            }
            Article.create(newArticle, function(err, result){
                uid = result._id
                done()
            })
        })
        
    })

    afterEach(function(done) {
        Article.remove({_id:uid}, function(err, result){
            Category.remove({_id:uidCat}, function(err, result){
                done()
            })
        })
    })

    it('/GET article', function(done) {
        chai.request(app)
        .get('/articles')
        .end(function(err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('array')
            done()
        })
    })

    it('/POST article', function(done) {
        chai.request(app)
        .post('/articles')
        .set('token', token)
        .send({
            title: 'Buah Tangan dari Hacktiv8',
            body: 'Ini menceritakan kisah antara kedatangan aku dan kepergian aku dari hacktiv8 nantinya, tapi belum selesai certanya',
            category: 'testing'
        })
        .end(function(err, res) {
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            done()
        })
    })

    it('/PUT article', function(done) {
        chai.request(app)
        .put('/articles/'+uid)
        .set('token', token)
        .send({
            title: 'Berubah',
            body: 'Ini menceritakan kisah antara kedatangan aku dan kepergian aku dari hacktiv8 nantinya, tapi belum selesai certanya'
        })
        .end(function(err, res) {
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            done()
        })
    })

    it('/DELETE article', function(done) {
        chai.request(app)
        .delete('/articles/'+uid)
        .set('token', token)
        .send({
            title: 'Buah Tangan dari Hacktiv8',
            body: 'Ini menceritakan kisah antara kedatangan aku dan kepergian aku dari hacktiv8 nantinya, tapi belum selesai certanya',
            category: 'story'
        })
        .end(function(err, res) {
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            done()
        })
    })


})

