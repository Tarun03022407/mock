const express = require("express");
const app = express();
// const jwt = require("jsonwebtoken");
// const bcrypt=require("bcrypt")
const {authenticate} = require("./middlewares/authenticate.middleware")

const {userRouter}=require("./routes/user.routes")
const {jobRouter} =require("./routes/Job.route")
app.use(express.json());
const { connection } = require("./configs/db");
app.use("/users",userRouter)
// const { UserModel } = require("./models/users.model");
// app.use(authenticate)
app.use("/jobs",jobRouter)


app.listen(process.env.port, async () => {
  try {
    await connection;
    // console.log(connection);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
    // res.send("something went wrong")
  }
  console.log(`server running at ${process.env.port} `);
});
