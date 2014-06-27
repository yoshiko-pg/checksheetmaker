Array.prototype.shuffle = ->
  i = this.length
  while(i)
    j = Math.floor(Math.random()*i)
    t = this[--i]
    this[i] = this[j]
    this[j] = t
  return this


$ ->
  setLangsToPreview()
  shuffleList()
  setFormFromLocalStorage()
  previewReload()

  $('#form').on change: ->
    previewReload()
    rememberToLocalStorage()

  $('#shuffle').on click: ->
    shuffleList()

  $('#make').on click: ->
    makeImage()

  $('#sp_preview').on click: ->
    spPreview()

  # スクロールしたらプレビューを固定
  preview_wrap = $('#preview_wrap')
  preview_offset = preview_wrap.offset().top
  $(window).scroll ->
    if($(window).scrollTop() > preview_offset - 25)
      preview_wrap.addClass('fixed')
    else
      preview_wrap.removeClass('fixed')

# プレビューdivの中へ言語一覧をセット
setLangsToPreview = ->
  langs = []
  $('.langs label').each ->
    lang =  $(this).text().replace(/^\s+/, '')
    str = "<li>
    <span class='fa-stack'>
      <i class='fa fa-square-o fa-stack-1x' />
    </span>
    #{lang}
    </li>"
    langs.push str
  $('#preview').find('ul').html(langs.join(''))

# プレビューを更新
previewReload = ->
  # 必要な値を修得
  color = getColorValue()
  size = $('.size-select :checked')
  width = size.data('width')
  height = size.data('height')
  fontsize = size.data('fontsize')
  lineheight = size.data('lineheight')

  # 反映
  preview = $('#preview')
  preview.find('li').each ->
    if $('.langs input[value="'+$(this).text().replace(/\s+/g, '')+'"]:checked').length
      $(this).find('.fa-stack').append("<i class='fa fa-check fa-stack-1x' />")
    else if $(this).find('.fa-check').length
      $(this).find('.fa-check').remove()

  preview.css({
    backgroundColor: '#'+color.bg,
    color: '#'+color.text,
    width: width,
    height: height,
    fontSize: fontsize
  })
  preview.find('.fa-stack').css({
    height: lineheight+'em',
    lineHeight: lineheight+'em'
  })
  preview.find('.fa-check').css('color', '#'+color.check)

  # スマホ向け overflow: hiddenが効かない問題解消
  $('#hider').css({
    width: width * 0.17,
    height: height * 0.17
  })

# プレビューの言語リストをシャッフル
shuffleList = ->
  preview = $('#preview')
  langs = []
  preview.find('li').each ->
    langs.push '<li>'+$(this).html()+'</li>'
  langs.shuffle()
  preview.find('ul').html(langs.join(''))

# 画像を生成
makeImage = ->
  makebtn = $('#make')
  makebtn.button('loading')
  preview = $('#preview')
  preview.removeClass('minimize').appendTo('html')
  $('#makeModal').modal('show')
  html2canvas(preview, {
    onrendered: (canvas)->
      dataURI = canvas.toDataURL('image/png')
      $('#my_image').attr('src', dataURI)
      $('#download').attr('href', dataURI)
      preview.addClass('minimize').appendTo('#hider')
      makebtn.button('reset')
  })

# スマホ用プレビュー表示
spPreview = ->
  $('#spModal').modal('show').find('.modal-body').append($('#preview_wrap'))

# 設定値をlocalStorageに保存
rememberToLocalStorage = ->
  langs = []
  $('.langs :checked').each ->
    langs.push $(this).val()
  localStorage['size'] = $('.size-select :checked').attr('id')
  localStorage['langs'] = langs
  localStorage['color'] = JSON.stringify(getColorValue())

# localStorageから各項目を設定
setFormFromLocalStorage = ->
  if localStorage['size']
    $('.size-select #'+localStorage['size']).attr('checked', true)
  if localStorage['langs']
    langs = localStorage['langs'].split(',').forEach (item) ->
      $(".langs input[value='#{item}']").attr("checked", true)
  if localStorage['color']
    color = JSON.parse(localStorage['color']);
    $('#color-bg').val(color.bg)
    $('#color-text').val(color.text)
    $('#color-check').val(color.check)

# 色の設定値を取得
getColorValue = ->
  return {
    bg: $('#color-bg').val()
    text: $('#color-text').val()
    check: $('#color-check').val()
  }
