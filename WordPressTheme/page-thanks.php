<?php get_header(); ?>
<main>

  <?php get_template_part('template-parts/sub-mv'); ?>

  <?php get_template_part('template-parts/breadcrumb'); ?>

  <div class="page-complete layout-page-complete">
    <div class="page-complete__inner inner">
      <div class="page-complete__content">
        <p class="page-complete__lead">お問い合わせ内容を送信完了しました。</p>
        <p class="page-complete__text">このたびは、お問い合わせ頂き<br class="u-mobile">
          誠にありがとうございます。<br>
          お送り頂きました内容を確認の上、<br class="u-mobile">
          3営業日以内に折り返しご連絡させて頂きます。<br>
          また、ご記入頂いたメールアドレスへ、<br class="u-mobile">
          自動返信の確認メールをお送りしております。</p>
      </div>

      <div class="page-complete__button">
        <a href="<?php echo esc_url(home_url("/")); ?>" class="button"><span>トップページへ</span></a>
      </div>

    </div>
  </div>
</main>
<?php get_footer(); ?>