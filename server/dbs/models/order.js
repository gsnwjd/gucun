import mongoose from 'mongoose'
const Schema = mongoose.Schema
const myOrder=new Schema({
    name:{
        type:String
    },
    orderval:{
        type:Array
    }
})
export default mongoose.model('myOrder',myOrder)
