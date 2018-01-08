const fs = require("fs")
const {fields} = require("../lib/index")
const expectedData = JSON.parse(fs.readFileSync(__dirname + "/testfiles/fields.output.json"))

test("Get fields", () => {
    const input = fields(__dirname + "/testfiles/input.md", {silent: true})
    const output = JSON.parse(input)
    const expected = expectedData

    expect(output).toEqual(expected)
})

test("Get fields withgit key-value pair include flag", () => {
    const input = fields(__dirname + "/testfiles/input.md", {include: "key=value", silent: true})
    const output = JSON.parse(input)
    const expected = expectedData

    expect(output).toEqual(expected)
})

test("Get fields with nested key-value pair include flag", () => {
    const input = fields(__dirname + "/testfiles/input.md", {include: "object.key1=value", silent: true})
    const output = JSON.parse(input)
    const expected = expectedData

    expect(output).toEqual(expected)
})

test("Get fields with array include flag", () => {
    const input = fields(__dirname + "/testfiles/input.md", {include: "array=value1", silent: true})
    const output = JSON.parse(input)
    const expected = expectedData

    expect(output).toEqual(expected)
})

test("Get fields with array of objects include flag", () => {
    const input = fields(__dirname + "/testfiles/input.md", {include: "arrayOfObjects.key1=value", silent: true})
    const output = JSON.parse(input)
    const expected = expectedData

    expect(output).toEqual(expected)
})

test("Get fields with key-value pair exclude flag", () => {
    const input = fields(__dirname + "/testfiles/input.md", {exclude: "key=value", silent: true})
    const output = JSON.parse(input)
    const expected = JSON.parse("{}")

    expect(output).toEqual(expected)
})

test("Get fields with nested key-value pair exclude flag", () => {
    const input = fields(__dirname + "/testfiles/input.md", {exclude: "object.key1=value", silent: true})
    const output = JSON.parse(input)
    const expected = JSON.parse("{}")

    expect(output).toEqual(expected)
})

test("Get fields with array exclude flag", () => {
    const input = fields(__dirname + "/testfiles/input.md", {exclude: "array=value1", silent: true})
    const output = JSON.parse(input)
    const expected = JSON.parse("{}")

    expect(output).toEqual(expected)
})

test("Get fields with array of objects exclude flag", () => {
    const input = fields(__dirname + "/testfiles/input.md", {exclude: "arrayOfObjects.key1=value", silent: true})
    const output = JSON.parse(input)
    const expected = JSON.parse("{}")

    expect(output).toEqual(expected)
})