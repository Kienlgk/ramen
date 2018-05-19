window.normalHeight = window.innerHeight;
window.keyboardHeight = 0;


function keyboardScroll(selector) {
  var fullSelector = selector + ' input, ' + selector  + ' textarea';
  $(document).on('focus', fullSelector, function(event) {
    var inputTop = $(event.target).offset().top;
    var currentScroll = $(selector).scrollTop();
    var scrollTo = currentScroll + inputTop;
    console.log('input focus');
    $(selector).animate({
      scrollTop: scrollTo
    }, 500);
  })
}

$(document).on('keyup', 'input', function(event) {
  if(event.keyCode == 13) { // 13 = Enter Key
    $(this).blur();
    event.preventDefault();
  }
});

$(window).resize(function(event) {
  if (window.innerHeight < window.normalHeight) {
    window.keyboardHeight = window.normalHeight - window.innerHeight;
  }
})
keyboardScroll('page-trip .scroll-content');
