var getFieldValue = require("./getFieldValue")

module.exports = function filterByFields(filters, data, exclude) {
    var filtered = data.filter(function(data) {
        for (var i = 0; i < filters.length; i++) {
            if (exclude === true) {
                var isExcluded = excludeByField(filters[i], data)
                return isExcluded
            } else {
                var isIncluded = includeByField(filters[i], data)
                return isIncluded
            }
        }
    })

    return filtered
}

function includeByField(filter, data) {
    if (!filter) throw new Error("No filter provided")
    if (!data) throw new Error("No data provided")

    var field = filter[0]
    var desiredValue = filter[1]
    var trueValue = getFieldValue(field, data)

    if (trueValue === desiredValue) {
        console.log(data)
        return true
    }

    return false
}

function excludeByField(filter, data) {
    if (!filter) throw new Error("No filter provided")
    if (!data) throw new Error("No data provided")

    var field = filter[0]
    var desiredValue = filter[1]
    var trueValue = getFieldValue(field, data)

    if (trueValue === desiredValue) {
        return false
    }

    return true
}