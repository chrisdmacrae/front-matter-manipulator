const fs = require("fs")
const {values} = require("../lib/index")
const expectedData = JSON.parse(fs.readFileSync(__dirname + "/values.output.json"))

test("Get value for key-value pair", () => {
    const input = values(__dirname + "/test.md", "key", {})
    const output = JSON.parse(input)
    const expected = expectedData.keyValuePair

    expect(output).toEqual(expected)
})

test("Get value for object key-value pair", () => {
    const input = values(__dirname + "/test.md", "object.key1", {})
    const output = JSON.parse(input)
    const expected = expectedData.objectKeyValuePair

    expect(output).toEqual(expected)
})

test("Get value for object nested key-value pair", () => {
    const input = values(__dirname + "/test.md", "object.key2.key2_A", {})
    const output = JSON.parse(input)
    const expected = expectedData.objectNestedKeyValuePair

    expect(output).toEqual(expected)
})

test("Get values for array", () => {
    const input = values(__dirname + "/test.md", "array", {})
    const output = JSON.parse(input)
    const expected = expectedData.array

    expect(output).toEqual(expected)
})

test("Ensure only unique values for array", () => {
    const input = values(__dirname + "/test.md", "arrayDuplicates", {})
    const output = JSON.parse(input)
    const expected = expectedData.arrayDuplicates

    expect(output).toEqual(expected)
})

test("Get value for array of objects key-value pair", () => {
    const input = values(__dirname + "/test.md", "arrayOfObjects.key1", {})
    const output = JSON.parse(input)
    const expected = expectedData.arrayOfObjectsKeyValuePair

    expect(output).toEqual(expected)
})

test("Get value for array of objects nested key-value pair", () => {
    const input = values(__dirname + "/test.md", "arrayOfObjects.key2.key2_A", {})
    const output = JSON.parse(input)
    const expected = expectedData.arrayOfObjectsNestedKeyValuePair

    expect(output).toEqual(expected)
})

test("Ensure unique values for array of objects key value pair", () => {
    const input = values(__dirname + "/test.md", "arrayOfObjectsDuplicates.key", {})
    const output = JSON.parse(input)
    const expected = expectedData.arrayOfObjectsDuplicates

    expect(output).toEqual(expected)
})