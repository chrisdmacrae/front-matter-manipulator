# A utility for parsing documents with Front Matter

This utility is aimed to make understanding the data structure of front matter documents easier.

## Installation

Run the following command:

Use as CLI:
```
npm install -g github:chrisdmacrae/front-matter-parser
```

Use in scripts:
```
npm install github:chrisdmacrae/front-matter-parser --save-dev
```

# Usage
This utility can be used as a Command Line Interface, or as an import in your scripts.

## Getting Fields
This utility can get all of the fields for a given file or set of files.

### CLI
From the command line, run:

```
front-matter-parser fields <file|pattern> --ignore [,<file|pattern>] -I [,key=value] -O output.json
```

`file|pattern`: the path to a file, or a glob pattern to mulitple files.

`--ignore`: a comma delimited list of file paths or glob patterns to ignore when loading files.

`--include`, `-I`: a comma delimited list of key=value pairs to restrict results by. Only results that match all filters will be returned.

`--exclude`, `-E`: a comma delimited list of key=value pairs to restrict results by. Only results that don't match any of the pairs will be returned.

`--output`, `-O` `[optional]`: the file to write the JSON output

Example:

```
front-matter-parser fields "**/*.md" --ignore node_modules -I layout=default
```

### In scripts

```
var fmp = require("front-matter-parser")

fmp(patterns, options)
```

`patterns`: either the path to a single file, or a glob to multiple files. Does not support negation.

#### Options

`TODO:`

Example:

```
var fmp = require("front-matter-parser")

fmp("**/*.md", {})
```

## Getting All Values For A Field
This utility can also get you all of the values for a given field.

### CLI
From the command line, run:

```
front-matter-parser values <file|pattern> <fields...> --ignore [,<file|pattern>] -O output.json
```

`file|pattern`: the path to a file, or a glob pattern to mulitple files.

`fields`: a space delimited list of all fields whose possible values you want to find. Supports [nested field notation](#nested-field-notation).

`--ignore`: a comma delimited list of file paths or glob patterns to ignore when loading files.

`--output`, `-O` `[optional]`: the file to write the JSON output

### In Scripts
```
var fmp = require("front-matter-parser")

fmp(patterns, options)
```

`patterns`: either the path to a single file, or a glob to multiple files. Does not support negation.

#### Options

`TODO:`

Example:

```
var fmp = require("front-matter-parser")

fmp("**/*.md", {})
```

### Nested Field Notation
When querying fields you can find all values for a nested field by creating a Javascript-like notation.

`key1.key2.key3`

For example, let's say you inherited a couple dozen landing pages. Each has a `hero` field, that contains the fields `icon`, `headline`, and `textline`.

```
---
title: Johhny's Optical
hero:
   icon: eyes
   headline: Johnny's Optical
   textline: Eye can see you
layout: landing-page
```

`icon` can have many different values, so instead of opening up every landing page and writing down the file, we just use the CLI:

```
front-matter-parser values "landing-pages/**/*.md" hero.icon

=> outputs: eyes, star, thumbsup, ...
```

#### Working with arrays
For the purpose of this notation, treat the array like an object. For example, considering:

```
example-file.md
---
array:
- key1: a
  key2: b
- key1: c
  key3: d
...
```

We can find all possible values for `key1` easily:

```
front-matter-parser values example-file.md array.key1

=> outputs: a, c, ...
```