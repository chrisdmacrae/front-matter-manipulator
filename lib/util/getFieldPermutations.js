var _ = require("lodash")
var isMissing = require("../helpers/isMissing")
var parseField = require("./parseField")

module.exports = function getFieldPermutations(field, data) {
    var permutations = getFieldFromKey(field, data)

    if(!Array.isArray(permutations))
        permutations = [permutations]

    return permutations
}

function getFieldFromKey(field, data, target) {
    if (isMissing(field)) throw new Error("Missing value for \"field\"")
    if (!data) throw new Error("Missing value for \"data\"")

    var {split, 
         totalSubFields,
         currentField,
         subFields,
         fieldValue} = parseField(field, data)

    if(isMissing(target)) {
        target = currentField
    } else {
        target += `.${currentField}`
    }

    if (subFields.length >= 1 && Array.isArray(fieldValue)) {
      return getFieldFromArray(subFields, fieldValue, target)  
    } else if (subFields.length >= 1 && !isMissing(fieldValue)) {
        return getFieldFromKey(subFields, fieldValue, target)
    } else if (Array.isArray(fieldValue)) {
        return getFieldFromArray(subFields, fieldValue, target)
    } else {
        return target
    }
}

function getFieldFromArray(field, data, target) {
    if (isMissing(field)) throw new Error("Missing value for \"field\"")
    if (!data) throw new Error("Missing value for \"data\"")

    if (data.length > 0 ) {
        return data.map(function(item, i) {
            var newTarget = target
            var {split, 
                totalSubFields,
                currentField,
                subFields,
                fieldValue} = parseField(field, item)

            if (currentField) {
                newTarget += `.${i}.${currentField}`
            } else {
                newTarget += `.${i}`
            }

            if (Array.isArray(fieldValue)) {
                return getFieldFromArray(subFields, fieldValue, newTarget)
            } else if (totalSubFields.length >= 1) {
                return getFieldFromKey(subFields, fieldValue, newTarget)
            } else {
                return newTarget
            }
        })
    }
}
 