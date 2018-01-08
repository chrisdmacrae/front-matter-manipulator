var graymatter = require("gray-matter")
var toml = require("toml-js")
var yaml = require("yamljs")

module.exports = function getData(file) {
    if (!file) throw new Error("Missing value for \"file\"")

    var matter

    try {
        matter = graymatter(file, {
            engines: {
                yaml: {
                    parse: yaml.parse.bind(yaml)
                },
                toml: {
                    parse: toml.parse.bind(toml)
                }
              }
        })
    }
     catch (err) {
         console.log(err)
         return null
     }

     return matter
}