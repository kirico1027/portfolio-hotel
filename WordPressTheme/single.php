<?php get_header(); ?>
<main>
  <?php get_template_part('template-parts/sub-mv'); ?>

  <?php get_template_part('template-parts/breadcrumb'); ?>

  <div class="single blog-common layout-blog-common">
    <div class="blog-common__inner inner">
      <div class="blog-common__container">

        <div class="blog-common__main single-main">
          <?php if (have_posts()) : ?>
          <?php while (have_posts()) : the_post(); ?>

          <article class="single-main__box">
            <div class="single-main__body">
              <time datetime="<?php the_time('c'); ?>" class="single-main__date"><?php the_time('Y.m/d'); ?></time>
              <h2 class="single-main__title"><?php the_title(); ?></h2>
              <div class="single-main__thumbnail">
                <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('full'); ?>
                <?php else : ?>
                <img src="<?php echo esc_url(get_theme_file_uri('/assets/images/common/noimage.jpg')); ?>"
                  alt="NoImage画像" loading="lazy">
                <?php endif; ?>
              </div>
            </div>
            <div class="single-main__content single-content">
              <?php the_content(); ?>
            </div>
          </article>

          <?php endwhile; ?>
          <?php endif; ?>
          <div class="single__pagenavi single-pagenavi layout-pagenavi">
            <div class="single-pagenavi__box">
              <?php
              $prev = get_previous_post();
              $prev_url = $prev ? esc_url(get_permalink($prev->ID)) : '';
              $next = get_next_post();
              $next_url = $next ? esc_url(get_permalink($next->ID)) : '';
              ?>
              <div class="single-pagenavi__prev">
                <?php if ($prev) : ?>
                <a href="<?php echo $prev_url; ?>">前の記事</a>
                <?php endif; ?>
              </div>
              <div class="single-pagenavi__center">
                <a href="<?php echo esc_url(home_url("/blog")); ?>">一覧へ戻る</a>
              </div>
              <div class="single-pagenavi__next">
                <?php if ($next) : ?>
                <a href="<?php echo $next_url; ?>">後の記事</a>
                <?php endif; ?>
              </div>
            </div>
          </div>
        </div>

        <?php get_sidebar(); ?>

      </div>
    </div>
  </div>

</main>
<?php get_footer(); ?>