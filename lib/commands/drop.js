var Command = require("../core/drop")

module.exports = exports

exports.command = "drop <file|pattern> <fields...>"

exports.usage = "Usage: $0 drop <file|pattern> <fields...>"

exports.aliases = ["d"]

exports.describe = "Remove the specified fields"

exports.example = "$0 drop **/*.md key1 key2"

exports.builder = {
    include: {
        alias: "inc",
        describe: "Provide a comma delimited list of key-value pairs to only include datasets that match"
    },
    exclude: {
        alias: "excl",
        describe: "Provide a comma delimited list of key-value pairs to exclude datasets that match"
    },
    "dry-run": {
        alias: "D",
        describe: "Lists the changes to each file without writing the changes",
        boolean: true
    }
}

exports.handler = function(argv) {
    var options = Object.assign({cli: true}, argv)

    return Command(options.file, options.fields, options)
}