document.addEventListener('DOMContentLoaded', function(){
  new SimpleAdaptiveSlider('.slider', {
    loop: true,
    autoplay: false,
    interval: 5000,
    swipe: true,
  });
});

playing = false
was_alerted = false
$(function() {
  navigation_top = $('.navigation').offset().top;        // запоминаем положение меню
  orig_navigation_top = navigation_top;
  w_height = $(window).height()
  $(window).resize(function() {
    if ($(this).width() <= 900){
      $('.navigation__menu').css('left', `-${$('.navigation__menu').outerWidth()}px`); 
    }
    else {
      $('.navigation__menu').css('left', '');
    }
    navigation_top = orig_navigation_top + (($(window).height())/1 - (w_height/1));
  });
  $(window).scroll(function (e) {             // отслеживаем событие прокрутки страницы
    if ($(window).scrollTop() > navigation_top) {  // если прокрутка дошла до меню
      if ($('.navigation').css('position') != 'fixed') {  // проверяем, если меню еще не зафиксировано
        $('.navigation').css('position','fixed');  // задаем блоку меню свойство position = fixed
        $('.navigation').css('top','0');           // положение в самом верху
        $('.main').css('margin-top','50px'); // делаем отступ, чтобы контент не "скакал" в момент фиксации меню
        if (!was_alerted){
            $('.popup').css('display', 'inherit')
            $('html').css('overflow-y', 'hidden')
          }
        }
    } else {                                 // прокрутка страницы обратно вверх достигла место "перехода" меню
      if ($('.navigation').css('position') == 'fixed') {  // если меню зафиксировано
        $('.navigation').css('position','');
        $('.navigation').css('top','');
        $('.main').css('margin-top','');
      }
    }
  });
  
  $('#volume').click(function (e) { 
    e.preventDefault();
    if ($('#volume').hasClass("fa-volume-high")){
        $('#volume').removeClass("fa-volume-high")
        $('#volume').toggleClass("fa-volume-off")
        $('.playing')[0].pause()
        $('.playing').currentTime = 0
        $('.playing').removeClass('playing')
        playing = false
    }
    else if ($('#volume').hasClass("fa-volume-off")){
        playing = true
        func($('.slider__item_active').attr('data-index')/1)
        $('#volume').removeClass("fa-volume-off")
        $('#volume').toggleClass("fa-volume-high")
    }
  });

  $('.popup button').click(function() {
    $('.popup').css('display', 'none')
    was_alerted = true
    $('html').css('overflow-y', '')
  });

  let handleMatchMedia = function(mediaQuery) {
    if (mediaQuery.matches) {
      $('#close__menu').click(function() {
        width = $('.navigation__menu').outerWidth()
        $('.navigation__menu').css('transform', `translate(-${width + 0.5}px)`); 
        // $('html').css('overflow-y', '')
        $('#close__menu').css('display', 'none')
      });
    }
  }
  
  mql = window.matchMedia('screen and (max-width: 900px)');
  handleMatchMedia(mql);
  mql.addEventListener("", handleMatchMedia);

  $('.mobile__menu').click(function() {
    $('#close__menu').css('display', 'inherit')
    // $('html').css('overflow-y', 'hidden')
    $('.navigation__menu').css('transition', 'transform 1s')
    $('.navigation__menu').css('transform', `translate(${$('.navigation__menu').outerWidth()  - 0.5}px)`)
  });
});