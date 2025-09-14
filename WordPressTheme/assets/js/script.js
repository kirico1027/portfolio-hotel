"use strict";

/**
 * WordPress Theme JavaScript
 *
 * このファイルはWordPressテーマの主要なJavaScript機能を管理します。
 * モジュラー設計により、各機能が独立したクラスとして実装されています。
 *
 * 主要機能:
 * - ハンバーガーメニュー（レスポンシブ対応）
 * - Swiperスライダー（MV、キャンペーン用）
 * - 画像アニメーション（カラーボックス効果）
 * - モーダル（画像表示）
 * - アコーディオン（月別・年別）
 * - FAQ（質問・回答）
 * - タブ（コンテンツ切り替え）
 * - ページナビゲーション（前後ページ）
 * - ヘッダースクロール効果（スクロール時の表示制御）
 * - GSAPアニメーション（セクションタイトル、ブログカード、フォーム）
 * - Lenisスムーススクロール（滑らかなスクロール）
 * - 高度なアニメーション（パララックス、拡大、フェード）
 *
 * パフォーマンス最適化:
 * - DOM要素のキャッシュ
 * - イベントのスロットリング・デバウンス
 * - 不要なDOM操作の削減
 * - メモリリーク対策
 *
 * @version 1.0.0
 * @author WordPress Theme Developer
 * @license MIT
 */

// ========================================
// 名前空間の定義
// ========================================
var WordPressTheme = WordPressTheme || {};

// ========================================
// 設定オブジェクト
// ========================================
WordPressTheme.CONFIG = {
  // ブレークポイント設定（レスポンシブ対応）
  breakpoints: {
    mobile: 767, // モバイル端末の最大幅
    tablet: 768, // タブレット端末の最小幅
    desktop: 1025, // デスクトップ端末の最小幅
  },

  // アニメーション設定（GSAP用）
  animation: {
    duration: {
      fast: 300, // 高速アニメーション
      normal: 500, // 標準アニメーション
      slow: 800, // 低速アニメーション
    },
    easing: {
      smooth: "Power2.easeInOut", // 滑らかなイージング
      bounce: "Back.easeOut", // バウンス効果
      linear: "none", // 線形
    },
    stagger: {
      text: 0.03, // テキストアニメーションの遅延
      cards: 0.3, // カードアニメーションの遅延
    },
  },

  // スクロール設定
  scroll: {
    threshold: 100, // ヘッダー表示/非表示の閾値
    smoothLerp: 0.08, // Lenisスムーススクロールの補間値
  },

  // Swiper設定（スライダー用）
  swiper: {
    mv: {
      speed: 3000, // MVスライダーの速度
      autoplayDelay: 3000, // 自動再生の間隔
      effect: "fade", // フェード効果
    },
    campaign: {
      speed: 1800, // キャンペーンスライダーの速度
      slidesPerView: {
        mobile: 2, // モバイルでの表示枚数
        tablet: 3, // タブレットでの表示枚数
        desktop: 6.5, // デスクトップでの表示枚数
      },
      spaceBetween: {
        mobile: 24, // モバイルでの間隔
        tablet: 25, // タブレットでの間隔
        desktop: 25, // デスクトップでの間隔
      },
    },
  },

  // DOMセレクタ設定（パフォーマンス向上のためキャッシュ対象）
  selectors: {
    hamburger: ".js-hamburger", // ハンバーガーメニューボタン
    drawer: ".js-drawer", // ドロワーメニュー
    header: ".js-header", // ヘッダー要素
    body: "body", // body要素
    modal: ".modal-image", // モーダルコンテナ
    accordion: {
      box: ".js-accordion__box", // アコーディオンコンテナ
      month: ".js-accordion__month", // 月別アコーディオン
      year: ".js-accordion__year", // 年別アコーディオン
    },
    faq: ".js-faq-question", // FAQ質問要素
    tab: {
      menu: ".js-tab-menu", // タブメニュー
      content: ".js-tab-content", // タブコンテンツ
    },
    pagenavi: {
      prev: ".single-pagenavi__prev", // 前ページナビ
      next: ".single-pagenavi__next", // 次ページナビ
    },
    headerElements:
      ".header, .header__nav-item a, .header__logo-main, .header__logo-sub, .header__hamburger span",
    sectionTitle: ".section-title__main", // セクションタイトル
    blogCard: ".blog-card", // ブログカード
    formItem: ".form__item", // フォームアイテム
    colorBox: ".js-colorbox", // カラーボックス
    colorChange: ".js-colorChange", // カラー変化要素
    splitText: ".js-splitText", // テキスト分割要素
    mv: {
      main: ".mv__main-title", // MVメインタイトル
      sub: ".mv__sub-title", // MVサブタイトル
      logo: ".header__logo", // ロゴ
      titleWrap: ".mv__title-wrap", // タイトルラッパー
      stickyWrap: ".mv__sticky-wrap", // スティッキーラッパー
      swiper: ".mv-swiper", // MVスワイパー
      bg: ".c-fv__bg", // MV背景
    },
  },
};

