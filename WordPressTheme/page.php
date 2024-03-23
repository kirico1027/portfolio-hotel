<!DOCTYPE html>
<?php get_header(); ?>
<main>

  <?php get_template_part('template-parts/sub-mv'); ?>

  <?php get_template_part('template-parts/breadcrumb'); ?>

  <div class="confirmation layout-confirmation">
    <div class="confirmation__inner inner">
      <div class="confirmation__container">
        <h2 class="confirmation__title"><?php the_title(); ?></h2>
        <div class="confirmation__content">
          <?php the_content(); ?>
        </div>
      </div>
    </div>
  </div>
</main>
<?php get_footer(); ?>