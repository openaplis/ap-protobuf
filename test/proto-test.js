'use strict'

const path = require('path')
var grpc = require('grpc')

describe('protobuf test', function() {

  it('gateway protobuf test', function(done) {
    var PROTO_PATH = path.join(__dirname, '../src/core/provider-gateway.proto')
    var protobuf = grpc.load(PROTO_PATH).gateway
    done()
  })

})
