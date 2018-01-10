var chalk = require("chalk")
var fs = require("fs")
var isMissing = require("../util/isMissing")

module.exports = function output(data, options) {
    defaultOptions = {
        json: {
            replacer: null,
            space: "\t"
        }
    }

    options = Object.assign(defaultOptions, options)
    var output = JSON.stringify(data, options.json.replacer, options.json.space)
    var shouldOutput = (
        isMissing(options.outputFile) && !options.silent && options.cli
        || !isMissing(options.outputFile) && options.verbose && options.cli
    )

    if (options.outputString) 
        output = data.join(" ")

    if(shouldOutput) {
        console.log(output)
    }

    if (!isMissing(options.outputFile)) {
        if(!options.silent && options.cli)
            console.log(chalk`{gray Writing output to {bold ${options.outputFile}}}`)

        fs.writeFileSync(options.outputFile, output)

        if(!options.silent && options.cli)
            console.log(chalk`{green {bold ${options.outputFile}} written}`)
    }

    return output
}