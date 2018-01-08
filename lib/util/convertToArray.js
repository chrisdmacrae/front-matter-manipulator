module.exports = function convertToArray(obj, key) {
    key = key.split(".")

    var i = 0
    var parent = obj
    for (i = 0; i < key.length - 1; i++)
        parent = obj
        obj = obj[key[i]];

    if (key.length > 1) {
       convert(i, obj, parent, key)
    } else {
        convert(i, parent, {}, key)
    }
}

function convert(index, obj, parentObj, key) {
    if (!Array.isArray(obj) && !Array.isArray(parentObj) && !Array.isArray(obj[key[index]])) {
        var value = obj[key[index]]
        var newValue = [value]

        delete obj[key[index]]
        obj[key[index]] = newValue
    }
}
