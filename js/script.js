(function() {
  var getColorValue, makeImage, previewReload, rememberToLocalStorage, setFormFromLocalStorage, setLangsToPreview, shuffleList, spPreview;

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
    setFormFromLocalStorage();
    previewReload();
    $('#form').on({
      change: function() {
        previewReload();
        return rememberToLocalStorage();
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
    $('#sp_preview').on({
      click: function() {
        return spPreview();
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
    $('.langs label').each(function() {
      var lang, str;
      lang = $(this).text().replace(/^\s+/, '');
      str = "<li> <span class='fa-stack'> <i class='fa fa-square-o fa-stack-1x' /> </span> " + lang + " </li>";
      return langs.push(str);
    });
    return $('#preview').find('ul').html(langs.join(''));
  };

  previewReload = function() {
    var color, fontsize, height, lineheight, preview, size, width;
    preview = $('#preview');
    color = getColorValue();
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
    preview.find('.fa-check').css('color', '#' + color.check);
    return $('#hider').css({
      width: width * 0.17,
      height: height * 0.17
    });
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
    var makebtn, modal, preview;
    makebtn = $('#make');
    makebtn.button('loading');
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
        preview.addClass('minimize').appendTo('#hider');
        return makebtn.button('reset');
      }
    });
  };

  spPreview = function() {
    return $('#spModal').modal('show').find('.modal-body').append($('#preview_wrap'));
  };

  rememberToLocalStorage = function() {
    var langs;
    langs = [];
    $('.langs :checked').each(function() {
      return langs.push($(this).val());
    });
    localStorage['size'] = $('.size-select :checked').attr('id');
    localStorage['langs'] = langs;
    return localStorage['color'] = JSON.stringify(getColorValue());
  };

  setFormFromLocalStorage = function() {
    var color, langs;
    if (localStorage['size']) {
      $('.size-select #' + localStorage['size']).attr('checked', true);
    }
    if (localStorage['langs']) {
      langs = localStorage['langs'].split(',').forEach(function(item) {
        return $(".langs input[value='" + item + "']").attr("checked", true);
      });
    }
    if (localStorage['color']) {
      color = JSON.parse(localStorage['color']);
      $('#color-bg').val(color.bg);
      $('#color-text').val(color.text);
      return $('#color-check').val(color.check);
    }
  };

  getColorValue = function() {
    return {
      bg: $('#color-bg').val(),
      text: $('#color-text').val(),
      check: $('#color-check').val()
    };
  };

}).call(this);
