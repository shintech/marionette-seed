import chai from 'chai'
import chaiHttp from 'chai-http'
const path = require('path')
const logger = require('winston')
require('babel-polyfill')

chai.use(chaiHttp)

const expect = chai.expect
const environment = process.env['NODE_ENV'] || 'development'

const options = {
  basedir: path.join(__dirname, '../../'),
  environment: environment,
  pkg: require(path.join(__dirname, '../../package.json')),
  logger: logger,
  port: process.env['PORT'] || 8000,
  postgresURI: process.env['POSTGRES_URI'] || `postgres://postgres:postgres@localhost:5432/api_${environment}`
}

const application = require('../../dist')

application.start(options, (server, db) => {
  describe('Users', () => {
    before(async function () {
      try {
        await db.none('truncate users restart identity')
      } catch (err) {
        console.log(err)
      }
    })

    beforeEach(async function () {
      try {
        await db.none('insert into users( first_name, last_name, email, optional)' + 'values($1, $2, $3, $4)', ['first_name', 'last_name', 'email@example.com', 'option1'])
      } catch (err) {
        console.log(err)
      }
    })

    afterEach(async function () {
      try {
        await db.none('truncate users restart identity')
      } catch (err) {
        console.log(err)
      }
    })

    /*eslint-disable */
    it('GET /api/users -> should get all users', done => {
      chai.request(server)
        .get('/api/users')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.response[0]).to.have.property('id')
          done()
        })
    })

    it('GET /api/users/:id -> should get a single user', done => {
      chai.request(server)
        .get('/api/users')
        .end((error, response) => {
          expect(error).to.be.null
          chai.request(server)
            .get(`/api/users/${response.body.response[0].id}`)
            .end((err, res) => {
              expect(err).to.be.null
              expect(res).to.have.status(200)
              expect(res).to.be.json

              expect(res.body).to.have.property('id')
              expect(res.body).to.have.property('first_name')
              expect(res.body).to.have.property('last_name')
              expect(res.body).to.have.property('email')
              expect(res.body).to.have.property('optional')
              expect(res.body).to.have.property('created_at')

              expect(res.body['first_name']).to.equal('first_name')
              expect(res.body['last_name']).to.equal('last_name')
              expect(res.body['email']).to.equal('email@example.com')
              expect(res.body['optional']).to.equal('option1')

              done()
            })
        })
    })

    it('POST /api/users -> should create a single user', done => {
      chai.request(server)
        .post('/api/users')
        .send({
          first_name: 'new',
          last_name: 'user',
          email: 'newUser@example.com',
          optional: 'option2'
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          done()
        })
    })

    it('PUT /api/users/:id -> should update a single user', done => {
      chai.request(server)
        .get('/api/users')
        .end((error, response) => {
          expect(error).to.be.null
          chai.request(server)
            .put(`/api/users/${response.body.response[0].id}`)
            .send({
              first_name: 'newFirstName',
              last_name: 'newLastName',
              email: 'newEmail@exapmle.com',
              optional: 'option3'
            })
            .end((err, res) => {
              expect(err).to.be.null
              expect(res).to.have.status(200)
              expect(res).to.be.json
              chai.request(server)
                .get('/api/users')
                .end((e, r) => {
                  expect(e).to.be.null
                  expect(r.body.response[0]).to.have.property('id')
                  expect(r.body.response[0]).to.have.property('first_name')
                  expect(r.body.response[0]).to.have.property('last_name')
                  expect(r.body.response[0]).to.have.property('email')
                  expect(r.body.response[0]).to.have.property('optional')
                  expect(r.body.response[0]).to.have.property('created_at')

                  expect(r.body.response[0]['first_name']).to.equal('newFirstName')
                  expect(r.body.response[0]['last_name']).to.equal('newLastName')
                  expect(r.body.response[0]['email']).to.equal('newEmail@exapmle.com')
                  expect(r.body.response[0]['optional']).to.equal('option3')

                  done()
                })
            })
        })
    })

    it('DELETE /api/users/:id -> should delete one user', done => {
      chai.request(server)
        .get('/api/users')
        .end((error, response) => {
          expect(error).to.be.null
          chai.request(server)
            .delete(`/api/users/${response.body.response[0].id}`)
            .end((err, res) => {
              expect(err).to.be.null
              expect(res).to.have.status(200)
              expect(res).to.be.json
              done()
            })
        })
    })
    
  /* eslint-enable */
  })
})
