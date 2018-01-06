var _ = require("lodash")
var {isUndefined} = require("util")
var parseField = require("./parseField")
var updateDescendantProp = require("./updateDescendantProp")

module.exports = updateFieldValue

function updateFieldValue(field, next, original, target) {
    if (!field) throw new Error("Missing value for \"field\"")
    if (!data) throw new Error("Missing value for \"data\"")

    var {split, 
         totalSubFields,
         currentField,
         subFields,
         fieldValue} = parseField(field, next)

    if (isUndefined(target)) {
        target = currentField
    }

    if (subFields.length >= 1 && Array.isArray(fieldValue)) {
      return updateFieldValueFromArray(subFields, fieldValue, original, target)
    } else if (subFields.length >= 1 && !isUndefined(fieldValue)) {
        return updateFieldValue(subFields, fieldValue, original, target)
    } else if (Array.isArray(fieldValue)) {
        return updateFieldValueFromArray(currentField, fieldValue, original, target)
    } else {
        
    }
}

function updateFieldValueFromArray(field, next, original, target) {
    if (!field) throw new Error("Missing value for \"field\"")
    if (!data) throw new Error("Missing value for \"data\"")

    if (data.length > 0 ) {
        return data.reduce(function(results, item) {
            var {split, 
                totalSubFields,
                currentField,
                subFields,
                fieldValue} = parseField(field, item)

            if (Array.isArray(fieldValue)) {
                return updateFieldValueFromArray(subFields, fieldValue, original, target)
            } else if (totalSubFields.length >= 1) {
                return updateFieldValue(subFields, fieldValue, original, target)
            } else {
                return replacer(fieldValue)
            }
        })
    }
}
 