var graymatter = require("gray-matter")
var toml = require("toml")
var yaml = require("yamljs")

module.exports = function getData(file) {
    if (!file) throw new Error("Missing value for \"file\"")
    
    var matter

    try {
        var matter = graymatter(file, {
            engines: {
                yaml: {
                    parse: yaml.parse.bind(yaml)
                },
                toml: {
                    parse: toml.parse.bind(toml)
                }
              }
        })
        return matter.data
    }
     catch (err) {
         console.log(err)
     }

     return null
}