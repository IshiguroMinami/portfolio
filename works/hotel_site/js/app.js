$(function() {
  // 1. Slickスライダー初期化
  $('.slider').slick({
    arrows: false,
    //dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,  // マウスドラッグ無効
    swipe: false,
    pauseOnFocus: false,//フォーカスで一時停止
    pauseOnHover: false,//マウスホバーで一時停止
    pauseOnDotsHover: false//ドットナビをマウスホバーで一時停止
  });

  // 2. KVコピー表示（左寄せ）
  setTimeout(function() {
    $('.kv-copy').addClass('show');
  }, 2000);

  // 3. スクロールフェードイン
  function scrollFadeIn() {
    $('.section-title, .concept-item, .room .section-title, .room-card, .access .section-title, .access-content, .contact .section-title, .contact-content').each(function() {
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll + windowHeight > elemPos + 100) {
        $(this).addClass('show');
      }
    });
  }
  $(window).on('scroll load', scrollFadeIn);

  // 4. ハンバーガーメニュー開閉
  $('.header-menu-toggle').on('click', function() {
    $('.header-nav').toggleClass('active');
    $(this).toggleClass('open');
  });

});
