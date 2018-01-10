var getDescendantProp = require("../util/getDescendantProp")
var getFiles = require("../util/getFiles")
var getFieldPermutations = require("../util/getFieldPermutations")
var isMissing = require("../util/isMissing")
var parseFile = require("../util/parseFile")
var updateKey = require("../util/updateKey")
var write = require("./write")
/** @namespace Rename */

/**
 * Optional replacement function to be run for each match
 * @memberof Rename
 * @callback replacementCallback - Function to run to rename the field
 * @param {string} field - The current field permutation
 * @param {string} filePath - The current file's path
 * @return {string} replacement - The replacement field name
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
 * Renames the given field
 * @memberof Rename
 * @param {string} patterns - A file path or glob pattern to search for files to modify
 * @param {string} field - The name of the field you wish to rename
 * @param {(string|replacementCallback)} replacement - The replacement name for the field.
 * @param {Object} options - Configuration options
 * @param {string} options.ignore - A file path or glob pattern to search for files not to modify. Defaults to "node_modules".
 * @param {string} options.exclude - Exclude files that have a certain values. Formatted as a comma delimited list of key value pairs.
 * @param {string} options.include - Only include files that have a certain values. Formatted as a comma delimited list of key value pairs.
 * @returns {null}
 * @example
 * var fmp = require("front-matter-manipulator")
 *  
 * fmp.rename("_posts/example-post.md", "categories", "tags")
 * @example
 * var fmp = require("front-matter-manipulator")
 * var options = {
 *     ignore: "_posts/subdirectory/*.md",
 *     include: "layout=post",
 *     exclude: "featured=true"
 * }
 *  
 * fmp.rename("**‏/*.md", "categories", "tags", options)
 */
module.exports = function rename(patterns, key, replacement, options) {
    if (!patterns) throw new Error("Missing value for \"patterns\". Please provide a file path or glob pattern")
    if (!key) throw new Error("Missing value for \"key\"")
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
            rawMatches = filterByField(options.exclude, rawMatches, true)
        }

        if (options.include.length > 0) {
            rawMatches = filterByField(options.include, rawMatches)
        }

        cleanData = rawMatches.filter(function(n) {
            return !isMissing(n)
        })
        
        return cleanData.map(f => {
            var output = []
            var data = f.data
            var permutations = getFieldPermutations(key, data)

            permutations.forEach(function(p) {
                var exists = getDescendantProp(data, p)

                if (exists) {
                    if (options.regex) {
                        var regex = new RegExp(replacement)
                        replacement = regex.exec(p)
                    } else if(typeof replacement === "function") {
                        replacement = replacement(p, f.path)
                    }

                    updateKey(data, p, replacement)

                    if (options.dryRun && !options.silent && options.cli || options.verbose && options.cli) {
                        console.log(chalk`{blue Updated {bold ${f.path}}: ${p} => {bold ${replacement}}}`)
                    }
                }
            })

            output = write(f.path, f.content, data, options)
            return output
        })
    }
}