<?php get_header(); ?>
<main>

  <?php get_template_part('template-parts/sub-mv'); ?>

  <?php get_template_part('template-parts/breadcrumb'); ?>

  <div class="home blog-common layout-blog-common">
    <div class="blog-common__inner inner">
      <div class="blog-common__container">
        <div class="blog-common__main home-main">
          <div class="home-main__inner">
            <ul class="home-main__cards blog-cards blog-cards--2col">
              <?php if (have_posts()) : ?>
              <?php while (have_posts()) : the_post(); ?>
              <li class="home-main__card blog-card">
                <a href="<?php the_permalink(); ?>">
                  <div class="blog-card__item">
                    <figure class="blog-card__img">
                      <?php if (has_post_thumbnail()) : ?>
                      <?php the_post_thumbnail('full'); ?>
                      <?php else : ?>
                      <img src="<?php echo esc_url(get_theme_file_uri("/assets/images/common/noimage.jpg"
                        )); ?>" alt="NoImage画像" loading="lazy">
                      <?php endif; ?>
                    </figure>
                    <div class="blog-card__body">
                      <time datetime="<?php the_time('c'); ?>"
                        class="blog-card__date date"><?php the_time('Y.m/d'); ?></time>
                      <h2 class="blog-card__title"><?php echo wp_trim_words( get_the_title(), 16, '…' ); ?></h2>
                      <p class="blog-card__text">
                        <?php echo wp_trim_words( get_the_content(), 90, '…' ); ?>
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <?php endwhile; ?>
              <?php endif; ?>
            </ul>
            <div class="home-main__pagenavi pagenavi layout-pagenavi">
              <div class="pagenavi__inner">
                <div class="pagination">
                  <?php if (function_exists('wp_pagenavi')) {
                  wp_pagenavi();
                } ?>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="blog-common__sidebar">
          <?php get_sidebar(); ?>
        </div>

      </div>
    </div>
  </div>

</main>
<?php get_footer(); ?>