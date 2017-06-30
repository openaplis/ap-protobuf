'use strict'

const path = require('path')
const grpc = require('grpc')

describe('protobuf test', function() {

  it('gateway protobuf test', function(done) {
    var PROTO_PATH = path.join(__dirname, '../src/core/gateway.proto')
    var gateway_proto = grpc.load(PROTO_PATH).gateway
    var accessionOrderGateway = new gateway_proto.AccessionOrderGateway(process.env.AP_GATEWAY_SERVICE_BINDING, grpc.credentials.createInsecure())
    var providerGateway = new gateway_proto.ProviderGateway(process.env.AP_GATEWAY_SERVICE_BINDING, grpc.credentials.createInsecure())
    done()
  })  

})
