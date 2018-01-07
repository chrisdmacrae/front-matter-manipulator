var Command = require("../core/rename")

module.exports = exports

exports.command = "rename <file|pattern> <field> <replacement>"

exports.usage = "Usage: $0 fields <file|pattern> <field> <replacement>"

exports.aliases = ["r"]

exports.describe = "Renames the given field"

exports.example = "$0 rename \"**/*.md\" title heading"

exports.builder = {
    "dry-run": {
        alias: "D",
        describe: "Lists the changes to each file without writing the changes",
        boolean: true
    },
    "regex": {
        alias: "-R",
        describe: "Runs the old value through a regex and replaces it with the output"
    }
}

exports.handler = function(argv) {
    var options = Object.assign({cli: true}, argv)

    return Command(options.file, options.field, options.replacement, options)
}