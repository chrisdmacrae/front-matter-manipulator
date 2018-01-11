var async = require("async")
var chalk = require("chalk")
var convertToArray = require("../util/convertToArray")
var getFiles = require("../util/getFiles")
var getDescendantProp = require("../util/getDescendantProp")
var getFieldPermutations = require("../util/getFieldPermutations")
var isMissing = require("../util/isMissing")
var parseFile = require("../util/parseFile")
var {resolve} = require("path")
var updateDescendantProp = require("../util/updateDescendantProp")
var write = require("./write")
/** @namespace Convert */

/**
 * Converts the given field to an array, unless it is already an array
 * @memberof Convert
 * @param {string} patterns - A file path or glob pattern to search for files to modify
 * @param {string} field - The field you want to convert
 * @param {Object} options - Configuration options
 * @param {string} options.ignore - A file path or glob pattern to search for files not to modify. Defaults to "node_modules".
 * @returns {Array[Object]} files
 * 
 * @example
 * var fmp = require("front-matter-manipulator")
 *  
 * fmp.convert("_posts/example-post.md", "categories")
 * @example
 * var fmp = require("front-matter-manipulator")
 * var options = {
 *     ignore: "_posts/subdirectory/*.md"
 * }
 *  
 * fmp.convert("_posts/**‏/*.md", "categories", options)
 */
module.exports = function convert(patterns, field, options) {
    if (!patterns) throw new Error("Missing value for \"patterns\". Please provide a file path or glob pattern")
    if (!field) throw new Error("Missing value for \"field\"")

    var context = arguments
    var files = getFiles(patterns, options.ignore)

    if(files.length > 0) {
        return files.forEach(function(f) {
            var output
            var file = parseFile(f.file)
            var data = file.data
            var permutations = getFieldPermutations(field, data)
            var keyValues = permutations.map(function(p) {
                if (p)
                    var parent = p.split(".").filter(function(v) {
                        return v === field
                    })[0]

                    return {permutation: p, parent: parent}
                return
            }).filter(function(f) {
                return !isMissing(f)
            }).map(function(p) {
                var split = p.permutation.split(".")
                var parentValue = getDescendantProp(data, p.parent)

                if (Array.isArray(parentValue)) {
                    split.pop()
                }

                p.permutation = split.join(".")

                return p
            })
    
            keyValues.forEach(function(p) {
                convertToArray(data, p.permutation)
            
                if (options.dryRun && !options.silent && options.cli || options.verbose && options.cli) {
                    console.log(chalk`{blue Converted {bold ${f.path}}: {bold "${p.permutation}}" to array}`)
                }
    
                output = write(f.path, file, data, options)
            })
        })
    }
}