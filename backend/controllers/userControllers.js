const ErrorHandler = require("../utils/errorHandler");
const catchAsynError = require("../middleware/catchAsynError");
const User=require("../models/userModels");
const bycrypt=require("bcryptjs");
const sendToken = require("../utils/jwttoken");
const sendEmail=require("../utils/sendemail")


const { options } = require("../app");



//register a user
exports.registerAuser=catchAsynError(async(req,res,next)=>{

    var {name,email,password}=req.body;
    
    const user=await User.create({
        name,
        email,
        password,
        avatar:{public_id:"this is sample id",
        url:"this sample url"
    }
    })
    sendToken(user,200,res);


})

//User login 
exports.loginAuser=catchAsynError(async(req,res,next)=>{

    const {email,password}=req.body;
    if(!email ||!password){return next(new ErrorHandler("Please enter valid email & Password",400))}

    const user=await User.findOne({email}).select("+password")
   
    if(!user){
        return next(new ErrorHandler("Ivalid email or password",401))
    }

    const isPasswordMatched=await bycrypt.compare(password,user.password)
    

    if(!isPasswordMatched){
        return next(new ErrorHandler("Ivalid email or password",401))
    }


    sendToken(user,200,res);

})
//user logout

exports.logout=catchAsynError(async(req,res,next)=>{

res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true
})

res.status(200).json({
    success:true,
    message:"Logged out Successfully"
})

})

//forgot password
exports.forgotPassword=catchAsynError(async(req,res,next)=>{

    //finding user from email entered on request

    const user=await User.findOne({email:req.body.email});
    

    if(!user){
        return next(new ErrorHandler("User not found,Please add valid Email",404))
    }

    //get resettoken
    const resetToken= user.getResetPasswordToken();

    //saving the newly created resettoken and expire to user object
    await user.save({validatorBeforeSave:false})
   
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message=`Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    try {
        await sendEmail({
            email:user.email,
            subject:"Amazon Password Recovery",
            message,
        })

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })

        
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validatorBeforeSave:false})
        return next(new ErrorHandler(error.message,500))
    }

})


//reset Password
exports.resetPassword=catchAsynError(async(req,res,next)=>{
    console.log(req.params.token);
    const resetPasswordToken=req.params.token
    
    const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
    });


    
    
    if(!user){
        return next(new ErrorHandler("Reset Password Token is Invalid or has been expired",400))
    }

    if(req.body.password!==req.body.confirmpassword){
        return next(new ErrorHandler("Password and confirm Password does not match",400))
    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    

    sendToken(user,200,res);


})

//get authenticated user detail
exports.getAuthUserdetails=catchAsynError(async(req,res,next)=>{

const user=await User.findById(req.user.id)

res.status(200).json({
    success:true,
    user
})

})

// updating authenticated user password


exports.updateUserPasswword=catchAsynError(async(req,res,next)=>{

    const user=await User.findById(req.user.id).select("+password")
    const isPasswordMatched=await bycrypt.compare(req.body.oldPassword,user.password)
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400))
    }
    
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400))
    }

    user.password=req.body.newPassword
    user.save();
    sendToken(user,200,res)
    
    })


    // updating authenticated user profile

exports.updateUserProfile=catchAsynError(async(req,res,next)=>{

    const newUserdat={
        name:req.body.name,
        email:req.body.email
    }

    //we will add cloudinary for avatar later

    const user=await User.findByIdAndUpdate(req.user.id,newUserdat,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        message:"Profile Updated Successfully"
    })
    
    
    })



    //admin routes functions

//get all user details(--admin--)
exports.getAllUserdetails=catchAsynError(async(req,res,next)=>{

        const users=await User.find({});
        
        res.status(200).json({
            success:true,
            users
        })
        
})

//get single user details(--admin--)
exports.getSingleUserdetails=catchAsynError(async(req,res,next)=>{

    const user=await User.findById(req.params.id);
    if(!user){return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`))}
    
    res.status(200).json({
        success:true,
        user
    })
    
})


//update user roles(--admin--)
exports.updateUserRole=catchAsynError(async(req,res,next)=>{

    const newUserdat={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user=await User.findByIdAndUpdate(req.params.id,newUserdat,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    if(!user){return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`,400))}

    res.status(200).json({
        success:true,
        message:"User Role Updated Successfully"
    })
    
    
    })



    //delete a user(--admin--)
    
exports.deleteUser=catchAsynError(async(req,res,next)=>{


    const user=await User.findById(req.params.id)
    if(!user){return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`,400))}

    await user.remove();

    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
    })
    
    
    })