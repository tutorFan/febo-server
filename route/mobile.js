const express = require("express");
const route = express.Router();
const db = require("../config/db_manager");


route.get("/",(req,res)=>{
  res.render('pages/index');
})


module.exports = route;