// ========================================
// 共通ユーティリティクラス
// ========================================
WordPressTheme.Utils = {
  /**
   * エラーログの出力
   * @param {string} component - コンポーネント名
   * @param {string} method - メソッド名
   * @param {Error|string} error - エラー内容
   * @param {Object} context - コンテキスト情報
   */
  logError: function (component, method, error, context) {
    var errorMessage = "[" + component + "] " + method + ": " + (error.message || error);
    if (context) {
      errorMessage += " | Context: " + JSON.stringify(context);
    }
    console.error(errorMessage);

    // 開発環境でのみ詳細ログを出力
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      console.group("詳細エラー情報");
      console.error("Component:", component);
      console.error("Method:", method);
      console.error("Error:", error);
      console.error("Context:", context);
      console.error("Stack:", error.stack);
      console.groupEnd();
    }
  },

  /**
   * 警告ログの出力
   * @param {string} component - コンポーネント名
   * @param {string} message - 警告メッセージ
   * @param {Object} context - コンテキスト情報
   */
  logWarning: function (component, message, context) {
    var warningMessage = "[" + component + "] " + message;
    if (context) {
      warningMessage += " | Context: " + JSON.stringify(context);
    }
    console.warn(warningMessage);
  },

  /**
   * 安全な関数実行
   * @param {Function} func - 実行する関数
   * @param {string} component - コンポーネント名
   * @param {string} method - メソッド名
   * @param {Object} context - コンテキスト情報
   * @param {Function} fallback - フォールバック関数
   * @returns {*} 実行結果
   */
  safeExecute: function (func, component, method, context, fallback) {
    try {
      return func();
    } catch (error) {
      this.logError(component, method, error, context);
      if (typeof fallback === "function") {
        try {
          return fallback();
        } catch (fallbackError) {
          this.logError(component, method + " (fallback)", fallbackError, context);
        }
      }
      return null;
    }
  },

  /**
   * DOM要素の安全な取得
   * @param {string} selector - CSSセレクタ
   * @param {string} component - コンポーネント名
   * @returns {jQuery|null} jQuery要素またはnull
   */
  safeGetElement: function (selector, component) {
    try {
      var $element = jQuery(selector);
      if ($element.length === 0) {
        this.logWarning(component, "Element not found: " + selector, { selector: selector });
        return null;
      }
      return $element;
    } catch (error) {
      this.logError(component, "safeGetElement", error, { selector: selector });
      return null;
    }
  },

  /**
   * 関数の実行頻度を制限する（スロットリング）
   * @param {Function} func - 実行する関数
   * @param {number} limit - 制限時間（ミリ秒）
   * @returns {Function} スロットリングされた関数
   */
  throttle: function (func, limit) {
    var inThrottle;
    return function () {
      var args = arguments;
      var context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function () {
          inThrottle = false;
        }, limit);
      }
    };
  },

  /**
   * 関数の実行を遅延させる（デバウンス）
   * @param {Function} func - 実行する関数
   * @param {number} wait - 待機時間（ミリ秒）
   * @returns {Function} デバウンスされた関数
   */
  debounce: function (func, wait) {
    var timeout;
    return function executedFunction() {
      var args = arguments;
      var context = this;
      var later = function () {
        clearTimeout(timeout);
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * DOM要素の存在確認
   * @param {string} selector - CSSセレクタ
   * @returns {boolean} 要素が存在するかどうか
   */
  elementExists: function (selector) {
    try {
      return jQuery(selector).length > 0;
    } catch (error) {
      this.logError("Utils", "elementExists", error, { selector: selector });
      return false;
    }
  },

  /**
   * モバイルデバイスかどうかを判定
   * @returns {boolean} モバイルデバイスかどうか
   */
  isMobile: function () {
    try {
      return window.matchMedia("(max-width: " + WordPressTheme.CONFIG.breakpoints.mobile + "px)")
        .matches;
    } catch (error) {
      this.logError("Utils", "isMobile", error);
      return false;
    }
  },

  /**
   * タブレットデバイスかどうかを判定
   * @returns {boolean} タブレットデバイスかどうか
   */
  isTablet: function () {
    try {
      return window.matchMedia(
        "(min-width: " +
          WordPressTheme.CONFIG.breakpoints.tablet +
          "px) and (max-width: " +
          (WordPressTheme.CONFIG.breakpoints.desktop - 1) +
          "px)"
      ).matches;
    } catch (error) {
      this.logError("Utils", "isTablet", error);
      return false;
    }
  },

  /**
   * デスクトップデバイスかどうかを判定
   * @returns {boolean} デスクトップデバイスかどうか
   */
  isDesktop: function () {
    try {
      return window.matchMedia("(min-width: " + WordPressTheme.CONFIG.breakpoints.desktop + "px)")
        .matches;
    } catch (error) {
      this.logError("Utils", "isDesktop", error);
      return false;
    }
  },
};

// ========================================
// 基底クラス
// ========================================
/**
 * 基底コンポーネントクラス
 *
 * すべてのコンポーネントの基本となるクラスです。
 * 共通の初期化処理、依存関係チェック、エラーハンドリングを提供します。
 *
 * @class BaseComponent
 * @constructor
 */
WordPressTheme.BaseComponent = function () {
  this.isInitialized = false;
  this.dependencies = [];
  this.componentName = this.constructor.name || "BaseComponent";
};

WordPressTheme.BaseComponent.prototype = {
  /**
   * 依存関係のチェック
   *
   * コンポーネントが正常に動作するために必要な外部ライブラリの存在を確認します。
   *
   * @returns {boolean} 依存関係が満たされているかどうか
   */
  checkDependencies: function () {
    for (var i = 0; i < this.dependencies.length; i++) {
      var dependency = this.dependencies[i];
      if (typeof window[dependency] === "undefined") {
        WordPressTheme.Utils.logWarning(
          this.componentName,
          "Dependency not loaded: " + dependency,
          { dependency: dependency, allDependencies: this.dependencies }
        );
        return false;
      }
    }
    return true;
  },

  /**
   * 初期化処理
   *
   * コンポーネントの初期化を行います。
   * 依存関係チェック、セットアップ、イベントバインドを順次実行します。
   */
  init: function () {
    if (this.isInitialized) {
      WordPressTheme.Utils.logWarning(this.componentName, "Component already initialized", {});
      return;
    }

    if (!this.checkDependencies()) {
      WordPressTheme.Utils.logError(
        this.componentName,
        "init",
        new Error("Dependencies not satisfied"),
        {}
      );
      return;
    }

    var setupResult = WordPressTheme.Utils.safeExecute(
      function () {
        return this.setup();
      }.bind(this),
      this.componentName,
      "setup",
      {},
      function () {
        WordPressTheme.Utils.logWarning(this.componentName, "Setup failed, using fallback", {});
        return false;
      }.bind(this)
    );

    if (setupResult === false) {
      WordPressTheme.Utils.logError(this.componentName, "init", new Error("Setup failed"), {});
      return;
    }

    WordPressTheme.Utils.safeExecute(
      function () {
        this.bindEvents();
      }.bind(this),
      this.componentName,
      "bindEvents",
      {},
      function () {
        WordPressTheme.Utils.logWarning(this.componentName, "Event binding failed", {});
      }.bind(this)
    );

    this.isInitialized = true;
    WordPressTheme.Utils.logWarning(this.componentName, "Component initialized successfully", {});
  },

  /**
   * セットアップ処理（サブクラスでオーバーライド）
   *
   * コンポーネント固有の初期化処理を実装します。
   * DOM要素の取得、初期状態の設定などを行います。
   *
   * @returns {boolean} セットアップが成功したかどうか
   */
  setup: function () {
    WordPressTheme.Utils.logWarning(this.componentName, "Setup method not implemented", {});
    return true;
  },

  /**
   * イベントバインド処理（サブクラスでオーバーライド）
   *
   * コンポーネント固有のイベントリスナーを設定します。
   * クリック、スクロール、リサイズなどのイベントを処理します。
   */
  bindEvents: function () {
    WordPressTheme.Utils.logWarning(this.componentName, "bindEvents method not implemented", {});
  },

  /**
   * 破棄処理（サブクラスでオーバーライド）
   *
   * コンポーネントのクリーンアップを行います。
   * イベントリスナーの削除、タイマーのクリア、メモリの解放などを行います。
   */
  destroy: function () {
    WordPressTheme.Utils.safeExecute(
      function () {
        this.isInitialized = false;
      }.bind(this),
      this.componentName,
      "destroy",
      {},
      function () {
        WordPressTheme.Utils.logError(
          this.componentName,
          "destroy",
          new Error("Destroy failed"),
          {}
        );
      }.bind(this)
    );
  },
};

// ========================================
// ハンバーガーメニュークラス
// ========================================
/**
 * ハンバーガーメニューコンポーネント
 *
 * レスポンシブ対応のハンバーガーメニューを管理します。
 * モバイル端末でのナビゲーション表示/非表示を制御します。
 *
 * @class HamburgerMenu
 * @extends BaseComponent
 * @constructor
 */
WordPressTheme.HamburgerMenu = function () {
  WordPressTheme.BaseComponent.call(this);
  this.$hamburgerButton = null;
  this.$drawerMenu = null;
  this.$headerElement = null;
  this.$bodyElement = null;
};

WordPressTheme.HamburgerMenu.prototype = Object.create(WordPressTheme.BaseComponent.prototype);
WordPressTheme.HamburgerMenu.prototype.constructor = WordPressTheme.HamburgerMenu;

/**
 * ハンバーガーメニューのセットアップ
 *
 * 必要なDOM要素を取得し、初期状態を設定します。
 *
 * @returns {boolean} セットアップが成功したかどうか
 */
WordPressTheme.HamburgerMenu.prototype.setup = function () {
  this.$hamburgerButton = WordPressTheme.Utils.safeGetElement(
    WordPressTheme.CONFIG.selectors.hamburger,
    "HamburgerMenu"
  );
  this.$drawerMenu = WordPressTheme.Utils.safeGetElement(
    WordPressTheme.CONFIG.selectors.drawer,
    "HamburgerMenu"
  );
  this.$headerElement = WordPressTheme.Utils.safeGetElement(
    WordPressTheme.CONFIG.selectors.header,
    "HamburgerMenu"
  );
  this.$bodyElement = jQuery(WordPressTheme.CONFIG.selectors.body);

  if (this.$hamburgerButton === null) {
    WordPressTheme.Utils.logError(
      "HamburgerMenu",
      "setup",
      new Error("Hamburger button not found"),
      { selector: WordPressTheme.CONFIG.selectors.hamburger }
    );
    return false;
  }
  return true;
};

/**
 * ハンバーガーメニューのイベントバインド
 *
 * クリックイベントとリサイズイベントを設定します。
 */
WordPressTheme.HamburgerMenu.prototype.bindEvents = function () {
  var self = this;

  // ハンバーガーボタンのクリックイベント
  this.$hamburgerButton.on("click", function () {
    self.$hamburgerButton.toggleClass("is-open");
    if (self.$hamburgerButton.hasClass("is-open")) {
      self.openDrawerMenu();
    } else {
      self.closeDrawerMenu();
    }
  });

  // ドロワーメニュー内のリンククリックイベント
  this.$drawerMenu.find("a[href]").on("click", function () {
    self.closeDrawerMenu();
  });

  // ウィンドウリサイズイベント（デバウンス処理）
  jQuery(window).on(
    "resize",
    WordPressTheme.Utils.debounce(function () {
      if (!WordPressTheme.Utils.isMobile()) {
        self.closeDrawerMenu();
      }
    }, WordPressTheme.CONFIG.animation.duration.fast)
  );
};

/**
 * ドロワーメニューを開く
 *
 * メニューの表示とアニメーションを実行します。
 */
WordPressTheme.HamburgerMenu.prototype.openDrawerMenu = function () {
  this.$headerElement.addClass("is-open");
  this.$drawerMenu.fadeIn();
  this.$hamburgerButton.addClass("is-open");
  this.$bodyElement.addClass("is-noscroll");
};

/**
 * ドロワーメニューを閉じる
 *
 * メニューの非表示とアニメーションを実行します。
 */
WordPressTheme.HamburgerMenu.prototype.closeDrawerMenu = function () {
  this.$headerElement.removeClass("is-open");
  this.$drawerMenu.fadeOut();
  this.$hamburgerButton.removeClass("is-open");
  this.$bodyElement.removeClass("is-noscroll");
};

// ========================================
// Swiperマネージャークラス
// ========================================
/**
 * Swiperスライダーマネージャーコンポーネント
 *
 * 複数のSwiperスライダーを管理します。
 * MVスライダーとキャンペーンスライダーの初期化と制御を行います。
 *
 * @class SwiperManager
 * @extends BaseComponent
 * @constructor
 */
WordPressTheme.SwiperManager = function () {
  WordPressTheme.BaseComponent.call(this);
  this.dependencies = ["Swiper"];
  this.sliders = {}; // スライダーインスタンスの管理
};

WordPressTheme.SwiperManager.prototype = Object.create(WordPressTheme.BaseComponent.prototype);
WordPressTheme.SwiperManager.prototype.constructor = WordPressTheme.SwiperManager;

/**
 * Swiperマネージャーのセットアップ
 *
 * 各スライダーの初期化を行います。
 */
WordPressTheme.SwiperManager.prototype.setup = function () {
  try {
    this.initMvSlider();
    this.initCampaignSlider();
  } catch (error) {
    WordPressTheme.Utils.logError("SwiperManager", "setup", error, {});
  }
};

/**
 * MVスライダーの初期化
 *
 * メインビジュアル用のスライダーを設定します。
 * フェード効果と自動再生機能を有効にします。
 */
WordPressTheme.SwiperManager.prototype.initMvSlider = function () {
  if (WordPressTheme.Utils.elementExists(WordPressTheme.CONFIG.selectors.mv.swiper)) {
    this.sliders.mv = new Swiper(".js-mv-swiper", {
      centeredSlides: true,
      loop: true,
      speed: WordPressTheme.CONFIG.swiper.mv.speed,
      effect: WordPressTheme.CONFIG.swiper.mv.effect,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: WordPressTheme.CONFIG.swiper.mv.autoplayDelay,
        disableOnInteraction: false,
      },
    });
  }
};

/**
 * キャンペーンスライダーの初期化
 *
 * キャンペーン用のスライダーを設定します。
 * レスポンシブ対応とナビゲーション機能を有効にします。
 */
WordPressTheme.SwiperManager.prototype.initCampaignSlider = function () {
  if (WordPressTheme.Utils.elementExists(".js-campaign-swiper")) {
    this.sliders.campaign = new Swiper(".js-campaign-swiper", {
      centeredSlides: true,
      loop: true,
      speed: WordPressTheme.CONFIG.swiper.campaign.speed,
      slidesPerView: WordPressTheme.CONFIG.swiper.campaign.slidesPerView.mobile,
      spaceBetween: WordPressTheme.CONFIG.swiper.campaign.spaceBetween.mobile,
      breakpoints: {
        [WordPressTheme.CONFIG.breakpoints.tablet]: {
          spaceBetween: WordPressTheme.CONFIG.swiper.campaign.spaceBetween.tablet,
          slidesPerView: WordPressTheme.CONFIG.swiper.campaign.slidesPerView.tablet,
        },
        [WordPressTheme.CONFIG.breakpoints.desktop]: {
          spaceBetween: WordPressTheme.CONFIG.swiper.campaign.spaceBetween.desktop,
          slidesPerView: WordPressTheme.CONFIG.swiper.campaign.slidesPerView.desktop,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
};

/**
 * Swiperマネージャーの破棄処理
 *
 * すべてのスライダーインスタンスを適切に破棄します。
 */
WordPressTheme.SwiperManager.prototype.destroy = function () {
  for (var key in this.sliders) {
    if (this.sliders[key] && typeof this.sliders[key].destroy === "function") {
      try {
        this.sliders[key].destroy();
      } catch (error) {
        WordPressTheme.Utils.logError("SwiperManager", "destroy", error, { slider: key });
      }
    }
  }
  this.sliders = {};
  WordPressTheme.BaseComponent.prototype.destroy.call(this);
};

// ========================================
// 画像アニメーションクラス
// ========================================
/**
 * 画像アニメーションコンポーネント
 *
 * カラーボックス効果による画像アニメーションを管理します。
 * スクロールに応じて画像が徐々に表示される効果を実現します。
 *
 * @class ImageAnimation
 * @extends BaseComponent
 * @constructor
 */
WordPressTheme.ImageAnimation = function () {
  WordPressTheme.BaseComponent.call(this);
  this.$imageContainers = null;
};

WordPressTheme.ImageAnimation.prototype = Object.create(WordPressTheme.BaseComponent.prototype);
WordPressTheme.ImageAnimation.prototype.constructor = WordPressTheme.ImageAnimation;

/**
 * 画像アニメーションのセットアップ
 *
 * カラーボックス要素を取得し、アニメーション設定を行います。
 *
 * @returns {boolean} セットアップが成功したかどうか
 */
WordPressTheme.ImageAnimation.prototype.setup = function () {
  this.$imageContainers = WordPressTheme.Utils.safeGetElement(
    WordPressTheme.CONFIG.selectors.colorBox,
    "ImageAnimation"
  );

  if (this.$imageContainers === null) {
    WordPressTheme.Utils.logWarning("ImageAnimation", "setup", "Color boxes not found", {});
    return false;
  }

  this.setupAnimations();
  return true;
};

/**
 * アニメーション設定
 *
 * 各画像コンテナにカラーボックス効果を設定します。
 * IntersectionObserverを使用した高パフォーマンスな実装です。
 */
WordPressTheme.ImageAnimation.prototype.setupAnimations = function () {
  var self = this;
  var SPEED = 700;

  // IntersectionObserverが利用可能かチェック
  if (!("IntersectionObserver" in window)) {
    // フォールバック: 従来のinview実装
    this.setupLegacyAnimations();
    return;
  }

  this.$imageContainers.each(function () {
    var container = this;
    var colorEl = container.querySelector(".color");
    var imgEl = container.querySelector("img");

    // カラーボックス要素が存在しない場合は作成
    if (!colorEl) {
      colorEl = document.createElement("div");
      colorEl.className = "color";
      container.appendChild(colorEl);
    }

    // 画像要素が存在しない場合はスキップ
    if (!imgEl) {
      return;
    }

    // 初期状態設定
    imgEl.style.opacity = "0";
    colorEl.style.width = "0%";

    var done = false;
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || done) {
            return;
          }
          done = true;

          // カラーボックスアニメーション（右から左へ）
          colorEl.style.transition = "width " + SPEED + "ms linear";
          colorEl.style.width = "100%";

          setTimeout(function () {
            // 画像表示
            imgEl.style.transition = "opacity " + Math.max(200, SPEED / 2) + "ms ease";
            imgEl.style.opacity = "1";
            colorEl.style.left = "0";
            colorEl.style.right = "auto";

            // カラーボックスを戻す（左から右へ）
            colorEl.style.transition = "width " + SPEED + "ms linear";
            colorEl.style.width = "0%";
          }, SPEED + 200);

          obs.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -50% 0px",
        threshold: 0.2,
      }
    );

    observer.observe(container);
  });
};

/**
 * 従来のinview実装（フォールバック）
 *
 * IntersectionObserverが利用できない場合の代替実装です。
 */
WordPressTheme.ImageAnimation.prototype.setupLegacyAnimations = function () {
  var self = this;
  var animationDuration = WordPressTheme.CONFIG.animation.duration.slow;

  this.$imageContainers.each(function () {
    var $container = jQuery(this);
    var $colorOverlay = jQuery('<div class="color"></div>');
    var $imageElement = $container.find("img");
    var animationTriggered = false;

    // カラーボックスの初期設定
    $container.css("position", "relative");
    $colorOverlay.css({
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "#000",
      zIndex: "1",
    });
    $container.append($colorOverlay);

    // 画像の初期設定
    $imageElement.css({
      position: "relative",
      zIndex: "2",
      opacity: "0",
    });

    // カラーボックスの初期幅設定
    $colorOverlay.css("width", "0%");

    // inviewイベントでアニメーション実行
    $colorOverlay.on("inview", function () {
      if (animationTriggered) {
        return;
      }
      animationTriggered = true;

      $colorOverlay.delay(200).animate(
        {
          width: "100%",
        },
        animationDuration,
        function () {
          $imageElement.css("opacity", "1");
          jQuery(this).css({
            left: "0",
            right: "auto",
          });
          jQuery(this).animate(
            {
              width: "0%",
            },
            animationDuration
          );
        }
      );
    });
  });
};

// ========================================
// モーダルクラス
// ========================================
/**
 * モーダルコンポーネント
 *
 * 画像表示用のモーダル機能を管理します。
 * 画像クリック時のモーダル表示/非表示を制御します。
 *
 * @class Modal
 * @extends BaseComponent
 * @constructor
 */
WordPressTheme.Modal = function () {
  WordPressTheme.BaseComponent.call(this);
  this.$modalContainer = null;
  this.$bodyElement = null;
};

WordPressTheme.Modal.prototype = Object.create(WordPressTheme.BaseComponent.prototype);
WordPressTheme.Modal.prototype.constructor = WordPressTheme.Modal;

/**
 * モーダルのセットアップ
 *
 * モーダルコンテナとbody要素を取得します。
 *
 * @returns {boolean} セットアップが成功したかどうか
 */
WordPressTheme.Modal.prototype.setup = function () {
  this.$modalContainer = WordPressTheme.Utils.safeGetElement(
    WordPressTheme.CONFIG.selectors.modal,
    "Modal"
  );
  this.$bodyElement = jQuery(WordPressTheme.CONFIG.selectors.body);

  if (this.$modalContainer === null) {
    WordPressTheme.Utils.logWarning("Modal", "setup", "Modal container not found", {});
    return false;
  }
  return true;
};

/**
 * モーダルのイベントバインド
 *
 * 画像クリックとモーダル操作のイベントを設定します。
 */
WordPressTheme.Modal.prototype.bindEvents = function () {
  var self = this;

  // ギャラリー画像のクリックイベント
  jQuery(".page-about-gallery__image img").click(function () {
    self.openModal(jQuery(this));
  });

  // モーダル背景のクリックイベント
  this.$modalContainer.on("click", function () {
    self.closeModal();
  });

  // モーダル内画像のクリックイベント（イベント伝播を停止）
  this.$modalContainer.find("img").on("click", function (e) {
    e.stopPropagation();
    self.closeModal();
  });
};

/**
 * モーダルを開く
 *
 * 指定された画像をモーダルで表示します。
 *
 * @param {jQuery} $imageElement - 表示する画像要素
 */
WordPressTheme.Modal.prototype.openModal = function ($imageElement) {
  this.$modalContainer.html($imageElement.prop("outerHTML"));
  this.$modalContainer.fadeIn(WordPressTheme.CONFIG.animation.duration.normal);
  this.$bodyElement.addClass("is-noscroll");
};

/**
 * モーダルを閉じる
 *
 * モーダルを非表示にし、スクロールを有効にします。
 */
WordPressTheme.Modal.prototype.closeModal = function () {
  this.$modalContainer.fadeOut(WordPressTheme.CONFIG.animation.duration.normal);
  this.$bodyElement.removeClass("is-noscroll");
};

// ========================================
// アコーディオンクラス
// ========================================
/**
 * アコーディオンコンポーネント
 *
 * 月別・年別のアコーディオン機能を管理します。
 * クリックによる開閉アニメーションを制御します。
 *
 * @class Accordion
 * @extends BaseComponent
 * @constructor
 */
WordPressTheme.Accordion = function () {
  WordPressTheme.BaseComponent.call(this);
  this.$monthAccordions = null;
  this.$yearAccordions = null;
};

WordPressTheme.Accordion.prototype = Object.create(WordPressTheme.BaseComponent.prototype);
WordPressTheme.Accordion.prototype.constructor = WordPressTheme.Accordion;

/**
 * アコーディオンのセットアップ
 *
 * 月別・年別アコーディオン要素を取得します。
 *
 * @returns {boolean} セットアップが成功したかどうか
 */
WordPressTheme.Accordion.prototype.setup = function () {
  this.$monthAccordions = WordPressTheme.Utils.safeGetElement(
    WordPressTheme.CONFIG.selectors.accordion.box +
      " " +
      WordPressTheme.CONFIG.selectors.accordion.month,
    "Accordion"
  );
  this.$yearAccordions = WordPressTheme.Utils.safeGetElement(
    WordPressTheme.CONFIG.selectors.accordion.box +
      " " +
      WordPressTheme.CONFIG.selectors.accordion.year,
    "Accordion"
  );

  if (this.$monthAccordions === null || this.$yearAccordions === null) {
    WordPressTheme.Utils.logWarning("Accordion", "setup", "Accordion elements not found", {});
    return false;
  }
  return true;
};

/**
 * アコーディオンのイベントバインド
 *
 * 年別アコーディオンのクリックイベントを設定します。
 */
WordPressTheme.Accordion.prototype.bindEvents = function () {
  var self = this;
  this.$yearAccordions.on("click", function () {
    var $clickedElement = jQuery(this);
    $clickedElement.toggleClass("is-open");
    $clickedElement.next().slideToggle();
  });
};

// ========================================
// FAQクラス
// ========================================
/**
 * FAQコンポーネント
 *
 * よくある質問の開閉機能を管理します。
 * 質問クリック時の回答表示/非表示を制御します。
 *
 * @class FAQ
 * @extends BaseComponent
 * @constructor
 */
WordPressTheme.FAQ = function () {
  WordPressTheme.BaseComponent.call(this);
  this.$faqQuestions = null;
};

WordPressTheme.FAQ.prototype = Object.create(WordPressTheme.BaseComponent.prototype);
WordPressTheme.FAQ.prototype.constructor = WordPressTheme.FAQ;

/**
 * FAQのセットアップ
 *
 * FAQ質問要素を取得します。
 *
 * @returns {boolean} セットアップが成功したかどうか
 */
WordPressTheme.FAQ.prototype.setup = function () {
  this.$faqQuestions = WordPressTheme.Utils.safeGetElement(
    WordPressTheme.CONFIG.selectors.faq,
    "FAQ"
  );

  if (this.$faqQuestions === null) {
    WordPressTheme.Utils.logWarning("FAQ", "setup", "FAQ questions not found", {});
    return false;
  }
  return true;
};

/**
 * FAQのイベントバインド
 *
 * 質問クリック時の開閉アニメーションを設定します。
 */
WordPressTheme.FAQ.prototype.bindEvents = function () {
  this.$faqQuestions.on("click", function () {
    var $clickedQuestion = jQuery(this);
    $clickedQuestion.next().slideToggle();
  });
};

// ========================================
// タブクラス
// ========================================
/**
 * タブコンポーネント
 *
 * タブ切り替え機能を管理します。
 * タブメニュークリック時のコンテンツ切り替えを制御します。
 *
 * @class Tab
 * @extends BaseComponent
 * @constructor
 */
WordPressTheme.Tab = function () {
  WordPressTheme.BaseComponent.call(this);
  this.$tabMenuItems = null;
  this.$tabContentItems = null;
};

WordPressTheme.Tab.prototype = Object.create(WordPressTheme.BaseComponent.prototype);
WordPressTheme.Tab.prototype.constructor = WordPressTheme.Tab;

/**
 * タブのセットアップ
 *
 * タブメニューとコンテンツ要素を取得します。
 *
 * @returns {boolean} セットアップが成功したかどうか
 */
WordPressTheme.Tab.prototype.setup = function () {
  this.$tabMenuItems = WordPressTheme.Utils.safeGetElement(
    WordPressTheme.CONFIG.selectors.tab.menu,
    "Tab"
  );
  this.$tabContentItems = jQuery(WordPressTheme.CONFIG.selectors.tab.content);

  if (this.$tabMenuItems === null) {
    WordPressTheme.Utils.logWarning("Tab", "setup", "Tab menu items not found", {});
    return false;
  }
  return true;
};

/**
 * タブのイベントバインド
 *
 * タブメニュークリック時の切り替え処理を設定します。
 */
WordPressTheme.Tab.prototype.bindEvents = function () {
  var self = this;
  this.$tabMenuItems.on("click", function () {
    var tabNumber = jQuery(this).data("number");
    if (tabNumber) {
      self.activateTab(tabNumber);
    }
  });

  // URLパラメータによる初期タブ設定
  this.initializeTab();
};

/**
 * 指定されたタブをアクティブにする
 *
 * @param {number} tabNumber - アクティブにするタブ番号
 */
WordPressTheme.Tab.prototype.activateTab = function (tabNumber) {
  this.$tabMenuItems.removeClass("is-active");
  this.$tabContentItems.removeClass("is-active");

  this.$tabMenuItems.filter('[data-number="' + tabNumber + '"]').addClass("is-active");
  this.$tabContentItems.filter('[data-number="' + tabNumber + '"]').addClass("is-active");
};

/**
 * URLパラメータに基づいて初期タブを設定
 */
WordPressTheme.Tab.prototype.initializeTab = function () {
  try {
    var urlTabParam = new URL(window.location.href).searchParams.get("tab");
    if (urlTabParam) {
      this.activateTab(parseInt(urlTabParam));
    }
  } catch (error) {
    WordPressTheme.Utils.logError("Tab", "initializeTab", error, {});
  }
};

// ========================================
// ページナビゲーションクラス
// ========================================
/**
 * ページナビゲーションコンポーネント
 *
 * 前後ページへのナビゲーション機能を管理します。
 * ナビゲーション要素の表示/非表示を制御します。
 *
 * @class PageNavigation
 * @extends BaseComponent
 * @constructor
 */
WordPressTheme.PageNavigation = function () {
  WordPressTheme.BaseComponent.call(this);
  this.$prevNavigation = null;
  this.$nextNavigation = null;
};

WordPressTheme.PageNavigation.prototype = Object.create(WordPressTheme.BaseComponent.prototype);
WordPressTheme.PageNavigation.prototype.constructor = WordPressTheme.PageNavigation;

/**
 * ページナビゲーションのセットアップ
 *
 * 前後ナビゲーション要素を取得し、表示制御を行います。
 */
WordPressTheme.PageNavigation.prototype.setup = function () {
  this.$prevNavigation = WordPressTheme.Utils.safeGetElement(
    WordPressTheme.CONFIG.selectors.pagenavi.prev,
    "PageNavigation"
  );
  this.$nextNavigation = WordPressTheme.Utils.safeGetElement(
    WordPressTheme.CONFIG.selectors.pagenavi.next,
    "PageNavigation"
  );

  if (this.$prevNavigation === null) {
    WordPressTheme.Utils.logWarning("PageNavigation", "setup", "Previous navigation not found", {});
  }
  if (this.$nextNavigation === null) {
    WordPressTheme.Utils.logWarning("PageNavigation", "setup", "Next navigation not found", {});
  }

  // リンクが存在しない場合は非表示
  if (this.$prevNavigation !== null && this.$prevNavigation.find("a").length === 0) {
    this.$prevNavigation.hide();
  }

  if (this.$nextNavigation !== null && this.$nextNavigation.find("a").length === 0) {
    this.$nextNavigation.hide();
  }
};

// ========================================
// ヘッダースクロールクラス
// ========================================
/**
 * ヘッダースクロールコンポーネント
 *
 * スクロール時のヘッダー表示/非表示を管理します。
 * スクロール位置に応じてヘッダーの表示状態を制御します。
 *
 * @class HeaderScroll
 * @extends BaseComponent
 * @constructor
 */
WordPressTheme.HeaderScroll = function () {
  WordPressTheme.BaseComponent.call(this);
  this.$headerElements = null;
};

WordPressTheme.HeaderScroll.prototype = Object.create(WordPressTheme.BaseComponent.prototype);
WordPressTheme.HeaderScroll.prototype.constructor = WordPressTheme.HeaderScroll;

/**
 * ヘッダースクロールのセットアップ
 *
 * ヘッダー要素を取得します。
 */
WordPressTheme.HeaderScroll.prototype.setup = function () {
  this.$headerElements = WordPressTheme.Utils.safeGetElement(
    WordPressTheme.CONFIG.selectors.headerElements,
    "HeaderScroll"
  );
};

/**
 * ヘッダースクロールのイベントバインド
 *
 * スクロールイベントでヘッダーの表示/非表示を制御します。
 */
WordPressTheme.HeaderScroll.prototype.bindEvents = function () {
  var self = this;
  jQuery(window).on(
    "scroll",
    WordPressTheme.Utils.throttle(function () {
      var scrollPosition = jQuery(this).scrollTop();
      var threshold = WordPressTheme.CONFIG.scroll.threshold;

      if (scrollPosition > threshold) {
        self.$headerElements.addClass("js-change-color");
      } else {
        self.$headerElements.removeClass("js-change-color");
      }
    }, 16)
  );
};

// ========================================
// GSAPアニメーションクラス
// ========================================
/**
 * GSAPアニメーションコンポーネント
 *
 * GSAPを使用した各種アニメーションを管理します。
 * セクションタイトル、ブログカード、フォームのアニメーションを制御します。
 *
 * @class GSAPAnimation
 * @extends BaseComponent
 * @constructor
 */
WordPressTheme.GSAPAnimation = function () {
  WordPressTheme.BaseComponent.call(this);
  this.dependencies = ["gsap", "ScrollTrigger"];
};

WordPressTheme.GSAPAnimation.prototype = Object.create(WordPressTheme.BaseComponent.prototype);
WordPressTheme.GSAPAnimation.prototype.constructor = WordPressTheme.GSAPAnimation;

/**
 * GSAPアニメーションのセットアップ
 *
 * 各種アニメーションの初期化を行います。
 */
WordPressTheme.GSAPAnimation.prototype.setup = function () {
  try {
    gsap.registerPlugin(ScrollTrigger);
    this.initSectionTitleAnimation();
    this.initCommonFadeDownAnimation();
    this.initInformationCardAnimation();
    this.initPriceContactAnimation();

    this.initContactFormAnimation();
    this.initFadeInAnimation();
  } catch (error) {
    WordPressTheme.Utils.logError("GSAPAnimation", "setup", error, {});
  }
};

/**
 * セクションタイトルアニメーションの初期化
 *
 * セクションタイトルのスクロールアニメーションを設定します。
 * 文字がランダムに浮き上がるアニメーションを実装。
 */
WordPressTheme.GSAPAnimation.prototype.initSectionTitleAnimation = function () {
  var self = this;

  // GSAPとScrollTriggerが利用可能かチェック
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    WordPressTheme.Utils.logWarning("GSAPAnimation", "GSAP or ScrollTrigger not available", {});
    return;
  }

  // .section-title__main要素が存在するかチェック
  if (!document.querySelector(".section-title__main")) {
    WordPressTheme.Utils.logWarning("GSAPAnimation", "section-title__main element not found", {});
    return;
  }

  jQuery(".section-title__main").each(function () {
    var $section = jQuery(this);
    var $texts = $section.find(".text");

    // 個別文字のランダムアニメーションのみ実行
    if ($texts.length > 0) {
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
            from: "random", // ランダムに文字が浮き上がる
          },
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: $section[0],
            start: "top 70%",
          },
        }
      );
    }
  });
};

