var getFiles = require("../util/getFiles")
var getDescendantProp = require("../util/getDescendantProp")
var getFieldPermutations = require("../util/getFieldPermutations")
var isMissing = require("../helpers/isMissing")
var parseFile = require("../util/parseFile")
var {resolve} = require("path")
var updateDescendantProp = require("../util/updateDescendantProp")
var write = require("./write")

module.exports = function update(patterns, target, replacement, options) {
    if (!patterns) throw new Error("Missing value for \"patterns\". Please provide a file path or glob pattern")
    if (!target) throw new Error("Missing value for \"target\"")
    if (!replacement) throw new Error("Missing value for \"replacement\"")

    var files = getFiles(patterns, options.ignore)

    if(files.length > 0) {
        return files.map(f => {
            var file = parseFile(f.file)
            var data = file.data
            var permutations = getFieldPermutations(target, data)
            var keyValues = permutations.map(function(p) {
                if (p)
                    var value = getDescendantProp(data, p)
                    return {permutation: p, value: value}
                return
            }).filter(function(f) {
                return !isMissing(f.value)
            })

            keyValues.forEach(p => {
                if (options.regex) {
                    var regex = new RegExp(replacement)
                    replacement = regex.exec(p.value)
                } else if(typeof replacement === "function") {
                    replacement = replacement(p.value, p.permutation, f.path)
                }

                updateDescendantProp(data, p.permutation, replacement)

                if (options.dryRun && !options.silent || options.verbose) {
                    console.log(`Updated ${f.path}: ${p.value} => ${replacement}`)
                }
            })

            return write(f.path, file, data, options)
        });

    }
}