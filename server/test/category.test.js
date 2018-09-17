process.env.NODE_ENV = 'test'
const app       = require('../app')

const chai      = require('chai')
const chaiHttp  = require('chai-http')
const expect    = chai.expect

const Category   = require('../models/category.model')

chai.use(chaiHttp)

describe('Category CRUD Testing', function() {

    let uid = null
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjlmNmE2YTY1MDVkMDQxOGFiODNjN2YiLCJuYW1lIjoiVGFsayBBc3J1bCIsImVtYWlsIjoidGFsa2FzcnVsQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTUzNzE3NTA3Mn0.0yg8fRnWwK5NDcTxjbAh5XB-AO0H08gjwQITAw1uQHk'
    let newCategory = {
        name: 'lifestyle'
    }

    beforeEach(function(done) {
        Category.create(newCategory, function(err, result){
            uid = result._id
            done()
        })
    })

    afterEach(function(done) {
        Category.deleteOne({_id:uid}, function(err, result){
            done()
        })
    })

    it('/POST categories', function(done) {
        chai.request(app)
        .post('/categories')
        .send(newCategory)
        .set('token', token)
        .end(function(err, res) {
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            Category.deleteOne({_id: res.body._id}, function(err, result) {
                done()
            })
        })
    })

    it('/GET categories', function(done) {
        chai.request(app)
        .get('/categories')
        .end(function(err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a('array')
            done()
        })
    })

    it('/GET categories id', function(done) {
        chai.request(app)
        .get('/categories/'+uid)
        .end(function(err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            done()
        })
    })

})

