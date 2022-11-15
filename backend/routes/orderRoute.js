const express=require("express");
const { newOrder, getSingleOrder,myOrders,getAllOrders,updateOrder,deleteOrder} = require("../controllers/orderControllers");
const router=express.Router();
const { isAuthenticatedUser, authoriseRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser,newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authoriseRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authoriseRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authoriseRoles("admin"), deleteOrder);

module.exports=router;