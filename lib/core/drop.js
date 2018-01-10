var chalk = require("chalk")
var getDescendantProp = require("../util/getDescendantProp")
var getFiles = require("../util/getFiles")
var getFieldPermutations = require("../util/getFieldPermutations")
var isMissing = require("../util/isMissing")
var parseFile = require("../util/parseFile")
var updateKey = require("../util/updateKey")
var write = require("./write")
/** @namespace Drop */

/**
 * Deletes the given fields from the front matter
 * @memberof Drop
 * @param {string} patterns - A file path or glob pattern to search for files to modify
 * @param {string} fields - A space delimited list of fields you wish to drop
 * @param {Object} options - Configuration options
 * @param {string} options.ignore - A file path or glob pattern to search for files not to modify. Defaults to "node_modules".
 * @param {string} options.exclude - Exclude files that have a certain values. Formatted as a comma delimited list of key value pairs.
 * @param {string} options.include - Only include files that have a certain values. Formatted as a comma delimited list of key value pairs.
 * @returns {null}
 * @example
 * var fmp = require("front-matter-manipulator")
 *  
 * fmp.drop("_posts/example-post.md", "categories tags")
 * @example
 * var fmp = require("front-matter-manipulator")
 * var options = {
 *     ignore: "_posts/subdirectory/*.md",
 *     include: "layout=post",
 *     exclude: "featured=true"
 * }
 *  
 * fmp.drop("**‏/*.md", "categories tags", options)
 */
module.exports = function rename(patterns, fields, options) {
    if (!patterns) throw new Error("Missing value for \"patterns\". Please provide a file path or glob pattern")
    if (!fields) throw new Error("Missing value for \"fields\"")
    
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
        }, []).filter(function(f) {
            return !isMissing(f.path) && !isMissing(f.file) && !isMissing(f.data)
        })

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
            var output
            var data = f.data

            fields.forEach(function(key) {
                var permutations = getFieldPermutations(key, data)

                permutations.forEach(function(p) {
                    var exists = getDescendantProp(data, p)

                    if (exists) {

                        delete data[p]

                        if (options.dryRun && !options.silent && options.cli || options.verbose && options.cli) {
                            console.log(chalk`{red Deleted {bold ${f.path}}: {bold ${p}}}`)
                        }
                    }
                })
            })

            output = write(f.path, f.content, data, options)
            return output
        })
    }
}