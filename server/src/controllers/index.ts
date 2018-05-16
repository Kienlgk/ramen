class Index {
    index(req, res) {
      res.render("dashboard");
    }

    login(req, res) {
      res.render("login");
    }

    menu(req, res) {
      res.render("menu", {
        title: 'Món ăn'
      });
    }

    table(req, res) {
      res.render("table", {
        title: 'Bàn'
      });
    }

    user(req, res) {
      res.render("user", {
        title: 'Tài khoản'
      });
    }
}

module.exports = new Index();
