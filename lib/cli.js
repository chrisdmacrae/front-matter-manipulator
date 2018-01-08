#!/usr/bin/env node
var yargs = require("yargs")

yargs
    .commandDir("commands")
    .option("verbose", {
        alias: "V",
        boolean: true,
        default: false,
        global: true
    })
    .option("silent", {
        alias: "S",
        boolean: true,
        default: false,
        global: true
    })
    .option("ignore", {
        describe: "Provide a comma delimited list of files or globs to ignore",
        default: "node_modules"
    })
    .demandCommand(1, "You forgot to specify a command!")
    .help()
    .argv
    
