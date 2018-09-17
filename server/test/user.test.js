process.env.NODE_ENV = 'test'
const app       = require('../app')

const chai      = require('chai')
const chaiHttp  = require('chai-http')
const expect    = chai.expect

const User   = require('../models/user.model')

chai.use(chaiHttp)

describe('User CRUD Testing', function() {

    let uid = null
    let newUser = {
        name: 'Asrul Harahap',
        email: 'padangjs@gmail.com',
        password: '12345678'
    }

    let user = {
        name: 'Talk Asrul',
        email: 'talkasrul@gmail.com',
        password: '12345678'
    }

    beforeEach(function(done) {
        User.create(user, function(err, result){
            done()
        })
    })

    afterEach(function(done) {
        User.deleteOne({_id:uid}, function(err, result){
            done()
        })
    })

    it('/POST User Sign Up', function(done) {
        chai.request(app)
        .post('/users/signup')
        .send(newUser)
        .end(function(err, res) {
            uid = res.body._id
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            done()
        })
    })

    it('/POST User Sign In', function(done) {
        chai.request(app)
        .post('/users/signin')
        .send({email: 'talkasrul@gmail.com', password: '12345678'})
        .end(function(err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            done()
        })
    })

})

