(function() {
  var makeImage, previewReload, setLangsToPreview, shuffleList;

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
    setLangsToPreview();
    shuffleList();
    previewReload();
    $('#form').on({
      change: function() {
        return previewReload();
      }
    });
    $('#shuffle').on({
      click: function() {
        return shuffleList();
      }
    });
    $('#make').on({
      click: function() {
        return makeImage();
      }
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

  setLangsToPreview = function() {
    var langs;
    langs = [];
    $('.langs input').each(function() {
      var lang, str;
      lang = $(this).val();
      str = "<li> <span class='fa-stack'> <i class='fa fa-square-o fa-stack-1x' /> </span> " + lang + " </li>";
      return langs.push(str);
    });
    return $('#preview').find('ul').html(langs.join(''));
  };

  previewReload = function() {
    var color, fontsize, height, lineheight, preview, size, width;
    preview = $('#preview');
    color = {};
    color.bg = $('#color-bg').val();
    color.text = $('#color-text').val();
    color.check = $('#color-check').val();
    size = $('.size-select :checked');
    width = size.data('width');
    height = size.data('height');
    fontsize = size.data('fontsize');
    lineheight = size.data('lineheight');
    preview.find('li').each(function() {
      if ($('.langs input[value="' + $(this).text().replace(/\s+/g, '') + '"]:checked').length) {
        return $(this).find('.fa-stack').append("<i class='fa fa-check fa-stack-1x' />");
      } else if ($(this).find('.fa-check').length) {
        return $(this).find('.fa-check').remove();
      }
    });
    preview.css({
      backgroundColor: '#' + color.bg,
      color: '#' + color.text,
      width: width,
      height: height,
      fontSize: fontsize
    });
    preview.find('.fa-stack').css({
      height: lineheight + 'em',
      lineHeight: lineheight + 'em'
    });
    return preview.find('.fa-check').css('color', '#' + color.check);
  };

  shuffleList = function() {
    var langs, preview;
    preview = $('#preview');
    langs = [];
    preview.find('li').each(function() {
      return langs.push('<li>' + $(this).html() + '</li>');
    });
    langs.shuffle();
    return preview.find('ul').html(langs.join(''));
  };

  makeImage = function() {
    var modal, preview;
    preview = $('#preview');
    preview.removeClass('minimize').appendTo('html');
    modal = $('#makeModal');
    modal.modal('show');
    return html2canvas(preview, {
      onrendered: function(canvas) {
        var dataURI;
        dataURI = canvas.toDataURL('image/png');
        $('#my_image').attr('src', dataURI);
        $('#download').attr('href', dataURI);
        $('#preview').appendTo('html');
        return preview.addClass('minimize').appendTo('#preview_wrap');
      }
    });
  };

}).call(this);
