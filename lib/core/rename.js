var getDescendantProp = require("../util/getDescendantProp")
var getFiles = require("../util/getFiles")
var getFieldPermutations = require("../util/getFieldPermutations")
var parseFile = require("../util/parseFile")
var updateKey = require("../util/updateKey")
var write = require("./write")

module.exports = function rename(patterns, key, replacement, options) {
    if (!patterns) throw new Error("Missing value for \"patterns\". Please provide a file path or glob pattern")
    if (!key) throw new Error("Missing value for \"key\"")
    if (!replacement) throw new Error("Missing value for \"replacement\"")

    var files = getFiles(patterns, options.ignore)

    if(files.length > 0) {
        return files.map(f => {
            var file = parseFile(f.file)
            var data = file.data
            var permutations = getFieldPermutations(key, data)

            return permutations.forEach(function(p) {
                var exists = getDescendantProp(data, p)

                if (exists) {
                    if (options.regex) {
                        var regex = new RegExp(replacement)
                        replacement = regex.exec(p.value)
                    } else if(typeof replacement === "function") {
                        replacement = replacement(p, f.path)
                    }

                    updateKey(data, p, replacement)

                    if (options.dryRun && !options.silent && options.cli || options.verbose && options.cli) {
                        console.log(chalk`{blue Updated {bold ${f.path}}: ${p} => {bold ${replacement}}}`)
                    }

                    return write(f.path, file, data, options)
                }

                return
            })
        })
    }
}