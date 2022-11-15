const Errorhander=require("../utils/errorHandler");

module.exports=(err,req,res,next)=>{

err.statuscode=err.statuscode||500;
err.message=err.message||"Internal Server error";

//wrong product Id (handling mongodb error)
if(err.name==="CastError"){
    const message=`Resource not found. Invalid ${err.path}`
    err=new Errorhander(message,400)
}


//wrong jsonwebtoken
if(err.name==="jsonWebTokenError"){
    const message=`Json Web Token is not valid,Try again`
    err=new Errorhander(message,400)
}

//json token expired
if(err.name==="TokenExpiredError"){
    const message=`Json Web Token is Expired,Try again`
    err=new Errorhander(message,400)
}




//duplicate email id entered
if(err.code==11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} Entered`
    err=new Errorhander(message,400)
}

res.status(err.statuscode).json({
    success:false,
    // error:err,
    message:err.message
    
})

}  