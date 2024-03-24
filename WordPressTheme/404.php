<?php get_header(); ?>

<main>
  <div class="page-404">

    <?php get_template_part('template-parts/breadcrumb'); ?>

    <div class="page-404__inner inner">
      <div class="page-404__image"></div>
      <div class="page-404__box">
        <h1 class="page-404__title">404</h1>
        <p class="page-404__text">申し訳ありません。<br>
          お探しのページが見つかりません。</p>
        <div class="page-404__button">
          <a href="<?php echo esc_url(home_url("/")) ?>" class="page-404-button"><span>Page TOP</span></a>
        </div>
      </div>
    </div>
  </div>
</main>

<?php get_footer(); ?>