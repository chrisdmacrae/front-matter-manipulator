var chalk = require("chalk")
var encodeFile = require("../util/encodeFile")
var {resolve} = require("path")
var {writeFile} = require("fs")

module.exports = function write(path, file, data, options) {
    if (!options.dryRun) {
        var toSave = encodeFile(file, data)

        if (options.verbose && options.cli)
            console.log(chalk`{gray Processing {bold ${path}}}`)

        return writeFile(resolve(path), toSave, function(err) {
            if (err) throw new err

            if (options.cli)
                console.log(chalk`{green {bold ${path}} updated}`)
        })
    }
}