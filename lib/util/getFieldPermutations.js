var _ = require("lodash")
var {isUndefined} = require("util")
var parseField = require("./parseField")

module.exports = getFieldValue

function getFieldValue(field, data, target) {
    if (!field) throw new Error("Missing value for \"field\"")
    if (!data) throw new Error("Missing value for \"data\"")

    var {split, 
         totalSubFields,
         currentField,
         subFields,
         fieldValue} = parseField(field, data)

    if(isUndefined(target)) {
        target = currentField
    } else {
        target += `.${currentField}`
    }

    if (subFields.length >= 1 && Array.isArray(fieldValue)) {
      return getFieldValueFromArray(subFields, fieldValue, target)  
    } else if (subFields.length >= 1 && !isUndefined(fieldValue)) {
        return getFieldValue(subFields, fieldValue, target)
    } else if (Array.isArray(fieldValue)) {
        return getFieldValueFromArray(subFields, fieldValue, target)
    } else {
        return target
    }
}

function getFieldValueFromArray(field, data, target) {
    if (!field) throw new Error("Missing value for \"field\"")
    if (!data) throw new Error("Missing value for \"data\"")

    if (data.length > 0 ) {
        return data.map(function(item, i) {
            var newTarget = target
            var {split, 
                totalSubFields,
                currentField,
                subFields,
                fieldValue} = parseField(field, item)

            newTarget += `.${i}.${currentField}`

            if (Array.isArray(fieldValue)) {
                return getFieldValueFromArray(subFields, fieldValue, newTarget)
            } else if (totalSubFields.length >= 1) {
                return getFieldValue(subFields, fieldValue, newTarget)
            } else {
                return newTarget
            }
        })
    }
}
 