const mongoose = require("mongoose")
const noteSchema=mongoose.Schema({
    companyname : String,
    position : String,
    contract : String,
    location : String
})
const JobModel=mongoose.model("note",noteSchema)
module.exports={JobModel}