/**
 * 共通フェードダウンアニメーションの初期化
 *
 * js-fade-downクラスを持つ要素のスクロールアニメーションを設定します。
 * section-title__mainと同じ動きで上から下に降りながら出現します。
 */
WordPressTheme.GSAPAnimation.prototype.initCommonFadeDownAnimation = function () {
  // GSAPとScrollTriggerが利用可能かチェック
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    WordPressTheme.Utils.logWarning("GSAPAnimation", "GSAP or ScrollTrigger not available", {});
    return;
  }

  // .js-fade-down要素が存在するかチェック
  if (!document.querySelector(".js-fade-down")) {
    WordPressTheme.Utils.logWarning("GSAPAnimation", "js-fade-down element not found", {});
    return;
  }

  // ブログカードの場合は特別処理（ランダム表示）
  if (jQuery(".blog-card.js-fade-down").length > 0) {
    gsap.fromTo(
      ".blog-card.js-fade-down",
      {
        opacity: 0,
        y: -60, // 上から60pxの位置から開始
      },
      {
        opacity: 1,
        y: 0, // 元の位置に下に降りる
        duration: 1.6, // section-title__mainと同じ速さ
        ease: "power2.out",
        stagger: { each: 0.3, from: "random" }, // ランダム表示
        scrollTrigger: {
          trigger: ".blog-cards",
          start: "top 55%", // section-title__mainと同じタイミング
        },
      }
    );
  }

  // その他のjs-fade-down要素（ブログカード以外）
  jQuery(".js-fade-down:not(.blog-card)").each(function () {
    var $element = jQuery(this);

    // section-title__mainと同じ動きで上から下に降りながら出現
    gsap.fromTo(
      $element,
      {
        opacity: 0,
        y: -60, // 上から60pxの位置から開始
      },
      {
        opacity: 1,
        y: 0, // 元の位置に下に降りる
        duration: 1.6, // section-title__mainと同じ速さ
        ease: "power2.out",
        scrollTrigger: {
          trigger: $element[0],
          start: "top 55%", // section-title__mainと同じタイミング
        },
      }
    );
  });
};

