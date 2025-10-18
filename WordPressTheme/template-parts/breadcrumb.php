<?php
$breadcrumbColor = ''; // デフォルトの文字色
$breadcrumbOutput = ''; // デフォルトの出力を初期化

if (function_exists('bcn_display')) {
  ob_start();
  bcn_display();
  $breadcrumbOutput = ob_get_clean();
}

if (is_404()) {
  $breadcrumbColor = 'color: white;'; // 404ページの場合、文字色を白に変更
}
?>

<div class="breadcrumb layout-breadcrumb" style="<?php echo $breadcrumbColor; ?>">
  <div class="breadcrumb__inner inner">
    <?php echo $breadcrumbOutput; ?>
  </div>
</div>