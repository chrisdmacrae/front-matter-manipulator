var chalk = require("chalk")
var encodeFile = require("../util/encodeFile")
var {resolve} = require("path")
var {readFileSync, writeFileSync} = require("fs")

module.exports = function write(path, file, data, options) {
    console.log(data)
    if (!options.dryRun) {
        var toSave = encodeFile(file, data)

        if (options.verbose && options.cli)
            console.log(chalk`{gray Processing {bold ${path}}}`)

        writeFileSync(resolve(path), toSave, function(err) {
            if (err) throw new err

            console.log(options)

            if (options.cli)
                console.log(chalk`{green {bold ${path}} updated}`)
        })

        if (!options.cli)
            return readFileSync(resolve(path), "utf-8")
    }
}