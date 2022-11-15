
const req = require("express/lib/request");
const catchAsynError = require("../middleware/catchAsynError");
const Product=require("../models/productModels");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorHandler");


//create product----admin
exports.createProduct=catchAsynError(async(req,res,next)=>{
const product=await Product.create(req.body);

res.json({
    success:true,
    product
})
})

//get all products
exports.getAllProducts=catchAsynError( async(req,res,next)=>{

  
    const resultPerPage=8;
    const ProductCount= await Product.countDocuments();

//api feature implementation(search,filter,pagination)
const apifeature=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);


const products=await apifeature.query;
res.json({
    success:true,
    products,ProductCount,resultPerPage,
})
});

//get a specific product details
exports.getAProduct=catchAsynError(async(req,res,next)=>{
  
    const product=await Product.findById(req.params.id);
  
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
    res.json({
        success:true,
        product,
        // ProductCount
    })
    })

//update a product --admin
exports.updateProduct=catchAsynError(async(req,res,next)=>{

let product=await Product.findById(req.params.id);
if(!product){
    return next(new ErrorHandler("Product not found",404))
}


product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });


})

//delete a product-- admin
exports.deleteProduct=catchAsynError(async(req,res,next)=>{

    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    await product.remove();

    res.json({
        success:true,
        message:"Product successfully deleted"
    })



})



//create or update product reviews
exports.createProductReviews=catchAsynError(async(req,res,next)=>{
const {comment,productId}=req.body;
const rating=Number(req.body.rating)
// rating=Number(rating);
const review={
    user:req.user._id,
    name:req.user.name,
    rating,
    comment,

}

const product=await Product.findById(productId);
if(!product){
    return next(new ErrorHandler(`Product does not exist with  ID: ${req.user_id}`))
}

const isReveiewd=product.reviews.find((rev)=> rev.user.toString()===req.user._id.toString());
if(isReveiewd){
    product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });

}
else{
    product.reviews.push(review);
    product.numOfReviews=product.reviews.length;
}
let avg=0;
product.reviews.forEach((rev)=>{
avg+=rev.rating;
})
product.ratings=avg/product.reviews.length;

await product.save({validatorBeforeSave:false});

res.status(200).json({
    success:true,
    message:"Review added successfully"
})

})

//get  product reviews
exports.getproductReviews=catchAsynError(async(req,res,next)=>{
const product=await Product.findById(req.query.id)

if(!product){
    return next(new ErrorHander("Product not found", 404)); 
}

res.status(200).json({
    success:true,
    reviews:product.reviews,
})
})

/// Delete Review

exports.deleteReview = catchAsynError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
      message:"Review deleted successfully"
    });
  });