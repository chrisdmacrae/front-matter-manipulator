var Command = require("../core/values")

module.exports = exports

exports.command = "values <file|pattern> <fields...>"

exports.usage = "Usage: values <file|pattern> <fields...>"

exports.aliases = ["vals"]

exports.describe = "Outputs all possible values for given fields"

exports.example = "values **/*.md title description date"

exports.builder = {
    "output-file": {
        "alias": "O",
        "describe": "Writes the output to JSON in the specified file"
    }
}

exports.handler = function(argv) {
    var options = Object.assign({}, argv)

    return Command(options.file, options.fields, options)
}