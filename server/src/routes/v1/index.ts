var express = require('express');
var router = express.Router();
var auth = require("../../middlewares/auth");
import * as v1 from "../../controllers/v1";


router.use(auth);

let ignores = ["default", "token", "helper"];
for (let key of Object.keys(v1)) {
    if (ignores.contains(key))
        continue;
    let api = v1[key];
    router.get(`/${key}`, api.list);
    router.get(`/${key}/:id`, api.retrieve);
    router.post(`/${key}`, api.create);
    router.put(`/${key}/:id`, api.update);
    router.delete(`/${key}/:id`, api.destroy);
}

module.exports = router;
