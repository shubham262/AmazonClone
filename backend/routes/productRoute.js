const express=require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getAProduct, createProductReviews, getproductReviews,deleteReview} = require("../controllers/productsController");
const { isAuthenticatedUser, authoriseRoles } = require("../middleware/auth");
const router=express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products/new").post(isAuthenticatedUser,authoriseRoles("admin"),createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser,authoriseRoles("admin"),updateProduct).delete(isAuthenticatedUser,authoriseRoles("admin"),deleteProduct);
// router.route("/products/:id").get(getAProduct);
router.route("/products/:id").get(getAProduct);
router.route("/review").put(isAuthenticatedUser,createProductReviews);
router.route("/reviews").get(getproductReviews).delete(isAuthenticatedUser,deleteReview)
module.exports=router;