module.exports = function getFileData(files, fields) {
    return files.reduce(function(results, file) {
        var data = getData(file)

        if (data !== null && data !== undefined) {
            if (typeof data === "object" && Object.keys(data).length > 0) {
                results.push(data)
            }
        }

        return results
    }, [])
}
