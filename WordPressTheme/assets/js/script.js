"use strict";

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
    var mv_swiper = new Swiper(".js-mv-swiper", {
      centeredSlides: true,
      // 1枚目のスライドを中央にする
      loop: true,
      speed: 3000,
      effect: "fade",
      pagination: {
        el: ".swiper-pagination",
        // ページネーションのクラス名を指定
        type: "fraction" // ページネーションのtypeを指定
      },

      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      }
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
      /*
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      */
      breakpoints: {
        768: {
          spaceBetween: 25,
          slidesPerView: 3
        },
        1025: {
          spaceBetween: 25,
          slidesPerView: 6.5
        }
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
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
        $(this).delay(200).animate({
          width: "100%"
        }, speed, function () {
          image.css("opacity", "1");
          $(this).css({
            left: "0",
            right: "auto"
          });
          $(this).animate({
            width: "0%"
          }, speed);
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
    var tab = new URL(window.location.href).searchParams.get("tab");

    // タブメニューのクリックイベント
    $(".js-tab-menu").on("click", function () {
      var number = $(this).data("number");

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
      jQuery('.header, .header__nav-item a, .header__logo-main, .header__logo-sub, .header__hamburger span').addClass('js-change-color');
    } else {
      jQuery('.header, .header__nav-item a, .header__logo-main, .header__logo-sub, .header__hamburger span').removeClass('js-change-color');
    }
  });

// section-title文字のアニメーション
$(".section-title__main").each(function () {
  const $section = $(this);
  const $texts = $section.find(".text");

  gsap.fromTo(
    $texts,
    {
      opacity: 0,
      filter: "blur(5px)",
    },
    {
      opacity: 1,
      filter: "blur(0px)",
      stagger: {
        each: 0.1,
        from: "random",
      },
      scrollTrigger: {
        trigger: $section[0], // DOM要素として渡す
        start: "top 85%",
      },
    }
  );
});

// blog-cardのアニメーション
gsap.fromTo(
  ".blog-card",
  {
    opacity: 0,
    y: 30,
  },
  {
    opacity: 1,
    y: 0,
    stagger: {
      each: 0.3,
      from: "randam",
    },
    scrollTrigger: {
      trigger: ".blog-card",
      start: "top center",
    },
  }
);

// contact-formのアニメーション
gsap.fromTo(
  ".form__item",
  {
    opacity: 0,
    x: -30,
  },
  {
    opacity: 1,
    x: 0,
    stagger: {
      each: 0.3,
      from: "start",
    },
    scrollTrigger: {
      trigger: ".form__item",
      start: "top center",
    },
  }
);

// about-galleryのアニメーション
$(window).on('load', function () {
  gsap.registerPlugin(ScrollTrigger);

  $('.page-about-gallery__image img').each(function () {
    const $img = $(this)[0]; // DOM要素として渡す

    // 画像が正しく読み込まれているかチェック
    if ($img.complete && $img.naturalHeight !== 0) {
      gsap.fromTo(
        $img,
        { y: -100 },
        {
          y: 0,
          scrollTrigger: {
            trigger: $img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            // markers: true  // 必要に応じて
          }
        }
      );
    }
  });
});

// カラー変化
$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);

  $(".js-colorChange").each(function () {
      const $textElement = $(this);
      const originalText = $textElement.text();
      $textElement.empty();

      const spans = [];

      // 各文字を span に分割して挿入
      $.each(originalText.split(""), function (i, char) {
          const $span = $("<span>").text(char);
          $textElement.append($span);
          spans.push($span[0]); // 生のDOM要素を格納（GSAPで使うため）
      });

      gsap.to(spans, {
          scrollTrigger: {
              trigger: $textElement[0],
              start: "top 80%",
              end: "bottom 50%",
              scrub: 8,
              onUpdate: function (self) {
                  const progress = self.progress * spans.length;
                  spans.forEach(function (span, index) {
                      span.classList.toggle("is-active", index < progress);
                  });
              }
          }
      });
  });
});


});


