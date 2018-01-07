var encodeFile = require("../util/encodeFile")
var {resolve} = require("path")
var {writeFileSync} = require("fs")

module.exports = function write(path, file, data, options) {
    if (!options.dryRun) {
        var toSave = encodeFile(file, data)

        if (options.verbose)
            console.log(`Processing ${path}`)

        var saving = writeFileSync(resolve(path), toSave)

        console.log(`${path} updated`)

        return saving
    }
}