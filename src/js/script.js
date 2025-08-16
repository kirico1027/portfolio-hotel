jQuery(function ($) {
  // ハンバーガーメニュー
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

  // MV Swiper
  if (document.querySelector(".js-mv-swiper")) {
    new Swiper(".js-mv-swiper", {
      centeredSlides: true,
      loop: true,
      speed: 6000,
      effect: "fade",
      pagination: { el: ".swiper-pagination", type: "fraction" },
      fadeEffect: { crossFade: true },
      autoplay: { delay: 4000, disableOnInteraction: false },
    });
  }

  // Campaign Swiper
  if (document.querySelector(".js-campaign-swiper")) {
    new Swiper(".js-campaign-swiper", {
      centeredSlides: true,
      loop: true,
      speed: 1800,
      slidesPerView: 2,
      spaceBetween: 24,
      autoplay: { delay: 5000, disableOnInteraction: false },
      breakpoints: {
        768: { spaceBetween: 25, slidesPerView: 3 },
        1025: { spaceBetween: 25, slidesPerView: 5 },
      },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
  }

  // 画像カラーオーバーレイ
  var $boxes = $(".js-colorbox"),
    speed = 700;
  $boxes.each(function () {
    $(this).append('<div class="color"></div>');
    var $color = $(this).find(".color"),
      $img = $(this).find("img");
    var done = false;
    $img.css("opacity", "0");
    $color.css("width", "0%");
    $color.on("inview", function () {
      if (done) return;
      $(this)
        .delay(200)
        .animate({ width: "100%" }, speed, function () {
          $img.css("opacity", "1");
          $(this).css({ left: "0", right: "auto" }).animate({ width: "0%" }, speed);
        });
      done = true;
    });
  });

  // モーダル
  $(".page-about-gallery__image img").on("click", function () {
    $(".modal-image").html($(this).prop("outerHTML"));
    $(".modal-image").fadeIn(500);
    $("body").addClass("is-noscroll");
  });
  $(".modal-image, .modal-image img").on("click", function () {
    $(".modal-image").fadeOut(500);
    $("body").removeClass("is-noscroll");
  });

  // アーカイブ（年→月）
  $(".js-accordion__box .js-accordion__month").css("display", "block");
  $(".js-accordion__box .js-accordion__year").addClass("is-open");
  $(".js-accordion__year").on("click", function () {
    $(this).toggleClass("is-open").next().slideToggle(300);
  });

  // FAQ
  $(".js-faq-question").on("click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass("is-open");
  });

  // タブ
  const tab = new URL(window.location.href).searchParams.get("tab");
  $(".js-tab-menu").on("click", function () {
    const number = $(this).data("number");
    $(".js-tab-menu").removeClass("is-active");
    $(this).addClass("is-active");
    $(".js-tab-content").removeClass("is-active");
    if (number) $("#" + number).addClass("is-active");
  });
  if (tab) {
    $('.js-tab-menu[data-number="' + tab + '"]').trigger("click");
  } else {
    $(".js-tab-menu:first").trigger("click");
  }

  // シングル前後ナビ
  if ($(".single-pagenavi__prev").find("a").length === 0) $(".single-pagenavi__prev").hide();
  if ($(".single-pagenavi__next").find("a").length === 0) $(".single-pagenavi__next").hide();

  // ヘッダー色変更（scroll）
  $(window).on("scroll", function () {
    const target =
      ".header, .header__nav-item a, .header__logo-main, .header__logo-sub, .header__hamburger span";
    if ($(this).scrollTop() > 100) $(target).addClass("js-change-color");
    else $(target).removeClass("js-change-color");
  });
});
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
      speed: 6000,
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
  jQuery(window).on("scroll", function () {
    if (jQuery(this).scrollTop() > 100) {
      jQuery(
        ".header, .header__nav-item a, .header__logo-main, .header__logo-sub, .header__hamburger span"
      ).addClass("js-change-color");
    } else {
      jQuery(
        ".header, .header__nav-item a, .header__logo-main, .header__logo-sub, .header__hamburger span"
      ).removeClass("js-change-color");
    }
  });
});
("use strict");

