var _ = require("lodash")
var {isUndefined} = require("util")
var parseField = require("./parseField")

module.exports = getFieldValue

function getFieldValue(field, data) {
    if (!field) throw new Error("Missing value for \"field\"")
    if (!data) throw new Error("Missing value for \"data\"")

    var {split, 
         totalSubFields,
         currentField,
         subFields,
         fieldValue} = parseField(field, data)

    if (Array.isArray(fieldValue)) {
      return getFieldValueFromArray(subFields, fieldValue)  
    } else if (subFields.length >= 1 && !isUndefined(fieldValue)) {
        return getFieldValue(subFields, fieldValue)
    } else {
        return fieldValue
    }
}

function getFieldValueFromArray(field, data) {
    if (!field || !data) return

    return data.reduce(function(results, item) {
        var {split, 
            totalSubFields,
            currentField,
            subFields,
            fieldValue} = parseField(field, item)

        if (Array.isArray(fieldValue)) {
            return getFieldValueFromArray(subFields, fieldValue)
        } else if (totalSubFields.length >= 1) {
            return getFieldValue(subFields, fieldValue)
        } else {
            return fieldValue
        }
    })
}
 