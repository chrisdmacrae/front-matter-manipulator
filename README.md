# A utility for parsing documents with Front Matter

This utility is aimed to make understanding the data structure of front matter documents easier.

## Installation

Run the following command:

```
npm install github:chrisdmacrae/front-matter-parser
```

## Usage
This utility can be used as a Command Line Interface, or as an import in your scripts.

### Getting Fields
This utility can get all of the fields for a given file or set of files.

#### CLI
From the command line, run:

```
front-matter-parser fields <file|pattern> --ignore [,<file|pattern>] -I [,key=value] -O output.json
```

`file|pattern`: the path to a file, or a glob pattern to mulitple files.

`--ignore`: a comma delimited list of file paths or glob patterns to ignore when loading files.

`--include`, `-I`: a comma delimited list of key=value pairs to restrict results by. Only results that match all filters will be returned.

`--exclude`, `-E`: a comma delimited list of key=value pairs to restrict results by. Only results that don't match any of the pairs will be returned.

`--output`, `-O` `[optional]`: the file to write the JSON output

#### In scripts

```
var fmp = require("front-matter-parser")

fmp(patterns, options)
```

`patterns`: either the path to a single file, or a glob to multiple files. Does not support negation.

Example:

```
var fmp = require("front-matter-parser")

fmp("**/*.md", ")
```

### Getting All Values For A Field
This utility can also get you all of the values for a given field.

### CLI
From the command line, run:

```
front-matter-parser values <file|pattern> <fields...> --ignore [,<file|pattern>] -O output.json
```

`file|pattern`: the path to a file, or a glob pattern to mulitple files.

`fields`: a space delimited list of all fields whose possible values you want to find

`--ignore`: a comma delimited list of file paths or glob patterns to ignore when loading files.

`--output`, `-O` `[optional]`: the file to write the JSON output