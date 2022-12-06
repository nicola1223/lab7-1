playing = false
was_alerted = false
$(function() {
  if (!was_alerted){
    $('.popup').css('display', 'inherit')
    $('html').css('overflow-y', 'hidden')
  }


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
        $('audio')[0].play()
        $('audio').toggleClass('playing')
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