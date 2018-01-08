var Command = require("../core/convert.js")

module.exports = exports

exports.command = "convert <file|pattern> <field>"

exports.usage = "Usage: $0 convert <file|pattern> <field>"

exports.aliases = ["u"]

exports.describe = "Update the value of a field across multiple files"

exports.example = "$0 update **/*.md title newval"

exports.builder = {
    "dry-run": {
        alias: "D",
        describe: "Lists the changes to each file without writing the changes",
        boolean: true
    }
}

exports.handler = function(argv) {
    var options = Object.assign({cli: true}, argv)

    return Command(options.file, options.field, options)
}