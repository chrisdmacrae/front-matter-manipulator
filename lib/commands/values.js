var Command = require("../core/values")

module.exports = exports

exports.command = "values <file|pattern> <fields...>"

exports.usage = "Usage: $0 values <file|pattern> <fields...>"

exports.aliases = ["v"]

exports.describe = "Outputs all possible values for given fields"

exports.example = "$0 values **/*.md title description date"

exports.builder = {
    "output-file": {
        "alias": "O",
        "describe": "Writes the output to JSON in the specified file"
    },
    "output-string": {
        "alias": "Q",
        "describe": "Writes the output out as a space delimited string"
    }
}

exports.handler = function(argv) {
    var options = Object.assign({cli: true}, argv)

    return Command(options.file, options.fields, options)
}
