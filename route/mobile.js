const express = require("express");
const route = express.Router();
const db = require("../config/db_manager");
const Contact = require("../models/Conctact");
const Telephone = require("../models/Telephone");

route.get("/",(req,res)=>{
  res.render('index');
})


module.exports = route;