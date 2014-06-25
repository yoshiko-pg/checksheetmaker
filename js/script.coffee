$ ->
  preview_wrap = $('#preview_wrap')
  previewReload(preview)

  $('#form').change ->
    previewReload()

  preview_offset = preview_wrap.offset().top
  $(window).scroll ->
    if($(window).scrollTop() > preview_offset - 25)
      preview_wrap.addClass('fixed')
    else
      preview_wrap.removeClass('fixed')

previewReload = (preview)->
  # 必要な値を修得
  color = {}
  size = $('.size-select :checked')
  color.bg = $('#color-bg').val()
  color.text = $('#color-text').val()
  color.check = $('#color-check').val()
  width = size.data('width')
  height = size.data('height')
  console.log width, height

  # 反映
  preview = $('#preview')
  preview.css({
    backgroundColor: '#'+color.bg,
    color: '#'+color.text,
    width: width / 4,
    height: height / 4
  })

  #チェックボックスの色変える