/*
=======================================
 script.js 概要（機能一覧）
 - ヘッダー/ドロワー（A11y対応）
 - Swiper（MV/キャンペーン）
 - 画像カラーオーバーレイ（IntersectionObserver）
 - モーダル（画像拡大・A11y対応）
 - アコーディオン（アーカイブ/FAQ）
 - タブ切り替え
 - ヘッダーの色変化（ScrollTrigger / IO フォールバック）
 - セクションタイトルの文字アニメーション
 - Fade-up アニメーション（単独/ペア）
 - カード/フォーム/ギャラリーのアニメーション
 - 文字カラー変化（スクロール連動）
 - MV（パララックス/拡大/タイトルフェード）
 - Lenis（ScrollTrigger と同期）
=======================================
*/

// -------------------------------------
// 依存ライブラリの存在チェック（グローバル）
// -------------------------------------
const hasGSAP = typeof window.gsap !== "undefined";
const hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== "undefined";
const hasSwiper = typeof window.Swiper !== "undefined";
const hasLenis = typeof window.Lenis !== "undefined";

if (hasGSAP && hasScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

// =====================================
// Lenis（惰性スクロール）再有効化＋軽快設定
// =====================================
if (hasLenis) {
  const ua = navigator.userAgent;
  const isMac = /Macintosh|Mac OS X/.test(ua);
  const isChrome = /Chrome\//.test(ua) && !/Edg\//.test(ua) && !/OPR\//.test(ua);
  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lenis = new Lenis({
    smooth: !prefersReduced,
    smoothTouch: false,
    // Mac Chrome 向けに反応性と惰性を強める
    lerp: isMac && isChrome ? 0.28 : 0.2,
    wheelMultiplier: isMac && isChrome ? 1.6 : 1.3,
  });

  if (hasGSAP && hasScrollTrigger) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

jQuery(function ($) {
  // =====================================
  // ドロワーメニュー（A11y対応）
  // =====================================
  const $hamburger = $(".js-hamburger");
  const $drawer = $(".js-drawer");
  const $header = $(".js-header");
  let lastFocusedElement = null;

  // 初期ARIA状態
  $hamburger.attr("aria-expanded", "false");
  $drawer.attr("aria-hidden", "true");

  function getFocusable($container) {
    return $container
      .find(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]'
      )
      .filter(":visible");
  }

  function trapFocus(e) {
    if (e.key !== "Tab") return;
    const $focusable = getFocusable($drawer);
    if ($focusable.length === 0) return;
    const first = $focusable[0];
    const last = $focusable[$focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        $(last).focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        $(first).focus();
      }
    }
  }

  function onKeydownEsc(e) {
    if (e.key === "Escape") {
      closeDrawer();
    }
  }

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
  function openDrawer() {
    lastFocusedElement = document.activeElement;
    $header.addClass("is-open");
    $drawer.addClass("is-open").attr("aria-hidden", "false");
    $hamburger.addClass("is-open").attr("aria-expanded", "true");
    $("body").addClass("is-noscroll");
    // フォーカス移動とトラップ
    const $focusable = getFocusable($drawer);
    if ($focusable.length) $focusable[0].focus();
    document.addEventListener("keydown", trapFocus);
    document.addEventListener("keydown", onKeydownEsc);
  }
  function closeDrawer() {
    $header.removeClass("is-open");
    $drawer.removeClass("is-open").attr("aria-hidden", "true");
    $hamburger.removeClass("is-open").attr("aria-expanded", "false");
    $("body").removeClass("is-noscroll");
    document.removeEventListener("keydown", trapFocus);
    document.removeEventListener("keydown", onKeydownEsc);
    if (lastFocusedElement) $(lastFocusedElement).focus();
  }

  // =====================================
  // MV Swiper
  // =====================================
  if (hasSwiper && document.querySelector(".js-mv-swiper")) {
    const mv_swiper = new Swiper(".js-mv-swiper", {
      centeredSlides: true,
      // 1枚目のスライドを中央にする
      loop: true,
      speed: 6000,
      effect: "fade",
      pagination: {
        el: ".swiper-pagination",
        // ページネーションのクラス名を指定
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
  }

  // =====================================
  // Campaign Swiper
  // =====================================
  if (hasSwiper && document.querySelector(".js-campaign-swiper")) {
    const campaign_swiper = new Swiper(".js-campaign-swiper", {
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
  }

  // =====================================
  // 画像カラーオーバーレイ（IntersectionObserver）
  // =====================================
  (function () {
    const SPEED = 700;
    const boxes = document.querySelectorAll(".js-colorbox");
    if (!boxes.length) return;

    boxes.forEach((boxEl) => {
      // アニメ用要素を追加
      let colorEl = boxEl.querySelector(".color");
      if (!colorEl) {
        colorEl = document.createElement("div");
        colorEl.className = "color";
        boxEl.appendChild(colorEl);
      }
      const imgEl = boxEl.querySelector("img");
      if (!imgEl) return;

      // 初期状態
      imgEl.style.opacity = "0";
      colorEl.style.width = "0%";

      let done = false;
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || done) return;
            done = true;
            // jQuery animate → CSS トランジションで代替（クラス付与）
            colorEl.style.transition = `width ${SPEED}ms linear`;
            colorEl.style.width = "100%";

            setTimeout(() => {
              imgEl.style.transition = `opacity ${Math.max(200, SPEED / 2)}ms ease`;
              imgEl.style.opacity = "1";
              colorEl.style.left = "0";
              colorEl.style.right = "auto";
              // 戻す
              colorEl.style.transition = `width ${SPEED}ms linear`;
              colorEl.style.width = "0%";
            }, SPEED + 200);

            obs.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
      );

      observer.observe(boxEl);
    });
  })();

  // =====================================
  // 画像モーダル（A11y対応）
  // =====================================
  (function () {
    const $modal = $(".modal-image");
    if (!$modal.length) return;

    // 初期ARIA
    $modal.attr({ role: "dialog", "aria-modal": "true", "aria-hidden": "true", tabindex: "-1" });
    let lastModalTrigger = null;

    function getFocusable($container) {
      return $container
        .find(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]'
        )
        .filter(":visible");
    }

    function trapFocusModal(e) {
      if (e.key !== "Tab") return;
      const $focusable = getFocusable($modal);
      if ($focusable.length === 0) return;
      const first = $focusable[0];
      const last = $focusable[$focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          $(last).focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          $(first).focus();
        }
      }
    }

    function onKeydownEscModal(e) {
      if (e.key === "Escape") closeModal();
    }

    function openModal(triggerImg) {
      lastModalTrigger = triggerImg || null;
      $modal.html($(triggerImg).prop("outerHTML"));
      $modal.attr("aria-hidden", "false").addClass("is-open").fadeIn(500);
      $("body").addClass("is-noscroll");
      // フォーカス移動
      const $focusable = getFocusable($modal);
      if ($focusable.length) $focusable[0].focus();
      else $modal.focus();
      document.addEventListener("keydown", trapFocusModal);
      document.addEventListener("keydown", onKeydownEscModal);
    }

    function closeModal() {
      $modal.attr("aria-hidden", "true").removeClass("is-open").fadeOut(500);
      $("body").removeClass("is-noscroll");
      document.removeEventListener("keydown", trapFocusModal);
      document.removeEventListener("keydown", onKeydownEscModal);
      if (lastModalTrigger) $(lastModalTrigger).focus();
    }

    $(".page-about-gallery__image img").on("click", function () {
      openModal(this);
    });
    $modal.on("click", function () {
      closeModal();
    });
  })();

  // =====================================
  // アコーディオン（アーカイブ）
  // =====================================
  $(".js-accordion__box .js-accordion__month").css("display", "block");
  $(".js-accordion__box .js-accordion__year").addClass("is-open");
  $(".js-accordion__year").on("click", function () {
    $(this).toggleClass("is-open");
    $(this).next().slideToggle(300);
  });

  // =====================================
  // アコーディオン（FAQ）
  // =====================================
  $(".js-faq-question").on("click", function () {
    $(this).next().slideToggle();
    $(this).toggleClass("is-open");
  });

  // =====================================
  // タブ切り替え
  // =====================================
  // URLから 'tab' パラメータを取得
  const tab = new URLSearchParams(window.location.search).get("tab");

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

  // =====================================
  // ブログ詳細：前後ナビの表示制御
  // =====================================
  // 最初のページで前が無い場合
  if ($(".single-pagenavi__prev").find("a").length === 0) {
    $(".single-pagenavi__prev").hide();
  }

  // 最後のページで次が無い場合
  if ($(".single-pagenavi__next").find("a").length === 0) {
    $(".single-pagenavi__next").hide();
  }

  // =====================================
  // ヘッダー色変化（シンプルなscrollに統一）
  // =====================================
  jQuery(window).on("scroll", function () {
    const targetSelector =
      ".header, .header__nav-item a, .header__logo-main, .header__logo-sub, .header__hamburger span";
    if (jQuery(this).scrollTop() > 100) {
      jQuery(targetSelector).addClass("js-change-color");
    } else {
      jQuery(targetSelector).removeClass("js-change-color");
    }
  });

  // =====================================
  // セクションタイトル文字アニメーション
  // =====================================
  if (hasGSAP && hasScrollTrigger && document.querySelector(".section-title__main")) {
    $(".section-title__main").each(function () {
      const $section = $(this);
      const $texts = $section.find(".text");
      gsap.fromTo(
        $texts,
        { opacity: 0, filter: "blur(5px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: { each: 0.1, from: "random" },
          scrollTrigger: { trigger: $section[0], start: "top 95%" },
        }
      );
    });
  }

  // =====================================
  // ブログカードのアニメーション
  // =====================================
  if (hasGSAP && hasScrollTrigger && document.querySelector(".blog-card")) {
    gsap.fromTo(
      ".blog-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: { each: 0.3, from: "random" },
        scrollTrigger: { trigger: ".blog-card", start: "top 95%" },
      }
    );
  }

  // =====================================
  // Fade-up アニメーション（単独/ペア）
  // =====================================
  if (hasGSAP && hasScrollTrigger && document.querySelector(".js-fade-up-wrapper, .js-fade-up")) {
    // ペア用（画像＋テキスト）重複統合版
    document.querySelectorAll(".js-fade-up-wrapper").forEach((wrapper) => {
      if (wrapper.dataset.fadeUpInitialized === "true") return;

      const imgFromWrapper = wrapper.querySelector(".js-fade-up-imgWrapper img");
      const imgPlain = wrapper.querySelector(".js-fade-up-img");
      const img = imgFromWrapper || imgPlain;
      const text = wrapper.querySelector(".js-fade-up-text");

      if (!img || !text) return;

      const init = () => {
        if (wrapper.dataset.fadeUpInitialized === "true") return;
        wrapper.dataset.fadeUpInitialized = "true";

        const timeline = gsap.timeline({
          scrollTrigger: { trigger: wrapper, start: "top 95%", once: true },
        });

        if (imgFromWrapper) {
          timeline.fromTo(img, { y: 30 }, { y: 0, duration: 0.5 });
        } else {
          timeline.fromTo(img, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 });
        }

        timeline.fromTo(text, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, "+=0.5");

        ScrollTrigger.refresh();
      };

      if (img instanceof HTMLImageElement && img.complete && img.naturalHeight !== 0) {
        init();
      } else {
        img.addEventListener("load", init, { once: true });
      }
    });

    // 単独用
    document.querySelectorAll(".js-fade-up").forEach((el) => {
      if (el.closest(".js-fade-up-wrapper")) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        }
      );
    });
  }

  // =====================================
  // お問い合わせフォームのアニメーション
  // =====================================
  if (hasGSAP && hasScrollTrigger && document.querySelector(".form__item")) {
    gsap.fromTo(
      ".form__item",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: { each: 0.3, from: "start" },
        scrollTrigger: { trigger: ".form__item", start: "top center" },
      }
    );
  }

  // =====================================
  // Aboutギャラリーのアニメーション（window load 側に統合）

  // =====================================
  // 文字カラー変化（スクロール連動）
  // =====================================
  if (hasGSAP && hasScrollTrigger && document.querySelector(".js-colorChange")) {
    $(".js-colorChange").each(function () {
      const $textElement = $(this);
      const originalText = $textElement.text();
      $textElement.empty();

      const spans = [];
      $.each(originalText.split(""), function (i, char) {
        const $span = $("<span>").text(char);
        $textElement.append($span);
        spans.push($span[0]);
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
          },
        },
      });
    });
  }
});