/**
 * インフォメーションカードアニメーションの初期化
 *
 * インフォメーションカードのスクロールアニメーションを設定します。
 * bodyが先にsection-title__mainと同じ動きで出現し、その後imgが出現します。
 */
WordPressTheme.GSAPAnimation.prototype.initInformationCardAnimation = function () {
  // GSAPとScrollTriggerが利用可能かチェック
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    WordPressTheme.Utils.logWarning("GSAPAnimation", "GSAP or ScrollTrigger not available", {});
    return;
  }

  jQuery(".information-card").each(function () {
    var $card = jQuery(this);
    var $img = $card.find(".information-card__img");

    // bodyはjs-fade-downクラスで共通アニメーション処理

    // 2. bodyアニメーション完了後にimgが出現
    if ($img.length > 0) {
      gsap.fromTo(
        $img,
        {
          opacity: 0,
          scale: 0.8, // 少し小さくしてから
        },
        {
          opacity: 1,
          scale: 1, // 元のサイズに
          duration: 0.8,
          ease: "power2.out",
          delay: 0.5, // bodyアニメーション開始から0.5秒後
          scrollTrigger: {
            trigger: $card[0],
            start: "top 90%",
          },
        }
      );
    }
  });
};

/**
 * プライス・コンタクトアニメーションの初期化
 *
 * プライスセクションのスクロールアニメーションを設定します。
 * contact__info → price__image → contact__mapの順序で出現します。
 */
