var excludeAuthPaths = ["/login"];

export = function (req, res, next) {
    let account = req.session.account;
    let baseUrl = req.originalUrl;

    console.log("base", baseUrl);
    if (req.method == "POST" && baseUrl.contains("/user"))
        return next();
    for (let path of excludeAuthPaths) {
        if (baseUrl.contains(path))
            return next();
    }

    if (!account) {
        return res.send({
          success: false,
          message: "Session is timeout"
        });
    }

    return next();

}
