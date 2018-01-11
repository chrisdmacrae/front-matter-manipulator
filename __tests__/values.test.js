const fs = require("fs")
const {values} = require("../lib/index")
const expectedData = JSON.parse(fs.readFileSync(__dirname + "/testfiles/values.output.json"))

test("Get value for key-value pair", () => {
    const input = values(__dirname + "/testfiles/input.md", "key", {silent: true})
    const output = input
    const expected = expectedData.keyValuePair

    expect(output).toEqual(expected)
})

test("Get value for object key-value pair", () => {
    const input = values(__dirname + "/testfiles/input.md", "object.key1", {silent: true})
    const output = input
    const expected = expectedData.objectKeyValuePair

    expect(output).toEqual(expected)
})

test("Get value for object nested key-value pair", () => {
    const input = values(__dirname + "/testfiles/input.md", "object.key2.key2_A", {silent: true})
    const output = input
    const expected = expectedData.objectNestedKeyValuePair

    expect(output).toEqual(expected)
})

test("Get values for array", () => {
    const input = values(__dirname + "/testfiles/input.md", "array", {silent: true})
    const output = input
    const expected = expectedData.array

    expect(output).toEqual(expected)
})

test("Ensure only unique values for array", () => {
    const input = values(__dirname + "/testfiles/input.md", "arrayDuplicates", {silent: true})
    const output = input
    const expected = expectedData.arrayDuplicates

    expect(output).toEqual(expected)
})

test("Get value for array of objects key-value pair", () => {
    const input = values(__dirname + "/testfiles/input.md", "arrayOfObjects.key1", {silent: true})
    const output = input
    const expected = expectedData.arrayOfObjectsKeyValuePair

    expect(output).toEqual(expected)
})

test("Get value for array of objects nested key-value pair", () => {
    const input = values(__dirname + "/testfiles/input.md", "arrayOfObjects.key2.key2_A", {silent: true})
    const output = input
    const expected = expectedData.arrayOfObjectsNestedKeyValuePair

    expect(output).toEqual(expected)
})

test("Ensure unique values for array of objects key value pair", () => {
    const input = values(__dirname + "/testfiles/input.md", "arrayOfObjectsDuplicates.key", {silent: true})
    const output = input
    const expected = expectedData.arrayOfObjectsDuplicates

    expect(output).toEqual(expected)
})