// =====================================
// splitText（ホバーアニメ）とトップページTL、Aboutギャラリー
// =====================================
$(window).on("load", function () {
  // -------------------------------------
  // 1. テキスト分割ヘルパー関数
  // -------------------------------------
  function splitTextToSpans(text) {
    return text
      .split("")
      .map((char) => {
        if (char === " ") return '<span class="char is-space">&nbsp;</span>';
        if (char === "&") return '<span class="char">&amp;</span>';
        return `<span class="char">${char}</span>`;
      })
      .join("");
  }

  // -------------------------------------
  // 2. splitText構築とhoverアニメ設定（全ページ共通）
  // -------------------------------------
  const allBeforeSpans = [];

  $(".js-splitText").each(function () {
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

    const beforeSpans = $target.find(".before .char").toArray();
    const afterSpans = $target.find(".after .char").toArray();

    // 初期位置と非表示セット（チラつき防止）
    gsap.set(beforeSpans, { y: "0%" });
    gsap.set(afterSpans, { y: "100%", opacity: 1, visibility: "visible" });
    gsap.set($target, { autoAlpha: 1 }); // すぐ表示（CSS初期で非表示だったため）

    allBeforeSpans.push(...beforeSpans);

    $target.on("mouseenter", () => {
      $target.addClass("is-animating");
      gsap.to(beforeSpans, { y: "-100%", stagger: 0.03, duration: 0.05, ease: "none" });
      gsap.to(afterSpans, { y: "0%", stagger: 0.03, duration: 0.05, ease: "none" });
    });

    $target.on("mouseleave", () => {
      gsap.to(beforeSpans, { y: "0%", stagger: 0.03, duration: 0.05, ease: "none" });
      gsap.to(afterSpans, { y: "100%", stagger: 0.03, duration: 0.05, ease: "none" });
      setTimeout(() => {
        $target.removeClass("is-animating");
      }, 800);
    });
  });

  // -------------------------------------
  // 3. トップページのみタイムライン実行
  // -------------------------------------
  if ($("body").hasClass("is-top")) {
    // タイトル（.mv__main-title など）も構築
    const titles = [".mv__main-title", ".mv__sub-title"];
    titles.forEach((selector) => {
      const $el = $(selector);
      const chars = $el
        .text()
        .split("")
        .map((char) => (char === " " ? "&nbsp;" : char))
        .map((c) => `<span>${c}</span>`)
        .join("");
      $el.html(chars);
    });

    // タイトル・ロゴ・navの表示は事前にset（タイムライン内でなく）
    gsap.set([".mv__main-title", ".mv__sub-title", ".header__logo", ".js-splitText"], {
      autoAlpha: 1,
      visibility: "visible",
      opacity: 1,
    });

    // アニメーション実行
    const tl = gsap.timeline();

    tl.to({}, { duration: 0.5 }) // 暗転後の待機

      .fromTo(
        ".mv__main-title span, .mv__sub-title span",
        { autoAlpha: 0, scale: 0.95 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "Power2.easeInOut",
          stagger: { each: 0.05, from: "random" },
        }
      )

      .fromTo(
        ".header__logo img",
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "sine.out" },
        ">0.1"
      )

      .fromTo(
        allBeforeSpans,
        { y: "-100%" },
        { y: "0%", stagger: 0.03, duration: 0.3, ease: "Power2.easeInOut" },
        ">-0.1"
      )

      .fromTo(
        ".c-fv__bg",
        { autoAlpha: 1 },
        { duration: 4, autoAlpha: 0, ease: "power2.out" },
        ">1"
      )

      .fromTo(".mv-swiper", { scale: 1.15 }, { scale: 1, duration: 2, ease: "power2.out" }, "<");
  }

  // -------------------------------------
  // 4. Aboutギャラリー（画像読み込み後のスクラブ）
  // -------------------------------------
  if (hasGSAP && hasScrollTrigger && document.querySelector(".page-about-gallery__image img")) {
    $(".page-about-gallery__image img").each(function () {
      const $img = $(this)[0];
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
            },
          }
        );
      }
    });
  }
});

