var fs = require('fs')
var Handlebars = require('handlebars')
const path = require('path')

Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
})

Handlebars.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1
})

fs.readFile(path.join(__dirname,'protobuf.handlebars'), 'utf8', function (err, source) {
  if (err) throw err
  var template = Handlebars.compile(source)

  var targetPath = path.join(__dirname, 'schema/mysql')
  fs.readdir(targetPath, (err, files) => {
    files.forEach(file => {
      fs.readFile(path.join(targetPath, file), 'utf8', function (err, data) {
        if (err) throw err
        var ao = JSON.parse(data)
        //console.log(ao.objectName)
        String.prototype.upperCase = function() {
          return this.charAt(0).toUpperCase() + this.slice(1)
        }
        ao.upperObjectName = ao.objectName.upperCase()
        //console.log(ao.upperObjectName)

        setProtobufDataType(ao)
        var result = template(ao)
        var newFile = path.join(__dirname, 'schema/protos') + "/" + ao.objectName + ".proto"
        //console.log(newFile)
        fs.writeFile(newFile, result, function () {
          if (err) throw err
        })
      })
    })
  })
})

function setProtobufDataType(ao)
{
  for(i=0; i<ao.fields.length; i++) {
    if(ao.fields[i].dataType == 'string') {
      ao.fields[i].protobufDataType = 'string'
    } else if(ao.fields[i].dataType == 'number') {
      ao.fields[i].protobufDataType = 'int'
    } else if (ao.fields[i].dataType == 'boolean') {
      ao.fields[i].protobufDataType = 'bool'
    } else if (ao.fields[i].dataType == 'datetime') {
      ao.fields[i].protobufDataType = 'int64'
    } else {
      ao.fields[i].protobufDataType = 'NOT SUPPORTED'
    }
  }
}
