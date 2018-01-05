var fs = require("fs")
var glob = require("glob")
var {resolve} = require("path")

module.exports = function getFiles(patterns) {
    if (!patterns) throw new Error("You must provide a file path or glob pattern")

    patterns = Array.isArray(patterns) ? patterns : [patterns]

    var files = patterns.reduce(function(results, pattern) {
        var result = glob.sync(pattern)
        
        if (result.length > 0)
           results = [].concat(results).concat(result)
        
        return results
    }, []).reduce(function(results, filePath) {
        var file = getFile(filePath)

        if (file !== null)
            results.push(file)

        return results
    }, [])

    return files
 }

function getFile(fileName) {
    if (!fileName) throw new Error("Missing value for \"filname\"")
    var file

    try {
        file = fs.readFileSync(resolve(fileName), {encoding: "UTF-8"})
        return file
    }
    catch (err) {
        console.log(err)
    }

    return null
}