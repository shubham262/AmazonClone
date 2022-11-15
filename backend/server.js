const app=require("./app");
const dotenv=require("dotenv")
const connectDatabase=require("./config/database");
//config
dotenv.config({path:"backend/config/config.env"});
var port = process.env.PORT ||4000;

//connecting to database
connectDatabase();


app.listen(port,function(req,res){
    console.log(`server is running at port ${port}`)
})