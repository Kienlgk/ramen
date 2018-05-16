function tab(sidebar, content, init) {
  $(document).on("click", sidebar + " ul li a", function () {
    let oldActive = $(sidebar + " ul li.active");
    let oldTab = $(content + " .section.active");
    let newTab = $(this).parent().data("tab");

    oldActive.removeClass("active");
    oldTab.removeClass("active");
    $(this).parent().addClass("active");
    $(newTab).addClass("active");
    init[newTab];
  })
}

$(document).ready(function () {

  var init = {};
  tab(".sidebar", ".content-wrapper", init);

  $(document).on("click", "#login", function () {
    location.href = "/users/login";
  })
  $(document).on("click", "#logout", function () {
    $.post("/api/users/logout", function (data) {
      if (data.code == 200) {
        window.location.href = "/";
      }
    })
  })

  $("#login-form").on("submit", function (e) {

    e.preventDefault();
    let data = $(e.target).serialize();

    $.ajax({
      url: '/api/v1/login',
      method: "POST",
      data: data,
      success(res) {
        if (res.success) {
          window.location.href = "/dashboard";
        } else {
          alert("đăng nhập thất bại");
        }
      },
      error(err) {
        alert(err);
      }
    })

  });

});
