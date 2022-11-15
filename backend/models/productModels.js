const mongoose=require("mongoose");
const { stringify } = require("querystring");

const productSchema={
name:{
    type:String,
    required:[true,"please add product Name"]
},
description:{
    type:String,
    required:[true,"please add product description"]
},
price:{
    type:Number,
    required:[true,"please add product price"],
    maxlength:[8]
},
ratings:{
    type:Number,
    default:0
},
images:[
    {
        publi_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }

    }
],
category:{
    type:String,
    required:[true,"please add product category"]
    
},
stock:{
    type:Number,
    required:[true,"please add product stock"],
    maxlength:[4,"Stock cannot exceed 4 characters"],
    default:1
},
numOfReviews:{
    type:Number,
    default:0,
},
reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true,
        }
    }
],
createdAt:{
    type:Date,
    default:Date.now
}


}
module.exports=mongoose.model("product",productSchema);