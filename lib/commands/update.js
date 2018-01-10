var Command = require("../core/update")

module.exports = exports

exports.command = "update <file|pattern> <field> <value|regexp>"

exports.usage = "Usage: $0 update <file|pattern> <field> <value|regexp>"

exports.aliases = ["u"]

exports.describe = "Update the value of a field across multiple files"

exports.example = "$0 update **/*.md title newval"

exports.builder = {
    "dry-run": {
        alias: "D",
        describe: "Lists the changes to each file without writing the changes",
        boolean: true
    },
    include: {
        alias: "inc",
        describe: "Provide a comma delimited list of key-value pairs to only include datasets that match"
    },
    exclude: {
        alias: "excl",
        describe: "Provide a comma delimited list of key-value pairs to exclude datasets that match"
    },
    "regex": {
        alias: "-R",
        describe: "Runs the old value through a regex and replaces it with the output"
    }
}

exports.handler = function(argv) {
    var options = Object.assign({cli: true}, argv)

    return Command(options.file, options.field, options.value, options)
}