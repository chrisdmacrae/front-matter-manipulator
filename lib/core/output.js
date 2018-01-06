var fs = require("fs")

module.exports = function output(data, options) {
    defaultOptions = {
        json: {
            replacer: null,
            space: "\t"
        }
    }

    var conf = Object.assign(defaultOptions, options)
    var output = JSON.stringify(data, conf.json.replacer, conf.json.space)

    if (conf.outputFile) {
        if(!conf.silent && conf.cli)
            console.log(`Writing ${conf.outputFile}`)

        fs.writeFileSync(conf.outputFile, output)

        if(!conf.silent && conf.cli)
            console.log(`Finished writing ${conf.outputFile}`)
    }

    if(!conf.silent && conf.cli) {
        console.log(output)
    }

    return output
}