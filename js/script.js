(function() {
  var previewReload;

  $(function() {
    var preview_offset, preview_wrap;
    preview_wrap = $('#preview_wrap');
    previewReload(preview);
    $('#form').change(function() {
      return previewReload();
    });
    preview_offset = preview_wrap.offset().top;
    return $(window).scroll(function() {
      if ($(window).scrollTop() > preview_offset - 25) {
        return preview_wrap.addClass('fixed');
      } else {
        return preview_wrap.removeClass('fixed');
      }
    });
  });

  previewReload = function(preview) {
    var color, height, size, width;
    color = {};
    size = $('.size-select :checked');
    color.bg = $('#color-bg').val();
    color.text = $('#color-text').val();
    color.check = $('#color-check').val();
    width = size.data('width');
    height = size.data('height');
    console.log(width, height);
    preview = $('#preview');
    return preview.css({
      backgroundColor: '#' + color.bg,
      color: '#' + color.text,
      width: width / 4,
      height: height / 4
    });
  };

}).call(this);
