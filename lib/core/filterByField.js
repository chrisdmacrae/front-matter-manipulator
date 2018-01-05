var getFieldValue = require("./getFieldValue")

module.exports = function filterByFields(filters, data, exclude) {
    var filtered = data.reduce(function(results, data) {
        var match = true;
        
        for (var i = 0; i < filters.length; i++) {
            if (exclude) {
                match = excludeByField(filters[i], data)
            } else {
                match = includeByField(filters[i], data)
            }

            if (match !== true) break
        }

        if (match === true) {
            results.push(data)
        }
        
        return results
    }, [])

    return data
}

function includeByField(filter, data) {
    if (!filter) throw new Error("No filter provided")
    if (!data) throw new Error("No data provided")

    var field = filter[0]
    var desiredValue = filter[1]
    var trueValue = getFieldValue(field, data)

    console.log(trueValue)

    if (trueValue === desiredValue) {
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