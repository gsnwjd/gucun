const mongoose=require('mongoose')
const Schema = mongoose.Schema
const Arti=new Schema({
    author:{
        type:String
    },
    arti_id:{
        type:String
    },
    time:{
        type:String
    },
    au_head:{
        type:String
    },
    time_val:{
        type:Number
    },
    a_word:{
        type:String
    },
    dis_img:{
        type:Array
    },
    all_word:{
        type:String
    }
})

export default mongoose.model('Arti',Arti)