WordPressTheme.GSAPAnimation.prototype.initPriceContactAnimation = function () {
  // GSAPとScrollTriggerが利用可能かチェック
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    WordPressTheme.Utils.logWarning("GSAPAnimation", "GSAP or ScrollTrigger not available", {});
    return;
  }

  jQuery(".price__content").each(function () {
    var $content = jQuery(this);
    var $contactInfo = $content.find(".contact__info");
    var $contactMap = $content.find(".contact__map-wrap");

    // 一つのトリガーでタイムライン制御
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: $content[0],
        start: "top 80%",
      },
    });

    // 時系列でアニメーション実行
    if ($contactInfo.length > 0) {
      tl.fromTo(
        $contactInfo,
        { opacity: 0, y: -60 },
        { opacity: 1, y: 0, duration: 1.6, ease: "power2.out" }
      );
    }

    if ($contactMap.length > 0) {
      tl.fromTo(
        $contactMap,
        { opacity: 0 },
        { opacity: 1, duration: 3, ease: "power2.out" },
        "+=1.5"
      );
    }
  });
};

/**
 * インフォメーションカードアニメーションの初期化
 *
 * インフォメーションカードのスクロールアニメーションを設定します。
 * information-content → information__buttonの順序で出現します。
 * information-card__imgはjs-colorboxで独立制御されます。
 */
