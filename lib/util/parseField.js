var isMissing = require("../util/isMissing")

module.exports = function parseField(field, data) {
    if(isMissing(field)) throw new Error("Missing value for \"field\"")
    
    var split = field.split(".")
    var totalSubFields = split.slice(1)
    var currentField = split[0]
    var subFields = totalSubFields.join(".")
    var fieldValue = null

    if (data) {
        fieldValue = data[currentField]
    }

    return {
        split: split,
        totalSubFields: totalSubFields,
        currentField: currentField,
        subFields: subFields,
        fieldValue: fieldValue
    }
}
