var chalk = require("chalk")
var encodeFile = require("../util/encodeFile")
var parseFile = require("../util/parseFile")
var {resolve} = require("path")
var {readFileSync, writeFileSync} = require("fs")

module.exports = function write(path, content, data, options) {
    if (!options.dryRun) {
        var toSave = encodeFile(content, data)

        if (options.verbose && options.cli)
            console.log(chalk`{gray Processing {bold ${path}}}`)

        writeFileSync(resolve(path), toSave)

        if (options.cli)
            console.log(chalk`{green {bold ${path}} updated}`)

        return parseFile(toSave)
    }
}