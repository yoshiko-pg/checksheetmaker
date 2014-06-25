Array.prototype.shuffle = ->
  i = this.length
  while(i)
    j = Math.floor(Math.random()*i)
    t = this[--i]
    this[i] = this[j]
    this[j] = t
  return this


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
  color.bg = $('#color-bg').val()
  color.text = $('#color-text').val()
  color.check = $('#color-check').val()

  size = $('.size-select :checked')
  width = size.data('width')
  height = size.data('height')

  langs = []
  $('.langs input').each ->
    lang =  $(this).val()
    checked = if $(this).is(':checked') then "<i class='fa fa-check fa-stack-1x' />" else ''
    str = "<li>
    <span class='fa-stack'>
      <i class='fa fa-square-o fa-stack-1x' />
      #{checked}
    </span>
    #{lang}
    </li>"
    langs.push str
    langs.push str
  #langs.shuffle()


  # 反映
  preview = $('#preview')
  preview.css({
    backgroundColor: '#'+color.bg,
    color: '#'+color.text,
    width: width / 4,
    height: height / 4
  })
  preview.find('ul').html(langs.join(' '))
  preview.find('.fa-check').css('color', '#'+color.check)

  #チェックボックスの色変える
