const fs = require("fs")
const {update} = require("../lib/index")
const {resolve} = require("path")
const inputFile = resolve(__dirname + "/testfiles/update/input.md")
const reset = fs.readFileSync(inputFile, "utf-8")
const outputBase = __dirname + "/testfiles/update/output/"

test("Update key-value pair", () => {
    fs.writeFileSync(inputFile, reset, "utf-8")
    update(inputFile, "key", "value_test",  {})
    const output = fs.readFileSync(inputFile, "utf-8")
    const expected = fs.readFileSync(resolve(outputBase, "keyValuePair.md"), "utf-8")

    expect(output).toBe(expected)
})

test("Fail to update non-existent key-value pair", () => {
    fs.writeFileSync(inputFile, reset, "utf-8")
    update(inputFile, "key_test", "value_test",  {})
    const output = fs.readFileSync(inputFile, "utf-8")
    const expected = reset

    expect(output).toBe(expected)
})

test("Update object to be key value pair", () => {
    fs.writeFileSync(inputFile, reset, "utf-8")
    update(inputFile, "object", "value_test",  {})
    const output = fs.readFileSync(inputFile, "utf-8")
    const expected = fs.readFileSync(resolve(outputBase, "object.md"), "utf-8")

    expect(output).toBe(expected)
})

test("Fail to update non-existent object to be key value pair", () => {
    fs.writeFileSync(inputFile, reset, "utf-8")
    update(inputFile, "object_test", "value_test",  {})
    const output = fs.readFileSync(inputFile, "utf-8")
    const expected = reset

    expect(output).toBe(expected)
})

test("Update nested key-value pair", () => {
    fs.writeFileSync(inputFile, reset, "utf-8")
    update(inputFile, "object.key1", "value_test",  {})
    const output = fs.readFileSync(inputFile, "utf-8")
    const expected = fs.readFileSync(resolve(outputBase, "nestedKeyValuePair.md"), "utf-8")

    expect(output).toBe(expected)
})

test("Fail to update non-existent nested key-value pair", () => {
    fs.writeFileSync(inputFile, reset, "utf-8")
    update(inputFile, "object.key1_test", "value_test",  {})
    const output = fs.readFileSync(inputFile, "utf-8")
    const expected = reset

    expect(output).toBe(expected)
})

/* Arrays are not yet supported!

test("Update first element of an array", () => {
    fs.writeFileSync(inputFile, reset, "utf-8")
    update(inputFile, "array.0", "value_test",  {})
    const output = fs.readFileSync(inputFile, "utf-8")
    const expected = fs.readFileSync(resolve(outputBase, "array.md"), "utf-8")

    expect(output).toBe(expected)
})
*/

/* Arrays are not yet supported!

test("Fail to update non-existent element of an array", () => {
    fs.writeFileSync(inputFile, reset, "utf-8")
    update(inputFile, "array.35", "value_test",  {})
    const output = fs.readFileSync(inputFile, "utf-8")
    const expected = reset

    expect(output).toBe(expected)
})
*/

/* Arrays are not yet supported!

test("Update array of objects key value pair", () => {
    fs.writeFileSync(inputFile, reset, "utf-8")
    update(inputFile, "arrayOfObjects.key1", "value_test",  {})
    const output = fs.readFileSync(inputFile, "utf-8")
    const expected = fs.readFileSync(resolve(outputBase, "arrayOfObjects.md"), "utf-8")

    expect(output).toBe(expected)
})
*/

/* Arrays are not yet supported!

test("Fail to update array of objects key value pair", () => {
    fs.writeFileSync(inputFile, reset, "utf-8")
    update(inputFile, "arrayOfObjects.key1_test", "value_test",  {})
    const output = fs.readFileSync(inputFile, "utf-8")
    const expected = reset

    expect(output).toBe(expected)
})
*/