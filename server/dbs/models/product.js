const mongoose=require('mongoose')
const Schema = mongoose.Schema
const Product=new Schema({
    name:{
        type:String
    },
    addr:{
        type:String
    },
    course:{
        type:Array
    }
})

export default mongoose.model('Product',Product)


