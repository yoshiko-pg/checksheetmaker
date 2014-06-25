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
  setLangsToPreview()
  shuffleList()
  previewReload()

  $('#form').on change: ->
    previewReload()

  $('#shuffle').on click: ->
    shuffleList()

  preview_offset = preview_wrap.offset().top
  $(window).scroll ->
    if($(window).scrollTop() > preview_offset - 25)
      preview_wrap.addClass('fixed')
    else
      preview_wrap.removeClass('fixed')

setLangsToPreview = ->
  langs = []
  $('.langs input').each ->
    lang =  $(this).val()
    str = "<li>
    <span class='fa-stack'>
      <i class='fa fa-square-o fa-stack-1x' />
    </span>
    #{lang}
    </li>"
    langs.push str
    #langs.push str
  $('#preview').find('ul').html(langs.join(''))

previewReload = ->
  preview = $('#preview')

  # 必要な値を修得
  color = {}
  color.bg = $('#color-bg').val()
  color.text = $('#color-text').val()
  color.check = $('#color-check').val()

  size = $('.size-select :checked')
  width = size.data('width')
  height = size.data('height')
  fontsize = size.data('fontsize')
  lineheight = size.data('lineheight')

  preview.find('li').each ->
    if $('.langs input[value="'+$(this).text().replace(/\s+/g, '')+'"]:checked').length
      $(this).find('.fa-stack').append("<i class='fa fa-check fa-stack-1x' />")
    else if $(this).find('.fa-check').length
      $(this).find('.fa-check').remove()

  # 反映
  preview.css({
    backgroundColor: '#'+color.bg,
    color: '#'+color.text,
    width: width / 4,
    height: height / 4,
    fontSize: fontsize
  })
  preview.find('.fa-stack').css({
    height: lineheight+'em',
    lineHeight: lineheight+'em'
  })

  preview.find('.fa-check').css('color', '#'+color.check)

shuffleList = ->
  preview = $('#preview')
  langs = []
  preview.find('li').each ->
    langs.push '<li>'+$(this).html()+'</li>'
  langs.shuffle()
  preview.find('ul').html(langs.join(''))
