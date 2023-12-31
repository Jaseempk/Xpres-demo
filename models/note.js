const mongoose=require("mongoose")
require("dotenv").config()

mongoose.set("strictQuery",false)

const url=process.env.MONGO_URI

mongoose.connect(url)
    .then(result=>{
        console.log("connected to MongoDB...")
    })
    .catch((error)=>{
        console.error(error)
    })

const noteSchema=new mongoose.Schema({
    content:String,
    important:Boolean
})

noteSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports=mongoose.model("Note",noteSchema)