WordPressTheme.GSAPAnimation.prototype.initInformationCardAnimation = function () {
  // GSAPとScrollTriggerが利用可能かチェック
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    WordPressTheme.Utils.logWarning("GSAPAnimation", "GSAP or ScrollTrigger not available", {});
    return;
  }

  jQuery(".information__card").each(function () {
    var $card = jQuery(this);
    var $content = $card.find(".information-content");
    var $button = $card.find(".information__button .button");

    // 一つのトリガーでタイムライン制御
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: $card[0],
        start: "top 80%",
      },
    });

    // 時系列でアニメーション実行
    if ($content.length > 0) {
      tl.fromTo(
        $content,
        { opacity: 0, y: -60 },
        { opacity: 1, y: 0, duration: 1.6, ease: "power2.out" }
      );
    }

    if ($button.length > 0) {
      tl.fromTo(
        $button,
        { opacity: 0 },
        { opacity: 1, duration: 1.0, ease: "power2.out" },
        "+=1.5"
      );
    }
  });
};

/**
 * コンタクトフォームアニメーションの初期化
 *
 * フォームアイテムのスクロールアニメーションを設定します。
 */
WordPressTheme.GSAPAnimation.prototype.initContactFormAnimation = function () {
  if (WordPressTheme.Utils.elementExists(WordPressTheme.CONFIG.selectors.formItem)) {
    gsap.fromTo(
      WordPressTheme.CONFIG.selectors.formItem,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: WordPressTheme.CONFIG.animation.easing.smooth,
        stagger: 0.2,
        scrollTrigger: {
          trigger: WordPressTheme.CONFIG.selectors.formItem,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
};

/**
 * フェードインアニメーションの初期化
 *
 * js-fade-inクラスを持つ要素のスクロールアニメーションを設定します。
 * start: "top 70%"の位置から浮かんでくるように出現します。
 */
WordPressTheme.GSAPAnimation.prototype.initFadeInAnimation = function () {
  // GSAPとScrollTriggerが利用可能かチェック
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    WordPressTheme.Utils.logWarning("GSAPAnimation", "GSAP or ScrollTrigger not available", {});
    return;
  }

  // .js-fade-in要素が存在するかチェック
  if (!document.querySelector(".js-fade-in")) {
    WordPressTheme.Utils.logWarning("GSAPAnimation", "js-fade-in element not found", {});
    return;
  }

  jQuery(".js-fade-in").each(function () {
    var $element = jQuery(this);

    // 要素がその位置から浮かんでくるように出現
    gsap.fromTo(
      $element,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1.0, // 適度な速さ
        ease: "power2.out",
        scrollTrigger: {
          trigger: $element[0],
          start: "top 90%", // 要求された位置
        },
      }
    );
  });
};

// ========================================
// Lenisスムーススクロールクラス
// ========================================
/**
 * Lenisスムーススクロールコンポーネント
 *
 * Lenisライブラリを使用した滑らかなスクロール機能を管理します。
 * ページ全体のスクロール体験を向上させます。
 *
 * @class SmoothScroll
 * @extends BaseComponent
 * @constructor
 */
WordPressTheme.SmoothScroll = function () {
  WordPressTheme.BaseComponent.call(this);
  this.dependencies = ["Lenis"];
  this.lenisInstance = null;
};

WordPressTheme.SmoothScroll.prototype = Object.create(WordPressTheme.BaseComponent.prototype);
WordPressTheme.SmoothScroll.prototype.constructor = WordPressTheme.SmoothScroll;

/**
 * スムーススクロールのセットアップ
 *
 * Lenisインスタンスを初期化し、アニメーションフレームを開始します。
 */
WordPressTheme.SmoothScroll.prototype.setup = function () {
  try {
    this.lenisInstance = new Lenis({
      smooth: true,
      lerp: WordPressTheme.CONFIG.scroll.smoothLerp,
      smoothTouch: false,
    });

    this.startAnimationFrame();
  } catch (error) {
    WordPressTheme.Utils.logError("SmoothScroll", "setup", error, {});
  }
};

/**
 * アニメーションフレームの開始
 *
 * Lenisのアニメーションループを開始します。
 */
WordPressTheme.SmoothScroll.prototype.startAnimationFrame = function () {
  var self = this;
  function raf(time) {
    self.lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
};

/**
 * スムーススクロールの破棄処理
 *
 * Lenisインスタンスを適切に破棄します。
 */
WordPressTheme.SmoothScroll.prototype.destroy = function () {
  if (this.lenisInstance && typeof this.lenisInstance.destroy === "function") {
    try {
      this.lenisInstance.destroy();
    } catch (error) {
      WordPressTheme.Utils.logError("SmoothScroll", "destroy", error, {});
    }
  }
  this.lenisInstance = null;
  WordPressTheme.BaseComponent.prototype.destroy.call(this);
};

// ========================================
// 高度なアニメーションクラス
// ========================================
/**
 * 高度なアニメーションコンポーネント
 *
 * 複雑なアニメーション効果を管理します。
 * MVパララックス、拡大、フェード、Aboutギャラリー、カラー変化アニメーションを統合管理します。
 *
 * @class AdvancedAnimation
 * @extends BaseComponent
 * @constructor
 */
WordPressTheme.AdvancedAnimation = function () {
  WordPressTheme.BaseComponent.call(this);
  this.dependencies = ["gsap", "ScrollTrigger"];
  this.mvParallaxTrigger = null;
  this.mvScaleTrigger = null;
  this.mvTitleFadeTrigger = null;
};

WordPressTheme.AdvancedAnimation.prototype = Object.create(WordPressTheme.BaseComponent.prototype);
WordPressTheme.AdvancedAnimation.prototype.constructor = WordPressTheme.AdvancedAnimation;

/**
 * 高度なアニメーションのセットアップ
 *
 * 各種アニメーションの初期化を行います。
 *
 * @returns {boolean} セットアップが成功したかどうか
 */
WordPressTheme.AdvancedAnimation.prototype.setup = function () {
  try {
    gsap.registerPlugin(ScrollTrigger);
    this.initMvParallax();
    this.initMvScaleAnimation();
    this.initMvTitleFadeAnimation();
    this.initAboutGalleryAnimation();
    this.initColorChangeAnimation();
    return true;
  } catch (error) {
    WordPressTheme.Utils.logError("AdvancedAnimation", "setup", error, {});
    return false;
  }
};

/**
 * MVパララックス効果の初期化
 *
 * メインビジュアルのパララックス効果を設定します。
 * スクロールに応じて背景が固定される効果を実現します。
 */
WordPressTheme.AdvancedAnimation.prototype.initMvParallax = function () {
  try {
    this.mvParallaxTrigger = ScrollTrigger.create({
      trigger: ".mv",
      start: "top top",
      end: "bottom top",
      pin: WordPressTheme.CONFIG.selectors.mv.stickyWrap,
      pinSpacing: false,
      scrub: true,
      pinType: "transform",
    });
    ScrollTrigger.refresh();
  } catch (error) {
    WordPressTheme.Utils.logError("AdvancedAnimation", "initMvParallax", error, {});
  }
};

/**
 * MV拡大アニメーションの初期化
 *
 * メインビジュアルの拡大アニメーションを設定します。
 * スクロールに応じてスワイパーが拡大する効果を実現します。
 */
WordPressTheme.AdvancedAnimation.prototype.initMvScaleAnimation = function () {
  try {
    if (WordPressTheme.Utils.elementExists(WordPressTheme.CONFIG.selectors.mv.swiper)) {
      this.mvScaleTrigger = gsap.to(WordPressTheme.CONFIG.selectors.mv.swiper, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: ".mv",
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
    }
  } catch (error) {
    WordPressTheme.Utils.logError("AdvancedAnimation", "initMvScaleAnimation", error, {});
  }
};

/**
 * MVタイトルフェードアニメーションの初期化
 *
 * メインビジュアルのタイトルフェードアニメーションを設定します。
 * スクロールに応じてタイトルがフェードアウトする効果を実現します。
 */
WordPressTheme.AdvancedAnimation.prototype.initMvTitleFadeAnimation = function () {
  try {
    if (WordPressTheme.Utils.elementExists(WordPressTheme.CONFIG.selectors.mv.titleWrap)) {
      this.mvTitleFadeTrigger = gsap.to(WordPressTheme.CONFIG.selectors.mv.titleWrap, {
        opacity: 0,
        y: -40,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".mv",
          start: "top top",
          end: "top+=100 top",
          scrub: 0.8,
        },
      });
    }
  } catch (error) {
    WordPressTheme.Utils.logError("AdvancedAnimation", "initMvTitleFadeAnimation", error, {});
  }
};

/**
 * Aboutギャラリーアニメーションの初期化
 *
 * Aboutページのギャラリー画像アニメーションを設定します。
 * スクロールに応じて画像が上から下に移動する効果を実現します。
 */
WordPressTheme.AdvancedAnimation.prototype.initAboutGalleryAnimation = function () {
  try {
    jQuery(".page-about-gallery__image img").each(function () {
      var imageElement = jQuery(this)[0];

      if (!imageElement || !imageElement.complete || imageElement.naturalHeight === 0) {
        return;
      }

      gsap.fromTo(
        imageElement,
        { y: -100 },
        {
          y: 0,
          scrollTrigger: {
            trigger: imageElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });
  } catch (error) {
    WordPressTheme.Utils.logError("AdvancedAnimation", "initAboutGalleryAnimation", error, {});
  }
};

/**
 * カラー変化アニメーションの初期化
 *
 * テキストのカラー変化アニメーションを設定します。
 * スクロールに応じて文字が順次色を変える効果を実現します。
 */
WordPressTheme.AdvancedAnimation.prototype.initColorChangeAnimation = function () {
  try {
    jQuery(WordPressTheme.CONFIG.selectors.colorChange).each(function () {
      var $textElement = jQuery(this);
      var originalText = $textElement.text();

      if (!originalText || originalText.length === 0) {
        return;
      }

      $textElement.empty();

      var textSpans = [];

      jQuery.each(originalText.split(""), function (i, char) {
        var $span = jQuery("<span>").text(char);
        $textElement.append($span);
        textSpans.push($span[0]);
      });

      var isAnimationComplete = false;

      var scrollTrigger = ScrollTrigger.create({
        trigger: $textElement[0],
        start: "top 80%",
        end: "bottom 50%",
        scrub: 8,
        onUpdate: function (self) {
          // アニメーションが完了済みの場合は何もしない
          if (isAnimationComplete) return;

          var progress = self.progress * textSpans.length;
          textSpans.forEach(function (span, index) {
            span.classList.toggle("is-active", index < progress);
          });

          // 進行度が100%に達したら完了フラグを立てる
          if (self.progress >= 1) {
            isAnimationComplete = true;
            // すべての文字にis-activeクラスを確実に追加
            textSpans.forEach(function (span) {
              span.classList.add("is-active");
            });
          }
        },
      });
    });
  } catch (error) {
    WordPressTheme.Utils.logError("AdvancedAnimation", "initColorChangeAnimation", error, {});
  }
};

/**
 * 高度なアニメーションの破棄処理
 *
 * すべてのアニメーションインスタンスを適切に破棄します。
 */
WordPressTheme.AdvancedAnimation.prototype.destroy = function () {
  try {
    if (this.mvParallaxTrigger && typeof this.mvParallaxTrigger.kill === "function") {
      this.mvParallaxTrigger.kill();
    }
    if (this.mvScaleTrigger && typeof this.mvScaleTrigger.kill === "function") {
      this.mvScaleTrigger.kill();
    }
    if (this.mvTitleFadeTrigger && typeof this.mvTitleFadeTrigger.kill === "function") {
      this.mvTitleFadeTrigger.kill();
    }
  } catch (error) {
    WordPressTheme.Utils.logError("AdvancedAnimation", "destroy", error, {});
  }
  WordPressTheme.BaseComponent.prototype.destroy.call(this);
};

// ========================================
// アプリケーション管理クラス
// ========================================
/**
 * アプリケーション管理コンポーネント
 *
 * すべてのコンポーネントを統合管理します。
 * コンポーネントの登録、初期化、破棄を一元管理します。
 *
 * @class App
 * @constructor
 */
WordPressTheme.App = function () {
  this.components = {};
  this.isInitialized = false;
  this.componentName = "App";
};

WordPressTheme.App.prototype = {
  /**
   * コンポーネントを登録
   *
   * 新しいコンポーネントをアプリケーションに登録します。
   * コンポーネントの妥当性チェックも行います。
   *
   * @param {string} name - コンポーネント名
   * @param {Object} component - コンポーネントインスタンス
   * @returns {boolean} 登録が成功したかどうか
   */
  registerComponent: function (name, component) {
    try {
      if (!component || typeof component.init !== "function") {
        WordPressTheme.Utils.logError(
          this.componentName,
          "registerComponent",
          new Error("Invalid component: " + name),
          { componentName: name, component: component }
        );
        return false;
      }

      this.components[name] = component;
      WordPressTheme.Utils.logWarning(this.componentName, "Component registered: " + name, {
        componentName: name,
      });
      return true;
    } catch (error) {
      WordPressTheme.Utils.logError(this.componentName, "registerComponent", error, {
        componentName: name,
        component: component,
      });
      return false;
    }
  },

  /**
   * アプリケーションを初期化
   *
   * すべてのコンポーネントを登録し、初期化します。
   */
  init: function () {
    if (this.isInitialized) {
      WordPressTheme.Utils.logWarning(this.componentName, "Application already initialized", {});
      return;
    }

    WordPressTheme.Utils.logWarning(this.componentName, "Initializing application...", {});

    // コンポーネントの登録
    var componentRegistrations = [
      { name: "hamburgerMenu", component: new WordPressTheme.HamburgerMenu() },
      { name: "swiperManager", component: new WordPressTheme.SwiperManager() },
      { name: "imageAnimation", component: new WordPressTheme.ImageAnimation() },
      { name: "modal", component: new WordPressTheme.Modal() },
      { name: "accordion", component: new WordPressTheme.Accordion() },
      { name: "faq", component: new WordPressTheme.FAQ() },
      { name: "tab", component: new WordPressTheme.Tab() },
      { name: "pageNavigation", component: new WordPressTheme.PageNavigation() },
      { name: "headerScroll", component: new WordPressTheme.HeaderScroll() },
      { name: "gsapAnimation", component: new WordPressTheme.GSAPAnimation() },
      { name: "smoothScroll", component: new WordPressTheme.SmoothScroll() },
      { name: "advancedAnimation", component: new WordPressTheme.AdvancedAnimation() },
    ];

    var registeredCount = 0;
    for (var i = 0; i < componentRegistrations.length; i++) {
      var registration = componentRegistrations[i];
      if (this.registerComponent(registration.name, registration.component)) {
        registeredCount++;
      }
    }

    WordPressTheme.Utils.logWarning(
      this.componentName,
      "Registered " + registeredCount + " components",
      { total: componentRegistrations.length, registered: registeredCount }
    );

    // 各コンポーネントの初期化
    var initializedCount = 0;
    for (var key in this.components) {
      if (this.components[key] && typeof this.components[key].init === "function") {
        try {
          this.components[key].init();
          initializedCount++;
        } catch (error) {
          WordPressTheme.Utils.logError(
            this.componentName,
            "Component initialization failed: " + key,
            error,
            { componentName: key }
          );
        }
      }
    }

    WordPressTheme.Utils.logWarning(
      this.componentName,
      "Initialized " + initializedCount + " components",
      { total: Object.keys(this.components).length, initialized: initializedCount }
    );

    this.isInitialized = true;
    WordPressTheme.Utils.logWarning(this.componentName, "Application initialized successfully", {});
  },

  /**
   * アプリケーションを破棄
   *
   * すべてのコンポーネントを適切に破棄します。
   * メモリリークを防ぐためのクリーンアップを行います。
   */
  destroy: function () {
    WordPressTheme.Utils.logWarning(this.componentName, "Destroying application...", {});

    var destroyedCount = 0;
    for (var key in this.components) {
      if (this.components[key] && typeof this.components[key].destroy === "function") {
        try {
          this.components[key].destroy();
          destroyedCount++;
        } catch (error) {
          WordPressTheme.Utils.logError(
            this.componentName,
            "Component destruction failed: " + key,
            error,
            { componentName: key }
          );
        }
      }
    }

    WordPressTheme.Utils.logWarning(
      this.componentName,
      "Destroyed " + destroyedCount + " components",
      { total: Object.keys(this.components).length, destroyed: destroyedCount }
    );

    this.components = {};
    this.isInitialized = false;
    WordPressTheme.Utils.logWarning(this.componentName, "Application destroyed successfully", {});
  },
};

// ========================================
// メイン初期化処理
// ========================================
/**
 * jQuery ready処理
 *
 * DOMの準備が完了した後にアプリケーションを初期化します。
 * エラーハンドリングとパフォーマンス測定を行います。
 */
jQuery(function ($) {
  WordPressTheme.Utils.safeExecute(
    function () {
      // アプリケーションの初期化
      WordPressTheme.app = new WordPressTheme.App();
      WordPressTheme.app.init();
    },
    "Main",
    "jQuery ready",
    {},
    function () {
      WordPressTheme.Utils.logError(
        "Main",
        "jQuery ready",
        new Error("Application initialization failed"),
        {}
      );
    }
  );
});

// ========================================
// ページ読み込み後のアニメーション処理
// ========================================
/**
 * ページ読み込み完了後のアニメーション処理
 *
 * すべてのリソース（画像、フォント等）の読み込み完了後に
 * テキスト分割アニメーションとトップページ専用アニメーションを実行します。
 */
jQuery(window).on("load", function () {
  WordPressTheme.Utils.safeExecute(
    function () {
      if (typeof gsap === "undefined") {
        WordPressTheme.Utils.logWarning(
          "load",
          "GSAP not loaded - split text animation skipped",
          {}
        );
        return;
      }

      // -------------------------------------
      // テキスト分割ヘルパー関数
      // -------------------------------------
      function splitTextToSpans(text) {
        try {
          return text
            .split("")
            .map(function (char) {
              if (char === " ") return '<span class="char is-space">&nbsp;</span>';
              if (char === "&") return '<span class="char">&amp;</span>';
              return '<span class="char">' + char + "</span>";
            })
            .join("");
        } catch (error) {
          WordPressTheme.Utils.logError("load", "splitTextToSpans", error, { text: text });
          return text; // フォールバック: 元のテキストを返す
        }
      }

      // -------------------------------------
      // splitText構築とhoverアニメ設定（全ページ共通）
      // -------------------------------------
      var allBeforeSpans = [];

      jQuery(WordPressTheme.CONFIG.selectors.splitText).each(function () {
        try {
          var $targetElement = jQuery(this);
          var originalText = $targetElement.text();

          if (!originalText || originalText.length === 0) {
            WordPressTheme.Utils.logWarning("load", "Empty text content for splitText", {
              selector: WordPressTheme.CONFIG.selectors.splitText,
            });
            return;
          }

          var spanHTML = splitTextToSpans(originalText);

          var html =
            '<span class="text-wrap">' +
            '<span class="text-original">' +
            originalText +
            "</span>" +
            '<div class="before">' +
            spanHTML +
            "</div>" +
            '<div class="after">' +
            spanHTML +
            "</div>" +
            "</span>";
          $targetElement.html(html);

          var beforeSpans = $targetElement.find(".before .char").toArray();
          var afterSpans = $targetElement.find(".after .char").toArray();

          // 初期位置と非表示セット（チラつき防止）
          gsap.set(beforeSpans, { y: "0%" });
          gsap.set(afterSpans, { y: "100%", opacity: 1, visibility: "visible" });
          gsap.set($targetElement, { autoAlpha: 1 }); // すぐ表示（CSS初期で非表示だったため）

          allBeforeSpans.push.apply(allBeforeSpans, beforeSpans);

          // マウスエンター時のアニメーション
          $targetElement.on("mouseenter", function () {
            try {
              $targetElement.addClass("is-animating");
              gsap.to(beforeSpans, { y: "-100%", stagger: 0.03, duration: 0.05, ease: "none" });
              gsap.to(afterSpans, { y: "0%", stagger: 0.03, duration: 0.05, ease: "none" });
            } catch (error) {
              WordPressTheme.Utils.logError("load", "mouseenter animation", error, {});
            }
          });

          // マウスリーブ時のアニメーション
          $targetElement.on("mouseleave", function () {
            try {
              gsap.to(beforeSpans, { y: "0%", stagger: 0.03, duration: 0.05, ease: "none" });
              gsap.to(afterSpans, { y: "100%", stagger: 0.03, duration: 0.05, ease: "none" });
              setTimeout(function () {
                $targetElement.removeClass("is-animating");
              }, 800);
            } catch (error) {
              WordPressTheme.Utils.logError("load", "mouseleave animation", error, {});
            }
          });
        } catch (error) {
          WordPressTheme.Utils.logError("load", "splitText processing", error, {});
        }
      });

      // -------------------------------------
      // トップページのみタイムライン実行
      // -------------------------------------
      if (jQuery("body").hasClass("is-top")) {
        try {
          // タイトル要素の文字分割
          var titleSelectors = [
            WordPressTheme.CONFIG.selectors.mv.main,
            WordPressTheme.CONFIG.selectors.mv.sub,
          ];
          titleSelectors.forEach(function (selector) {
            try {
              var $titleElement = jQuery(selector);
              if ($titleElement.length === 0) {
                WordPressTheme.Utils.logWarning("load", "Title element not found: " + selector, {
                  selector: selector,
                });
                return;
              }

              var chars = $titleElement
                .text()
                .split("")
                .map(function (char) {
                  return char === " " ? "&nbsp;" : char;
                })
                .map(function (c) {
                  return "<span>" + c + "</span>";
                })
                .join("");
              $titleElement.html(chars);
            } catch (error) {
              WordPressTheme.Utils.logError("load", "title processing", error, {
                selector: selector,
              });
            }
          });

          // タイトル・ロゴ・navの表示は事前にset（タイムライン内でなく）
          gsap.set(
            [
              WordPressTheme.CONFIG.selectors.mv.main,
              WordPressTheme.CONFIG.selectors.mv.sub,
              WordPressTheme.CONFIG.selectors.mv.logo,
              WordPressTheme.CONFIG.selectors.splitText,
            ],
            {
              autoAlpha: 1,
              visibility: "visible",
              opacity: 1,
            }
          );

          // アニメーションタイムラインの実行
          var timeline = gsap.timeline();

          timeline
            .to({}, { duration: 0.5 }) // 暗転後の待機

            .fromTo(
              WordPressTheme.CONFIG.selectors.mv.main +
                " span, " +
                WordPressTheme.CONFIG.selectors.mv.sub +
                " span",
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
              WordPressTheme.CONFIG.selectors.mv.logo + " img",
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
              WordPressTheme.CONFIG.selectors.mv.bg,
              { autoAlpha: 1 },
              { duration: 4, autoAlpha: 0, ease: "power2.out" },
              ">1"
            )

            .fromTo(
              WordPressTheme.CONFIG.selectors.mv.swiper,
              { scale: 1.15 },
              { scale: 1, duration: 2, ease: "power2.out" },
              "<"
            );
        } catch (error) {
          WordPressTheme.Utils.logError("load", "top page timeline", error, {});
        }
      }
    },
    "load",
    "split text animation",
    {},
    function () {
      WordPressTheme.Utils.logError(
        "load",
        "split text animation",
        new Error("Animation setup failed"),
        {}
      );
    }
  );
});
