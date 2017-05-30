'use strict'

const assert = require('assert')
const path = require('path')

const fedexService = require('../src/index').fedexService
const fedexClient = require('../src/index').fedexClient

describe('AP Service Tests', function() {

  before('setup the listener', function(done) {
    fedexService.start(function (err, message) {
      if(err) return console.log(err)
      console.log(message)
      done()
    })
  })

  it('Fedex Service Tests', function(done) {
    fedexClient.ping({ message: 'hello' }, function (err, message) {
      console.log(message)
      fedexService.shutdown(function (err, message) {
        console.log(message)
        done()
      })

    })
  }).timeout(5000)

})
