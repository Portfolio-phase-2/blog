// process.env.NODE_ENV = 'test'
// const app       = require('../app')

// const chai      = require('chai')
// const chaiHttp  = require('chai-http')
// const expect    = chai.expect

// const Article   = require('../models/article.model')

// chai.use(chaiHttp)

// describe('Article CRUD Testing', function() {
//     // hooks before each
//     let uid = null
//     beforeEach(function(done) {
//         Article.create({name: 'aaaa'}, function(err, category){
//             uid = category
//             done()
//         })
//     })

//     afterEach(function(done) {
//         category.remove({}, function(done){
//             done()
//         })
//     })

//     it('/GET article', function(done) {
//         chai.request(app)
//         .get('/articles')
//         .end(function(err, res) {
//             expect(res).to.have.status(200)
//             expect(res.body).to.be.an('object')
//             done()
//         })
//     })

//     it('/POST article', function(done) {
//         chai.request(app)
//         .post('/articles')
//         .set('token', 'foobar')
//         .send({
//             title: 'Buah Tangan dari Hacktiv8',
//             body: 'Ini menceritakan kisah antara kedatangan aku dan kepergian aku dari hacktiv8 nantinya, tapi belum selesai certanya',
//             category: 'story'
//         })
//         .end(function(err, res) {
//             expect(res).to.have.status(201)
//             expect(res.body).to.be.an('object')
//             done()
//         })
//     })

//     it('/PUT article', function(done) {
//         chai.request(app)
//         .put('/articles/uid')
//         .set('token', 'foobar')
//         .send({
//             title: 'Buah Tangan dari Hacktiv8',
//             body: 'Ini menceritakan kisah antara kedatangan aku dan kepergian aku dari hacktiv8 nantinya, tapi belum selesai certanya',
//             category: 'story'
//         })
//         .end(function(err, res) {
//             expect(res).to.have.status(201)
//             expect(res.body).to.be.an('object')
//             done()
//         })
//     })

//     it('/DELETE article', function(done) {
//         chai.request(app)
//         .delete('/articles/id')
//         .set('token', 'foobar')
//         .send({
//             title: 'Buah Tangan dari Hacktiv8',
//             body: 'Ini menceritakan kisah antara kedatangan aku dan kepergian aku dari hacktiv8 nantinya, tapi belum selesai certanya',
//             category: 'story'
//         })
//         .end(function(err, res) {
//             expect(res).to.have.status(201)
//             expect(res.body).to.be.an('object')
//             done()
//         })
//     })


// })

