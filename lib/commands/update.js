var Command = require("../core/update.js")

module.exports = exports

exports.command = "update <file|pattern> <field> <value|regexp>"

exports.usage = "Usage: update <file|pattern> <field>"

exports.describe = "Update the value of a field across multiple files"

exports.example = "update **/*.md title --replace newval"

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
    var options = Object.assign({}, argv)

    return Command(options.file, options.field, options.value, options)
}