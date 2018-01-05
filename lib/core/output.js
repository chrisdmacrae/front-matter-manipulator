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

    if (conf["output-file"] !== "") {
        console.log(`Writing ${conf["output-file"]}`)
        fs.writeFileSync(conf["output-file"], output)
        console.log(`Finished writing ${conf["output-file"]}`)
    }

    if(conf.verbose) {
        console.log(output)
    }

    console.log("Done!")
}