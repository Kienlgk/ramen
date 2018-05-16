var express = require('express');
var router = express.Router();

var v1 = require("./v1");

var index = require("../controllers/index");
var menu = require("../controllers/v1/menu");
var table = require("../controllers/v1/table");
var order = require("../controllers/v1/order");
var user = require("../controllers/v1/user");

router.use("/api/v1", v1);
router.all('/test', function (req, res) {
    res.render("login");
});

router.get("/dashboard", index.index);
router.get("/menu", menu.view);
router.get("/table", table.view);
router.get("/order", order.view);
router.get("/user", user.view);
router.get("/", index.login);


export = router;
