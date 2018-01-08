var getFieldPermutations = require("./getFieldPermutations")
var getDescendantProp = require("./getDescendantProp")

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
    if (!filter) throw new Error("Missing value for \"filter\"")
    if (!data) throw new Error("Missing value for \"data\"")

    var field = filter[0]
    var permutations = getFieldPermutations(field, data)
    var desiredValue = filter[1]
    var trueValues = permutations.map(function(p) {
        return getDescendantProp(data, p)
    })

    for (var i = 0; i < trueValues.length; i++) {
        var trueValue = trueValues[i]

        if (trueValue === desiredValue) {
            return true
            break
        }
    }

    return false
}

function excludeByField(filter, data) {
    if (!filter) throw new Error("Missing value for \"filter\"")
    if (!data) throw new Error("Missing value for \"data\"")

    var field = filter[0]
    var permutations = getFieldPermutations(field, data)
    var desiredValue = filter[1]
    var trueValues = permutations.map(function(p) {
        return getDescendantProp(data, p)
    })

    for (var i = 0; i < trueValues.length; i++) {
        var trueValue = trueValues[i]

        if (trueValue === desiredValue) {
            return false
            break
        }
    }

    return true
}