$(window).on('load', function () {
  // -------------------------------------
  // 1. テキスト分割ヘルパー関数
  // -------------------------------------
  function splitTextToSpans(text) {
    return text.split('').map(char => {
      if (char === ' ') return '<span class="char is-space">&nbsp;</span>';
      if (char === '&') return '<span class="char">&amp;</span>';
      return `<span class="char">${char}</span>`;
    }).join('');
  }

  // -------------------------------------
  // 2. splitText構築とhoverアニメ設定（全ページ共通）
  // -------------------------------------
  const allBeforeSpans = [];

  $('.js-splitText').each(function () {
    const $target = $(this);
    const originalText = $target.text();
    const spanHTML = splitTextToSpans(originalText);

    const html = `
      <span class="text-wrap">
        <span class="text-original">${originalText}</span>
        <div class="before">${spanHTML}</div>
        <div class="after">${spanHTML}</div>
      </span>
    `;
    $target.html(html);

    const beforeSpans = $target.find('.before .char').toArray();
    const afterSpans = $target.find('.after .char').toArray();

    // 初期位置と非表示セット（チラつき防止）
    gsap.set(beforeSpans, { y: '0%' });
    gsap.set(afterSpans, { y: '100%', opacity: 1, visibility: 'visible' });
    gsap.set($target, { autoAlpha: 1 }); // すぐ表示（CSS初期で非表示だったため）

    allBeforeSpans.push(...beforeSpans);

    $target.on('mouseenter', () => {
  $target.addClass('is-animating');
  gsap.to(beforeSpans, { y: '-100%', stagger: 0.03, duration: 0.05, ease: 'none' });
  gsap.to(afterSpans,  { y: '0%',     stagger: 0.03, duration: 0.05, ease: 'none' });
});

$target.on('mouseleave', () => {
  gsap.to(beforeSpans, { y: '0%',    stagger: 0.03, duration: 0.05, ease: 'none' });
  gsap.to(afterSpans,  { y: '100%',  stagger: 0.03, duration: 0.05, ease: 'none'});
   setTimeout(() => {
    $target.removeClass('is-animating');
  }, 800);
});
  });

  // -------------------------------------
  // 3. トップページのみタイムライン実行
  // -------------------------------------
  if ($('body').hasClass('is-top')) {
    // タイトル（.mv__main-title など）も構築
    const titles = ['.mv__main-title', '.mv__sub-title'];
    titles.forEach(selector => {
      const $el = $(selector);
      const chars = $el.text().split('').map(char =>
        char === ' ' ? '&nbsp;' : char
      ).map(c => `<span>${c}</span>`).join('');
      $el.html(chars);
    });

    // タイトル・ロゴ・navの表示は事前にset（タイムライン内でなく）
    gsap.set(['.mv__main-title', '.mv__sub-title', '.header__logo', '.js-splitText'], {
      autoAlpha: 1,
      visibility: 'visible',
      opacity: 1
    });

    // アニメーション実行
    const tl = gsap.timeline();

    tl.to({}, { duration: 0.5 }) // 暗転後の待機

      .fromTo('.mv__main-title span, .mv__sub-title span',
        { autoAlpha: 0, scale: 0.95 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: 'Power2.easeInOut',
          stagger: { each: 0.05, from: 'random' }
        }
      )

      .fromTo('.header__logo img',
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'sine.out' },
        ">0.1"
      )

      .fromTo(allBeforeSpans,
        { y: "-100%" },
        { y: "0%", stagger: 0.03, duration: 0.3, ease: "Power2.easeInOut" },
        ">-0.1"
      )

      .fromTo(".c-fv__bg",
        { autoAlpha: 1 },
        { duration: 4, autoAlpha: 0, ease: "power2.out" },
        ">1"
      )

      .fromTo(".mv-swiper",
    { scale: 1.15 },
    { scale: 1, duration: 2, ease: "power2.out" },
    "<"
  );


  }
});


// mvのパララックス
gsap.registerPlugin(ScrollTrigger);

// ページ読み込み後にScrollTriggerを初期化（画像やSwiper描画後）
window.addEventListener("load", () => {
  ScrollTrigger.create({
    trigger: ".mv",                // 固定の起点
    start: "top top",              // .mvが画面上に来た瞬間から
    end: "bottom top",             // .mvの下端が画面上端に来たら解除
    pin: ".mv__sticky-wrap",       // 固定する要素
    pinSpacing: false,             // 次セクションが上にかぶさる演出
    scrub: true,                   // スクロールに追従
    pinType: "transform"           // Safari対策でtransformベースのpinを使用
  });

  // 念のためレイアウト再計算
  ScrollTrigger.refresh();
});


// mvの拡大アニメーション
gsap.to(".mv-swiper", {
  scale: 1.15, // 拡大率
  ease: "none",
  scrollTrigger: {
    trigger: ".mv",
    start: "top top",
    end: "bottom top",
    scrub: 2,
  }
});

// mvのタイトルをフェードアウト
gsap.to(".mv__title-wrap", {
  opacity: 0,
  y: -40, // 少し上に移動しながら消える演出（任意）
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".mv",
    start: "top top",
    end: "top+=100 top",
    scrub: 0.8
  }
});

// Lenis
const lenis = new Lenis({
  smooth: true,
  lerp: 0.08, // 惰性の強さ（小さいほどスロー）
  smoothTouch: false
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);









