'use strict'

const grpc = require('grpc')
const path = require('path')

var SERVICE_BINDING = 'localhost:50099'
var PROTO_PATH = path.join(__dirname, '../src/core/provider-gateway.proto')
const service_proto = grpc.load(PROTO_PATH).gateway
const service = new service_proto.ProviderGateway(SERVICE_BINDING, grpc.credentials.createInsecure())

var searchRequest = { searchName: 'byClientId', searchParams: [{ name: 'clientId', value: '21' }] }

service.getClient( searchRequest, function (err, client) {
  if(err) return console.log(err)
  console.log(client)
})
