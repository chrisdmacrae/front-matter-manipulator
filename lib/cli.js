#!/usr/bin/env node
var yargs = require("yargs")

yargs
    .commandDir("commands")
    .demandCommand(1)
    .help()
    .argv
    