$(document).ready(function () {

  $('#order-menu').DataTable({
    "paging": true,
    "lengthChange": false,
    "searching": true,
    "ordering": true,
    "info": true,
    "autoWidth": false
  });

  $("#order-create-form").on("submit", function (e) {
    e.preventDefault();
    var data = $(e.target).serialize();
    $.ajax({
      url: '/api/v1/order',
      method: "POST",
      data: data,
      success: function (res) {
        if (res.success) {
          swal(
            'Tạo bàn thành công!',
            'success'
          );
          setTimeout(function () {
            window.location.reload();
          }, 500);
        }else
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
    });
  });


  $(".order-delete").on("click", function (e) {
    e.preventDefault();
    let id = $(e.target).data("id");

    swal({
      title: 'Xóa hóa đơn',
      text: "Bạn chắc chắn muốn xóa hóa đơn này?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(function () {
      $.ajax({
        url: '/api/v1/order/' + id,
        method: "DELETE",
        success(res) {
          console.log(res);
          if (res.success) {
            swal(
              'Xóa thành công!',
              'Hóa đơn đã bị xóa!',
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
