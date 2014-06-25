(function() {
  var previewReload;

  Array.prototype.shuffle = function() {
    var i, j, t;
    i = this.length;
    while (i) {
      j = Math.floor(Math.random() * i);
      t = this[--i];
      this[i] = this[j];
      this[j] = t;
    }
    return this;
  };

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
    var color, height, langs, size, width;
    color = {};
    color.bg = $('#color-bg').val();
    color.text = $('#color-text').val();
    color.check = $('#color-check').val();
    size = $('.size-select :checked');
    width = size.data('width');
    height = size.data('height');
    langs = [];
    $('.langs input').each(function() {
      var checked, lang, str;
      lang = $(this).val();
      checked = $(this).is(':checked') ? "<i class='fa fa-check fa-stack-1x' />" : '';
      str = "<li> <span class='fa-stack'> <i class='fa fa-square-o fa-stack-1x' /> " + checked + " </span> " + lang + " </li>";
      langs.push(str);
      return langs.push(str);
    });
    preview = $('#preview');
    preview.css({
      backgroundColor: '#' + color.bg,
      color: '#' + color.text,
      width: width / 4,
      height: height / 4
    });
    preview.find('ul').html(langs.join(' '));
    return preview.find('.fa-check').css('color', '#' + color.check);
  };

}).call(this);
