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
    .demandCommand(1)
    .help()
    .argv
    