// =====================================
// MV パララックス固定
// =====================================
if (
  hasGSAP &&
  hasScrollTrigger &&
  document.querySelector(".mv") &&
  document.querySelector(".mv__sticky-wrap")
) {
  window.addEventListener("load", () => {
    ScrollTrigger.create({
      trigger: ".mv",
      start: "top top",
      end: "bottom top",
      pin: ".mv__sticky-wrap",
      pinSpacing: false,
      scrub: true,
      pinType: "transform",
    });
    ScrollTrigger.refresh();
  });
}

// =====================================
// MV 背景拡大アニメーション
// =====================================
if (
  hasGSAP &&
  hasScrollTrigger &&
  document.querySelector(".mv") &&
  document.querySelector(".mv-swiper")
) {
  gsap.to(".mv-swiper", {
    scale: 1.15,
    ease: "none",
    scrollTrigger: { trigger: ".mv", start: "top top", end: "bottom top", scrub: 2 },
  });
}

// =====================================
// MV タイトルのフェードアウト
// =====================================
if (
  hasGSAP &&
  hasScrollTrigger &&
  document.querySelector(".mv") &&
  document.querySelector(".mv__title-wrap")
) {
  gsap.to(".mv__title-wrap", {
    opacity: 0,
    y: -40,
    ease: "power2.out",
    scrollTrigger: { trigger: ".mv", start: "top top", end: "top+=100 top", scrub: 0.8 },
  });
}
