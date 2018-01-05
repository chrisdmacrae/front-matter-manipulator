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
        describe: "Provide a comma delimited list of key-value pairs to only include datasets that match"
    },
    exclude: {
        alias: "E",
        describe: "Provide a comma delimited list of key-value pairs to exclude datasets that match"
    },
    ignore: {
        describe: "Provide a comma delimited list of files or globs to ignore",
        default: "node_modules"
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