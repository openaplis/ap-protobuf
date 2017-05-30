var fs = require('fs')
var Handlebars = require('handlebars')

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

fs.readFile('./src/protobuf.handlebars', 'utf8', function (err, source) {
  if (err) throw err
  var template = Handlebars.compile(source)

  var targetPath = './node_modules/ap-mssql/src/schema/'
  fs.readdir(targetPath, (err, files) => {
    files.forEach(file => {
      fs.readFile(targetPath + file, 'utf8', function (err, data) {
        if (err) throw err
        var ao = JSON.parse(data)
        setProtobufDataType(ao)
        var result = template(ao)
        fs.writeFile('./src/schema/' + ao.className + ".proto", result, function () {
          if (err) throw err
        })
      })
    })
  })
})

function setProtobufDataType(ao)
{
  for(i=0; i<ao.fields.length; i++) {
    if(ao.fields[i].dataType == 'varchar') {
      ao.fields[i].protobufDataType = 'string'
    } else if(ao.fields[i].dataType == 'int') {
      ao.fields[i].protobufDataType = 'int'
    } else if (ao.fields[i].dataType == 'tinyint') {
      ao.fields[i].protobufDataType = 'bool'
    } else if (ao.fields[i].dataType == 'datetime') {
      ao.fields[i].protobufDataType = 'int64'
    } else {
      ao.fields[i].protobufDataType = 'NOT SUPPORTED'
    }
  }
}
