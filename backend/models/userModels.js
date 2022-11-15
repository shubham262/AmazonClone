const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken")
const bycrypt=require("bcryptjs")
const crypto=require("crypto")
const userSchema=new mongoose.Schema({

name:{
    type:String,
    required:[true,"Please Enter your name "],
    maxLength:[30,"Name cannot exceed 30 characters"],
    minLength:[4,"Name should have more than 4 characters"]
},
email:{
    type:String,
    required:[true,"Please Enter your Email"],
    unique:true,
    validate:[validator.isEmail,"Please enter valid email"]
},
password:{
    type:String,
    required:[true,"Please enter Password"],
    minLength:[8,"Password should be greater than 8 characters"],
    select:false
},
avatar:{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },


},
role:{
    type:String,
    default:"user",
},
createdAt: {
    type: Date,
    default: Date.now,
},
resetPasswordToken:String,
resetPasswordExpire:Date,

})


//this pre function is not workig properly

userSchema.pre('save', async function (next){
    if (this.isModified("password")) {
        this.password = await bycrypt.hash(this.password, 10);
     
    }
    next();
  
    
  });


//generating jwt token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

//generating reset password token
userSchema.methods.getResetPasswordToken=function () {

//reset token
const ResetToken=crypto.randomBytes(20).toString("hex");
this.resetPasswordToken=crypto.createHash("sha256").update(ResetToken).digest("hex")

//password expire
this.resetPasswordExpire=Date.now()+15*60*1000

// return ResetToken;
return this.resetPasswordToken;
};



 
module.exports=mongoose.model("User",userSchema);