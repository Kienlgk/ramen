$(document).ready(function () {

  $('#user-menu').DataTable({
    "paging": true,
    "lengthChange": false,
    "searching": true,
    "ordering": true,
    "info": true,
    "autoWidth": false
  });

  $("#user-create-form").on("submit", function (e) {
    e.preventDefault();
    var data = $(e.target).serialize();
    $.ajax({
      url: '/api/v1/user',
      method: "POST",
      data: data,
      success: function (res) {
        if (res.success) {
          swal(
            'Tạo user thành công!',
            'success'
          );
          setTimeout(function () {
            window.location.reload();
          }, 500);
        }else
          swal(
            'Tạo user không thành công!',
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
    });
  });


  $(".user-delete").on("click", function (e) {
    e.preventDefault();
    let id = $(e.target).data("id");

    swal({
      title: 'Xóa user đơn',
      text: "Bạn chắc chắn muốn xóa user này?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(function () {
      $.ajax({
        url: '/api/v1/user/' + id,
        method: "DELETE",
        success(res) {
          console.log(res);
          if (res.success) {
            swal(
              'Xóa thành công!',
              'User đã bị xóa!',
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
        },
        error(err) {
          swal(
            'Xóa thất bại!',
            'Có lỗi đã xảy ra',
            'error'
          )
        }
      });
    })
  });
});
