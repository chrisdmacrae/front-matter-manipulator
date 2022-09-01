var graymatter = require("gray-matter")
var toml = require("@iarna/toml")
var yaml = require("yamljs")

module.exports = function getData(file) {
    if (!file) throw new Error("Missing value for \"file\"")

    var matter = {content: null, data: null}

    try {
        matter = graymatter(file, {
            engines: {
                yaml: {
                    parse: yaml.parse.bind(yaml),
                    stringify: yaml.dump.bind(yaml)
                },
                toml: {
                    parse: toml.parse.bind(toml),
                    stringify: toml.stringify.bind(toml)
                }
              }
        })
    }
     catch (err) {
         //console.log(err)
     }

     return matter
}