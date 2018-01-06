var encodeFile = require("../util/encodeFile")
var {writeFileSync} = require("fs")
var getFiles = require("../util/getFiles")
var parseFile = require("../util/parseFile")
var getDescendantProp = require("../util/getDescendantProp")
var getFieldPermutations = require("../util/getFieldPermutations")
var {resolve} = require("path")
var updateDescendantProp = require("../util/updateDescendantProp")

module.exports = function update(patterns, target, replacement, options) {
    if (!patterns) throw new Error("Missing value for \"patterns\". Please provide a file path or glob pattern")
    if (!target) throw new Error("Missing value for \"target\"")
    if (!replacement) throw new Error("Missing value for \"replacement\"")

    var files = getFiles(patterns, options.ignore)

    if(files.length > 0) {
        var keys = files.map(f => {
            var file = parseFile(f.file)
            var data = file.data
            var permutations = getFieldPermutations(target, data).map(function(p) {
                var value = getDescendantProp(data, p)
                return {permutation: p, value: value}
            })

            permutations.forEach(p => {
                if (options.regex) {
                    var regex = new RegExp(replacement)
                    replacement = regex.exec(p.value)
                }

                var updated = updateDescendantProp(data, p.permutation, replacement)

                if (options.dryRun || options.verbose) {
                    console.log(`Updated ${f.path}: ${p.value} => ${replacement}`)
                }
            })

            if (!options.dryRun) {
                var toSave = encodeFile(file, data)

                if (options.verbose)
                    console.log(`Processing ${f.path}`)

                var saving = writeFileSync(resolve(f.path), toSave)

                console.log(`${f.path} updated`)
            }
        });

    }
}