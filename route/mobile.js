const express = require("express");
const route = express.Router();
const db = require("../config/db_manager");


route.get("*",(req,res)=>{
  res.render('index');
})


module.exports = route;