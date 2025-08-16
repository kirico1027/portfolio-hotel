<?php
function my_setup()
{
    add_theme_support('post-thumbnails'); // アイキャッチ画像を有効化
    add_theme_support('automatic-feed-links'); // 投稿とコメントのRSSフィードのリンクを有効化
    add_theme_support('title-tag'); // titleタグ自動生成
    add_theme_support('html5', array( // HTML5による出力
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
}
add_action('after_setup_theme', 'my_setup');

/* CSSとJavaScriptの読み込み */
function my_script_init() {
  // WordPressに含まれているjquery.jsを読み込まない
  wp_deregister_script('jquery');
  wp_enqueue_script('jquery', '//code.jquery.com/jquery-3.6.1.min.js', "", '1.0.1');

  // プラグイン系
  wp_enqueue_script('gsap', '//cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js', array(), null, true);
  wp_enqueue_script('gsap-scrolltrigger', '//cdn.jsdelivr.net/npm/gsap@3.12.7/dist/ScrollTrigger.min.js', array('gsap'), null, true);
  wp_enqueue_script('split-type', 'https://unpkg.com/split-type', array(), null, true);
  wp_enqueue_script('swiper', '//cdn.jsdelivr.net/npm/swiper@7/swiper-bundle.min.js', array(), '7.0.0', true);
  wp_enqueue_script('inview', get_theme_file_uri() . '/assets/js/jquery.inview.min.js', array(), '1.0.1');

  // Lenis（先に読み込む）
  wp_enqueue_script('lenis', 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.34/dist/lenis.min.js', array(), null, true);

  // メインJS（Lenis に依存）
  wp_enqueue_script('script-js', get_theme_file_uri() . '/assets/js/script.js', array('jquery', 'lenis'), '1.0.1', true);

  // Webフォント
  wp_enqueue_style('NotoSansJP', '//fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap');
  wp_enqueue_style('CormorantGaramond', '//fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,700;1,700&display=swap', array(), null);

  // CSS
  wp_enqueue_style('swiper-css', '//cdn.jsdelivr.net/npm/swiper@7/swiper-bundle.min.css', array(), '7.0.0');
  wp_enqueue_style('style-css', get_theme_file_uri() . '/assets/css/style.css', array(), '1.0.1');
}
add_action('wp_enqueue_scripts', 'my_script_init');


// body_classから特定のクラスを削除する
add_filter('body_class', function($classes){
unset($classes[array_search('blog', $classes)]);
return $classes;
});


// Contact Form 7で自動挿入されるPタグ、brタグを削除
add_filter('wpcf7_autop_or_not', 'wpcf7_autop_return_false');
function wpcf7_autop_return_false() {
  return false;
}

//送信ボタン→thanksページに遷移
add_action('wp_footer', 'redirect_to_thanks_page');

function redirect_to_thanks_page()
{
  //トップページのurlを取得
  $homeUrl = home_url();
  echo <<< EOD
    <script>
      document.addEventListener( 'wpcf7mailsent', function( event ) {

          //"/contact"以下は送信完了ページのurlに書き換える
          location = '{$homeUrl}/contact/thanks';
      }, false );
    </script>
  EOD;
}


// 404ページの場合、文字色を白に変更するスタイルを追加
function custom_breadcrumb_styles() {
  if (is_404()) {
    echo '<style>';
    echo '.breadcrumb .breadcrumb__inner span { color: white; }';
    echo '.breadcrumb .breadcrumb__inner .breadcrumb__arrow { color: white; }'; // 矢印の色も変更
    echo '</style>';
  }
}
add_action('wp_head', 'custom_breadcrumb_styles');


// アーカイブの表示投稿数の制御
function my_pre_get_posts($query)
{
  if (is_admin() || !$query->is_main_query()) {
    return;
  } elseif ($query->is_post_type_archive('campaign')) {
    $query->set('posts_per_page', 4);
    return;
  } elseif ($query->is_post_type_archive('voice')) {
    $query->set('posts_per_page', 6);
    return;
  }
}
add_action('pre_get_posts', 'my_pre_get_posts');



// クローラーのアクセス判別
function is_bot()
{
    $ua = $_SERVER['HTTP_USER_AGENT'];
    $bot = array(
        "googlebot",
        "msnbot",
        "yahoo"
    );
    foreach ($bot as $bot) {
        if (stripos($ua, $bot) !== false) {
            return true;
        }
    }
    return false;
}

// アクセス数を保存
function set_post_views()
{
    if (is_single()) {
        $post_id = get_the_ID();
        $count_key = 'post_views_count';
        $count = get_post_meta($post_id, $count_key, true);
        if (empty($count)) {
            delete_post_meta($post_id, $count_key);
            add_post_meta($post_id, $count_key, 1);
        } else {
            $count = $count + 1;
            update_post_meta($post_id, $count_key, $count);
        }
    }
}
add_action('wp_head', 'set_post_views');

// 管理画面のカラムを追加
function manage_posts_columns($columns)
{
    global $post_type;
    if ($post_type == 'post') {
        $columns['post_views_count'] = 'view数';
        $columns['thumbnail'] = 'サムネイル';
    }
    return $columns;
}
add_filter('manage_posts_columns', 'manage_posts_columns');

// アクセス数とサムネイルを出力
function add_column($column_name, $post_id)
{
    global $post_type;
    if ($post_type == 'post') {
        /*View数呼び出し*/
        if ($column_name === 'post_views_count') {
            $pv = get_post_meta($post_id, 'post_views_count', true);
            echo esc_html($pv);
        }
        /*サムネイル呼び出し*/
        if ($column_name === 'thumbnail') {
            $thumb = get_the_post_thumbnail($post_id, array(100, 100), 'thumbnail');
            echo $thumb;
        }

        /*ない場合は「なし」を表示する*/
        if (empty($pv) && empty($thumb)) {
            echo esc_html__('None');
        }
    }
}

add_action('manage_posts_custom_column', 'add_column', 10, 2);


//投稿をブログに変更
function Change_menulabel() {
  global $menu;
  global $submenu;
  $name = 'ブログ';
  $menu[5][0] = $name;
  $submenu['edit.php'][5][0] = $name.'一覧';
  $submenu['edit.php'][10][0] = '新しい'.$name;
  }
  function Change_objectlabel() {
  global $wp_post_types;
  $name = 'ブログ';
  $labels = &$wp_post_types['post']->labels;
  $labels->name = $name;
  $labels->singular_name = $name;
  $labels->add_new = _x('追加', $name);
  $labels->add_new_item = $name.'の新規追加';
  $labels->edit_item = $name.'の編集';
  $labels->new_item = '新規'.$name;
  $labels->view_item = $name.'を表示';
  $labels->search_items = $name.'を検索';
  $labels->not_found = $name.'が見つかりませんでした';
  $labels->not_found_in_trash = 'ゴミ箱に'.$name.'は見つかりませんでした';
  }
  add_action( 'init', 'Change_objectlabel' );
  add_action( 'admin_menu', 'Change_menulabel' );


//投稿画面で本文入力部分を非表示にする
function remove_wysiwyg()
{
  remove_post_type_support('voice', 'editor');
  remove_post_type_support('campaign', 'editor');
}
add_action('init', 'remove_wysiwyg');


//セレクトボックスにcampaignの投稿のタイトルを反映させる
function filter_wpcf7_form_tag($scanned_tag, $replace)
{
  if (!empty($scanned_tag)) {

    //nameで判別
    if ($scanned_tag['name'] == 'campaign-select') {

      //カスタム投稿タイプの取得
      global $post;
      $args = array(
        'posts_per_page' => -1,
        'post_type' => 'campaign',
        'order' => 'DESC',
      );
      $customPosts = get_posts($args);
      if ($customPosts) {
        foreach ($customPosts as $post) {
          setup_postdata($post);

          $title = get_the_title();

          //$scanned_tagに情報を追加
          $scanned_tag['values'][] = $title;
          $scanned_tag['labels'][] = $title;
        }
      }
      wp_reset_postdata();
    }
  }
  return $scanned_tag;
};
add_filter( 'wpcf7_form_tag', 'filter_wpcf7_form_tag', 11, 2 );
add_filter('protected_title_format', 'remove_protected');
function remove_protected($title)
{
  return '%s';
}

/**
 * @param string $page_title ページのtitle属性値
 * @param string $menu_title 管理画面のメニューに表示するタイトル
 * @param string $capability メニューを操作できる権限（maange_options とか）
 * @param string $menu_slug オプションページのスラッグ。ユニークな値にすること。
 * @param string|null $icon_url メニューに表示するアイコンの URL
 * @param int $position メニューの位置
 */

SCF::add_options_page(
	'ギャラリー画像',
	'ギャラリー画像',
	'manage_options',
	'gallery-option',
	'dashicons-format-gallery',
	11
);

/* ---------------------------------------
the_archive_title 前に付く余分な文字を削除
--------------------------------------- */
add_filter( 'get_the_archive_title', function ($title) {
if (is_category()) {
$title = single_cat_title('',false);
} elseif (is_tag()) {
$title = single_tag_title('',false);
} elseif (is_tax()) {
$title = single_term_title('',false);
} elseif (is_post_type_archive() ){
$title = post_type_archive_title('',false);
} elseif (is_date()) {
  // 年別の場合は年のみを表示
  if (is_year()) {
      $title = get_the_time('Y年');
  } else {
      $title = get_the_time('Y年n月');
  }
} elseif (is_search()) {
$title = '検索結果：'.esc_html( get_search_query(false) );
} elseif (is_404()) {
$title = 'ページが見つかりません';
} else {
}
return $title;
});