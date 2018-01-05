var graymatter = require("gray-matter")

module.exports = function getData(file) {
    if (!file) throw new Error("Missing value for \"file\"")
    
    var matter

    try {
        matter = graymatter(file)
    }
     catch (err) {
         return null
     }

     return matter.data
}