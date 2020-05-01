import mongoose from 'mongoose'
const Schema = mongoose.Schema
const User=new Schema({
    username:{
        type:String,
        unique:true,
        require:true
    },
    userid:{
        type:String,
        unique:true,
        require:true
    },
    auhead:{
        type:String
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }
})
export default mongoose.model('User',User)
