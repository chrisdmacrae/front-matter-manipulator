var Command = require("../fields")

module.exports = exports

exports.command = "fields <file|pattern>"

exports.usage = "Usage: $0 fields <file|pattern> --filters key=value"

exports.aliases = ["flds"]

exports.describe = "Outputs all possible fields for given files"

exports.example = "$0 fields \"**/*.md\" --filters layout=default"

exports.builder = {
    filters: {
        alias: "F",
        describe: "Filter results by field value (Only works with key-value pairs)"
    },
    "output-file": {
        "alias": "O",
        "describe": "Writes the output to JSON in the specified file"
    }
}

exports.handler = function(argv) {
    var options = {
        fields: argv.fields,
        log: true,
        filters: []
    }

    if (argv.filters) {
        var filters = argv.filters.split(",")
        
        for (var i = 0; i < filters.length; i++) {
            var filter = filters[i].split("=")
            options.filters.push(filter)
        }
    }

    if(argv.output) {
        options.output = argv.output
    }

    var values = Command(argv.file, options)
}