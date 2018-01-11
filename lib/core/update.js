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
/** @namespace Update */

/**
 * Optional replacement function to be run for each match
 * @memberof Update
 * @callback replacementCallback - Function to run to rename the field
 * @param {string} value - The field's current value
 * @param {string} field - The current field permutation
 * @param {string} filePath - The current file's path
 * @return {string} replacement - The replacement value
 * @example
 * var fmp = require("front-matter-manipulator")
 * function replacement(field, filePath) {
 *     if (field.indexOf(0) > -1) { // Update if array index 0
 *        replacement = "newKey"
 *     }
 * }    
 *
 * fmp.rename("**‏/*.md", "categories", replacement, options)
 */

/**
 * Updates the given key value pair's value
 * @memberof Update
 * @param {string} patterns - A file path or glob pattern to search for files to modify
 * @param {string} field - The name of the field you wish to update
 * @param {(string|replacementCallback)} replacement - The new value of the field
 * @param {Object} options - Configuration options
 * @param {string} options.ignore - A file path or glob pattern to search for files not to modify. Defaults to "node_modules".
 * @param {string} options.exclude - Exclude files that have a certain values. Formatted as a comma delimited list of key value pairs.
 * @param {string} options.include - Only include files that have a certain values. Formatted as a comma delimited list of key value pairs.
 * @returns {Array[Object]} files
 * @example
 * var fmp = require("front-matter-manipulator")
 *  
 * fmp.update("_posts/example-post.md", "draft", "true")
 * @example
 * var fmp = require("front-matter-manipulator")
 * var options = {
 *     ignore: "_posts/subdirectory/*.md",
 *     include: "layout=post",
 *     exclude: "featured=true"
 * }
 *  
 * fmp.rename("**‏/*.md", "draft", "true", options)
 */
module.exports = function update(patterns, field, replacement, options) {
    if (!patterns) throw new Error("Missing value for \"patterns\". Please provide a file path or glob pattern")
    if (!field) throw new Error("Missing value for \"field\"")
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
            var permutations = getFieldPermutations(field, data)
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
