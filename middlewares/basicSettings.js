"use strict";

let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let path = require("path");
let express = require("express");

module.exports = app => {

    app.set("json spaces", 4);
    app.set("x-powered-by", false);
    app.use(express.static(path.join(__dirname, "public")));
    
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
};
