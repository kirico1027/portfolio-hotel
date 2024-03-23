jQuery(function ($) {
  jQuery(function ($) {
    // ハンバーガーメニュー
    $(function () {
      $(".js-hamburger").on("click", function () {
        $(this).toggleClass("is-open");
        if ($(this).hasClass("is-open")) {
          openDrawer();
        } else {
          closeDrawer();
        }
      });

      $(".js-drawer a[href]").on("click", function () {
        closeDrawer();
      });

      $(window).on("resize", function () {
        if (window.matchMedia("(min-width: 768px)").matches) {
          closeDrawer();
        }
      });
    });

    function openDrawer() {
      $(".js-header").addClass("is-open");
      $(".js-drawer").fadeIn();
      $(".js-hamburger").addClass("is-open");
      $("body").addClass("is-noscroll");
    }

    function closeDrawer() {
      $(".js-header").removeClass("is-open");
      $(".js-drawer").fadeOut();
      $(".js-hamburger").removeClass("is-open");
      $("body").removeClass("is-noscroll");
    }
  });

  // mv-swiper
  jQuery(function ($) {
    const mv_swiper = new Swiper(".js-mv-swiper", {
      centeredSlides: true, // 1枚目のスライドを中央にする
      loop: true,
      speed: 2000,
      effect: "fade",
      pagination: {
        el: ".swiper-pagination", // ページネーションのクラス名を指定
        type: "fraction", // ページネーションのtypeを指定
      },
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    });
  });

  // campaign-swiper
  jQuery(function ($) {
    var campaign_swiper = new Swiper(".js-campaign-swiper", {
      centeredSlides: true,
      loop: true,
      speed: 1800,
      slidesPerView: 2,
      spaceBetween: 24,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        768: {
          spaceBetween: 25,
          slidesPerView: 3,
        },
        1025: {
          spaceBetween: 25,
          slidesPerView: 5,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });

  // 画像のアニメーション
  var box = $(".js-colorbox"),
    speed = 700;

  box.each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find($(".color")),
      image = $(this).find("img");
    var counter = 0;

    image.css("opacity", "0");
    color.css("width", "0%");
    color.on("inview", function () {
      if (counter == 0) {
        $(this)
          .delay(200)
          .animate({ width: "100%" }, speed, function () {
            image.css("opacity", "1");
            $(this).css({ left: "0", right: "auto" });
            $(this).animate({ width: "0%" }, speed);
          });
        counter = 1;
      }
    });
  });

  // モーダル
  $(function () {
    $(".page-about-gallery__image img").click(function () {
      $(".modal-image").html($(this).prop("outerHTML"));
      $(".modal-image").fadeIn(500);
      $("body").addClass("is-noscroll");
    });
    $(".modal-image, .modal-image img").click(function () {
      $(".modal-image").fadeOut(500);
      $("body").removeClass("is-noscroll");
    });
  });

  // アーカイブ
  $(function () {
    $(".js-accordion__box .js-accordion__month").css("display", "block");
    $(".js-accordion__box .js-accordion__year").addClass("is-open");
    $(".js-accordion__year").on("click", function () {
      $(this).toggleClass("is-open");
      $(this).next().slideToggle(300);
    });
  });

  // faq
  jQuery(function ($) {
    $(".js-faq-question").on("click", function () {
      $(this).next().slideToggle();
      $(this).toggleClass("is-open");
    });
  });

  // タブ
  $(document).ready(function () {
    // URLから 'tab' パラメータを取得
    const tab = new URL(window.location.href).searchParams.get("tab");

    // タブメニューのクリックイベント
    $(".js-tab-menu").on("click", function () {
      const number = $(this).data("number");

      // アクティブクラスの切り替え
      $(".js-tab-menu").removeClass("is-active");
      $(this).addClass("is-active");
      $(".js-tab-content").removeClass("is-active");
      if (number) {
        $("#" + number).addClass("is-active");
      }
    });

    // 初期状態またはURLパラメータに基づくタブのアクティブ化
    if (tab) {
      // URLパラメータが存在する場合、該当するタブをアクティブにする
      $('.js-tab-menu[data-number="' + tab + '"]').click();
    } else {
      // URLパラメータがない場合、最初のタブをアクティブにする
      $(".js-tab-menu:first").click();
    }
  });

  // blog-detailのページナビ
  $(document).ready(function () {
    // 最初のページで前が無い場合
    if ($(".single-pagenavi__prev").find("a").length === 0) {
      $(".single-pagenavi__prev").hide();
    }

    // 最後のページで次が無い場合
    if ($(".single-pagenavi__next").find("a").length === 0) {
      $(".single-pagenavi__next").hide();
    }
  });

// headerをスクロールすると、色が変わる
  jQuery(window).on('scroll', function () {
    if (jQuery(this).scrollTop() > 100) {
        jQuery('.header, .header__nav-item a, .header__logo-main, .header__logo-sub').addClass('js-change-color');
    } else {
        jQuery('.header, .header__nav-item a, .header__logo-main, .header__logo-sub').removeClass('js-change-color');
    }
  });
  




});
