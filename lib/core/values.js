var _ = require("lodash")
var getDescendantProp = require("../util/getDescendantProp")
var getFiles = require("../util/getFiles")
var getFieldPermutations = require("../util/getFieldPermutations")
var isMissing = require("../helpers/isMissing")
var output = require("./output")
var parseFile = require("../util/parseFile")

module.exports = function values(patterns, fields, options) {
    if (!patterns) throw new Error("Missing value for \"patterns\". Please provide a file path or glob pattern")
    if (!fields) throw new Error("Missing value for \"fields\"")
    if (!Array.isArray(fields)) fields = [fields]

    var matchData = {}
    var files = getFiles(patterns, options.ignore)
    
    if(files.length > 0) {
        var allFilesData = files.reduce(function(results, f) {
            if (!isMissing(f.file)) {
                var {data} = parseFile(f.file)
                results.push(data)
            }
            return results
        }, [])

        fields.forEach(function(f) {
            allFilesData.forEach(function(data) {
                var permutations = getFieldPermutations(f, data)

                var matches = _.uniq(permutations.map(function(p) {
                    return getDescendantProp(data, p)
                }))

                matchData[f] = matches
            })
        })
    }

    return output(matchData, options)
 }
