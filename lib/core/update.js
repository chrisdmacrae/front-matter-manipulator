var async = require("async")
var chalk = require("chalk")
var getFiles = require("../util/getFiles")
var getDescendantProp = require("../util/getDescendantProp")
var getFieldPermutations = require("../util/getFieldPermutations")
var isMissing = require("../util/isMissing")
var parseFile = require("../util/parseFile")
var {resolve} = require("path")
var updateDescendantProp = require("../util/updateDescendantProp")
var write = require("./write")

module.exports = function update(patterns, target, replacement, options) {
    if (!patterns) throw new Error("Missing value for \"patterns\". Please provide a file path or glob pattern")
    if (!target) throw new Error("Missing value for \"target\"")
    if (!replacement) throw new Error("Missing value for \"replacement\"")

    
    if (options.exclude) {
        var filters = options.exclude.split(",")
        options.exclude = filters.map(function(f) {
            return f.split("=")
        })
    } else {
        options.exclude = []
    }

    if (options.include) {
        var filters = options.include.split(",")
        options.include = filters.map(function(f) {
            return f.split("=")
        })
    } else {
        options.include = []
    }

    var files = getFiles(patterns, options.ignore)

    if(files.length > 0) {
        var rawMatches = files.reduce(function(results, f) {
            if (!isMissing(f.file)) {
                matter = parseFile(f.file)
                f.data = matter.data
                f.content = matter.content
                results.push(f)
            }
            return results
        }, [])

        if (options.exclude.length > 0) {
            rawMatches = rawMatches.map(function(f) {
                return filterByField(options.exclude, f.data, true)
            })
        }

        if (options.include.length > 0) {
            rawMatches = rawMatches.map(function(f) {
                return filterByField(options.include, f.data)
            })
        }

        cleanData = rawMatches.filter(function(n) {
            return !isMissing(n)
        })

        return cleanData.map(f => {
            var output = []
            var data = f.data
            var permutations = getFieldPermutations(target, data)
            var keyValues = permutations.map(function(p) {
                if (p)
                    var value = getDescendantProp(data, p)
                    return {permutation: p, value: value}
                return
            }).filter(function(f) {
                return !isMissing(f.value)
            })
    
            keyValues.forEach(function(p) {
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
            })

            output = write(f.path, f.content, data, options)
            return output
        })
    }
}