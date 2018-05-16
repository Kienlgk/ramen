$(document).ready(function () {

  $('#table-menu').DataTable({
    "paging": true,
    "lengthChange": false,
    "searching": true,
    "ordering": true,
    "info": true,
    "autoWidth": false
  });

  $("#menu-create-form").on("submit", function (e) {
    e.preventDefault();

    var fd = new FormData(e.target);
    console.log(e.target);

    $.ajax({
      url: '/api/v1/menu',
      method: 'POST',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        e.target.reset();
        if (res.success) {
          swal(
            'Tạo bàn thành công!',
            'success'
          );
          setTimeout(function () {
            window.location.reload();
          }, 500);
        } else
          swal(
            'Tạo bàn không thành công!',
            'Có lỗi đã xảy ra: ' + (res.error || ""),
            'error'
          )
      },
      error: function (err) {
        swal(
          'thất bại!',
          'Có lỗi đã xảy ra',
          'error'
        )
      }
    })
  });

  $(".menu-delete").on("click", function (e) {
    e.preventDefault();
    let id = $(e.target).data("id");
    console.log($(e.target));

    swal({
      title: 'Xóa món ăn',
      text: "Bạn chắc chắn muốn xóa món ăn này?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(function () {
      $.ajax({
        url: '/api/v1/menu/' + id,
        method: "DELETE",
        success(res) {
          console.log(res);
          if (res.success) {
            swal(
              'Xóa thành công!',
              'Món ăn đã bị xóa!',
              'success'
            );
            setTimeout(function () {
              window.location.reload();
            }, 500);
          }
          else
            swal(
              'Xóa thất bại!',
              'Có lỗi đã xảy ra: ' + (res.error || ""),
              'error'
            )
        }
      });
    })

  });
});