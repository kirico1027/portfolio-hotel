<?php get_header(); ?>
<main>

  <?php get_template_part('template-parts/sub-mv'); ?>

  <?php get_template_part('template-parts/breadcrumb'); ?>

  <div class="page-contact layout-page-contact">
    <div class="page-contact__inner inner">

      <?php echo do_shortcode('[contact-form-7 id="ac48658" title="お問い合わせ"]'); ?>

    </div>
  </div>
</main>
<?php get_footer(); ?>