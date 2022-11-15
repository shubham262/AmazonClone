const express=require("express");
const { registerAuser, loginAuser, logout, forgotPassword, resetPassword, getAuthUserdetails,
updateUserPasswword, updateUserProfile, getAllUserdetails, 
getSingleUserdetails, updateUserRole, deleteUser } = require("../controllers/userControllers");
const { isAuthenticatedUser, authoriseRoles } = require("../middleware/auth");
const router=express.Router();

router.route("/register").post(registerAuser);
router.route("/login").post(loginAuser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser,getAuthUserdetails);
router.route("/password/update").put(isAuthenticatedUser,updateUserPasswword);
router.route("/me/update").put(isAuthenticatedUser,updateUserProfile);

//admin routes

router.route("/admin/users").get(isAuthenticatedUser,authoriseRoles("admin"),getAllUserdetails);
router.route("/admin/user/:id").get(isAuthenticatedUser,authoriseRoles("admin"),getSingleUserdetails).put(isAuthenticatedUser,authoriseRoles("admin"),updateUserRole).delete(isAuthenticatedUser,authoriseRoles("admin"),deleteUser)
module.exports=router;



