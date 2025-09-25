$(function () {
  // ===== 定数 =====
  const SCROLL_ANIMATION_TRIGGER_OFFSET = 200; // スクロール時の画像アニメーション発火位置
  const MOUNT_AREA_SHOW_OFFSET = 600;          // mount_area01表示位置
  const COPY_STANDARD_PC_OFFSET = 200;         // PC表示位置
  const COPY_STANDARD_SP_OFFSET = 100;         // SP表示位置
  const SMOOTH_SCROLL_SPEED = 500;             // スムーススクロール速度
  const KV_SLIDE_INTERVAL = 5000;              // KVスライド切り替え間隔
  const HOME_LEAD_TRIGGER_RATIO = 0.5;         // ヘッダーメニュー切り替えトリガー（中央）

  $('html, body').scrollTop(0);

  function initPageAnimations() {
    if (!$('body').hasClass('home')) return;

    $('body').addClass('home_load');
    $('.kv_area01 .kv01').addClass('slide-start');
    $('.kv01').addClass('pre show end');
    $('.load_anime, .loading').addClass('hide');
    $('.home_key_copy .line:nth-child(1)').addClass('show slide');
    $('.home_key_copy .line:nth-child(2)').addClass('show slide');
    $('.kv_in, .kv_area').addClass('show');
    $('.mount_area_key .mount').addClass('slide');
    $('header .navi_area').addClass('show');
  }

  function initScrollAnimations() {
    $(window).on('scroll', function () {
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      const windowWidth = $(window).width();

      $('.home_lead .img').each(function () {
        const imgPos = $(this).offset().top;

        if (scroll > imgPos - windowHeight + SCROLL_ANIMATION_TRIGGER_OFFSET) {
          $(this).addClass('show');
        } else {
          $(this).removeClass('show');
        }

        if (scroll > imgPos - windowHeight + MOUNT_AREA_SHOW_OFFSET) {
          $('.mount_area01').removeClass('hide');
        } else {
          $('.mount_area_key .mount').addClass('slide');
          $('.mount_area01').addClass('hide');
        }
      });

      $('.copy_standard').each(function () {
        const imgPos = $(this).offset().top;
        const showOffset = windowWidth > 769 ? COPY_STANDARD_PC_OFFSET : COPY_STANDARD_SP_OFFSET;

        if (scroll > imgPos - windowHeight + showOffset) {
          $(this).find('.line:nth-child(1)').addClass('show slide');
          $(this).find('.line:nth-child(2)').addClass('show slide');
          $(this).find('.line:nth-child(3)').addClass('show slide');
        }
      });

      // ヘッダーメニュー表示切り替え（home_leadの中央を基準）
      const homeLeadTop = $('.home_lead').offset().top;
      if (scroll > homeLeadTop - windowHeight * HOME_LEAD_TRIGGER_RATIO) {
        $('body').removeClass('menu_show');
      } else {
        $('body').addClass('menu_show');
      }
    });
  }

  function initKvSimpleSwitch() {
    $('.kv_area').each(function () {
      const $area = $(this);
      const $slides = $area.find('.kv');
      let current = 0;

      if ($slides.length === 0) return;

      $slides.removeClass('show');
      $slides.eq(current).addClass('show');

      setInterval(() => {
        $slides.eq(current).removeClass('show');
        current = (current + 1) % $slides.length;
        $slides.eq(current).addClass('show');
      }, KV_SLIDE_INTERVAL);
    });
  }

  function initSlider() {
    $('.slider').slick({
      arrows: false,
      dots: false,
      autoplay: true,
      autoplaySpeed: 3000,
      draggable: false,
      swipe: false,
      touchMove: false,
      pauseOnHover: false,
      pauseOnFocus: false,
      centerMode: true,
      centerPadding: '30%',
      slidesToShow: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: false,
            centerPadding: '0',
            slidesToShow: 1
          }
        }
      ]
    });
  }

  function setViewport() {
    const ua = navigator.userAgent;
    const isMobile = ua.match(/iPhone|iPod|Android.+Mobile/);
    const metaTag = isMobile
      ? '<meta name="viewport" content="width=device-width,initial-scale=1">'
      : '<meta name="viewport" content="width=1200">';
    $('head').prepend(metaTag);
  }

  function fixNavigation() {
    $('body').addClass('navi_fix');
  }

  function initSmoothScroll() {
    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      const href = $(this).attr('href');
      const target = href === '#' || href === '' ? 'html' : href;
      const position = $(target).offset().top;
      $('html, body').animate({ scrollTop: position }, SMOOTH_SCROLL_SPEED, 'swing');
    });
  }

  function initToggleMenu() {
    $(".toggle").on("click", function () {
      const isActive = $(this).hasClass("active");
      $(this).toggleClass("active", !isActive);
      $("header").toggleClass("normal", !isActive);
      $("body").toggleClass("noscroll", !isActive);
      $("#menu").toggleClass("active", !isActive);
    });
  }

  function initModal() {
    $(document).on('click', '.modal_open', function (e) {
      e.stopPropagation();
      $(this).find(".modal").addClass("active");
      $(".modal_bg").addClass("active");
    });

    $(document).on('click', '.modal_close', function (e) {
      e.stopPropagation();
      $(this).closest(".modal").removeClass("active");
      $(".modal_bg").removeClass("active");
    });

    $(document).on('click', '.modal_next, .modal_prev', function (e) {
      e.stopPropagation();
      const direction = $(this).hasClass('modal_next') ? 'next' : 'prev';
      switchModal($(this), direction);
    });

    function switchModal($trigger, direction) {
      const $currentModal = $trigger.closest('.modal');
      const $currentChild = $currentModal.parents('.child');
      const $targetChild = direction === 'next' ? $currentChild.next('.child') : $currentChild.prev('.child');
      const $targetModal = $targetChild.find('.modal');

      $currentModal.removeClass('active');

      if ($targetModal.length) {
        $targetModal.addClass('active');
      } else {
        $(".modal_bg").removeClass("active");
      }
    }
  }

  // ===== 初期化実行 =====
  initPageAnimations();
  initScrollAnimations();
  initSlider();
  setViewport();
  fixNavigation();
  initSmoothScroll();
  initToggleMenu();
  initModal();
  initKvSimpleSwitch();
});
