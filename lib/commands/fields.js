var Command = require("../core/fields")

module.exports = exports

exports.command = "fields <file|pattern>"

exports.usage = "Usage: $0 fields <file|pattern> --filters key=value"

exports.aliases = ["f"]

exports.describe = "Outputs all possible fields for given files"

exports.example = "$0 fields \"**/*.md\" --filters layout=default"

exports.builder = {
    include: {
        alias: "inc",
        describe: "Provide a comma delimited list of key-value pairs to only include datasets that match"
    },
    exclude: {
        alias: "exc",
        describe: "Provide a comma delimited list of key-value pairs to exclude datasets that match"
},
    "output-file": {
        "alias": "O",
        "describe": "Writes the output to JSON in the specified file"
    }
}

exports.handler = function(argv) {
    var options = Object.assign({cli: true}, argv)

    return Command(options.file, options)
}