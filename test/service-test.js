'use static'

var grpc = require('grpc')
var path = require('path')

var PROTO_PATH = path.join(__dirname, '../src/core/provider-gateway.proto')
var protobuf = grpc.load(PROTO_PATH).gateway
var SERVICE_BINDING = '0.0.0.0:50099'

server = new grpc.Server()
server.addService(protobuf.ProviderGateway.service, {
  getClientById: getClientById
})

server.bind(SERVICE_BINDING, grpc.ServerCredentials.createInsecure())
server.start()

console.log('Its working: ' + SERVICE_BINDING)

function getClientById (call, callback) {
  console.log(call)
  callback(null, { client: { objectId: '123', clientName: null }})
}
