var async = require("async")
var chalk = require("chalk")
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

    var context = arguments
    var files = getFiles(patterns, options.ignore)

    if(files.length > 0) {
        return async.map(files, iterateFiles)
    } else {
        spinner.stop(true)
    }

    function iterateFiles(f) {
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
    
        return async.each(keyValues, iteratePermutations, function(err) {
            if (err) throw new err
        })

        function iteratePermutations(p) {
            var newVal = replacement
        
            if (options.regex) {
                var regex = new RegExp(replacement)
                var newVal = regex.exec(p.value)
            } else if(typeof replacement === "function") {
                var newVal = replacement(p.value, p.permutation, f.path)
            }
        
            if(typeof replacement !== "function" || newVal !== replacement)
                updateDescendantProp(data, p.permutation, newVal)
        
            if (options.dryRun && !options.silent && options.cli || options.verbose && options.cli) {
                console.log(chalk`{blue Updated {bold ${f.path}}: ${p.value} => {bold ${newVal}}}`)
            }

            return write(f.path, file, data, options)
        }
    }
}