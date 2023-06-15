import express from "express";
import { body } from "express-validator";
import { validateResultMiddleware } from "./validateResultMiddleware.js";
const app = express();
app.use(express.json());

app.post("/calculate",
[body("x").exists().isInt({min:1, max:50}),
body("y").exists().isInt({min:1,max:50}),
body("operation").exists().isIn(['+','-','*','/'])],
validateResultMiddleware,
(req,res)=>{
const {x,y, operation} = req.body;
switch(operation){
    case "+" : res.send(x+y);break;
    case "-" : res.send(x-y); break;
    case "*" : res.send(x*y);break;
    case "/" : res.send(x/y); break;
} 

}
)

app.use((error, req, res, next) => {
    const statusCode = error.statusCode;
    res.status(statusCode).send({
      status: false,
      msg: error.message,
      stack: error.stack,
      statusCode
    });
  });

  
app.listen(3000, () => {
  console.log("server started");
});
