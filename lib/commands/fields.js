var Command = require("../fields")

module.exports = exports

exports.command = "fields <file|pattern>"

exports.usage = "Usage: $0 fields <file|pattern> --filters key=value"

exports.aliases = ["flds"]

exports.describe = "Outputs all possible fields for given files"

exports.example = "$0 fields \"**/*.md\" --filters layout=default"

exports.builder = {
    include: {
        alias: "I",
        describe: "Only return results whose field values match (Only works with key-value pairs)"
    },
    exclude: {
        alias: "E",
        describe: "Only return results whose field don't match (Only works with key-value pairs)"
    },
    "output-file": {
        "alias": "O",
        "describe": "Writes the output to JSON in the specified file",
        default: "fields.json"
    }
}

exports.handler = function(argv) {
    var options = Object.assign({}, argv)

    if (options.exclude) {
        var filters = options.exclude.split(",")
        options.exclude = filters.map(function(f) {
            return f.split("=")
        })
    } else {
        options.exclude = []
    }

    if (options.include) {
        var filters = options.include.split(",")
        options.include = filters.map(function(f) {
            return f.split("=")
        })
    } else {
        options.include = []
    }

    return Command(options.file, options)
}