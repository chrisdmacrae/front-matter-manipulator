var graymatter = require("gray-matter")
var toml = require("toml-js")
var yaml = require("yamljs")

module.exports = function getData(file, data) {
    if (!data) throw new Error("Missing value for \"data\"")

    try {
        var file = graymatter.stringify(file, data, {
            engines: {
                yaml: {
                    stringify: yaml.dump.bind(yaml)
                },
                toml: {
                    stringify: toml.dump.bind(toml)
                }
              }
        })
        return file
    }
     catch (err) {
         console.log(err)
     }

     return null
}