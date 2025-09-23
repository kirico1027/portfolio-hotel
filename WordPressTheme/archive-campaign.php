<?php get_header(); ?>
<main>

  <?php get_template_part('template-parts/sub-mv'); ?>

  <?php get_template_part('template-parts/breadcrumb'); ?>

  <div class="page-campaign layout-page-campaign">
    <div class="page-campaign__inner inner">

      <div class="page-campaign__category-list category-list">
        <?php
        $current_term_id = 0;
        $queried_object = get_queried_object();
        $terms = get_terms(array(
          'taxonomy' => 'campaign_category',
          'orderby' => 'name',
          'order' => 'ASC',
          'number' => 10
        ));
        ?>
        <ul class="category-list__items">
          <li class="category-list__item is-active">
            <a href=" <?php echo esc_url(home_url('rooms')); ?>">ALL</a>
          </li>

          <?php
          if ($terms) :
            foreach ($terms as $term) :
              $term_class = ($current_term_id === $term->term_id) ?: '';
          ?>
              <li class="category-list__item <?php echo esc_attr($term_class); ?>">
                <a href="<?php echo esc_url(get_term_link($term->term_id)); ?>">
                  <?php echo esc_html($term->name); ?>
                </a>
              </li>
          <?php
            endforeach;
          endif;
          ?>
        </ul>
      </div>
      <div class="page-campaign__cards">
        <?php if (have_posts()) : ?>
          <?php while (have_posts()) : the_post(); ?>
            <div class="page-campaign__card page-campaign-card">
              <figure class="page-campaign-card__img">
                <?php if (has_post_thumbnail()) : ?>
                  <?php the_post_thumbnail('full'); ?>
                <?php else : ?>
                  <img src="<?php echo esc_url(get_theme_file_uri("/assets/images/common/noimage.jpg")); ?>" alt="NoImage画像"
                    loading="lazy">
                <?php endif; ?>
              </figure>
              <div class="page-campaign-card__body">
                <h2 class="page-campaign-card__title-main"><?php the_title(); ?></h2>
              </div>
              <p class="page-campaign-card__text">
                <?php
                $campaign_text = get_field("campaign_text");
                if (mb_strlen($campaign_text) > 200) {
                  echo mb_substr($campaign_text, 0, 200, 'UTF-8') . '...';
                } else {
                  echo $campaign_text;
                }
                ?>
              </p>
              <div class="page-campaign-card__button">
                <a href="<?php echo esc_url(home_url("/contact")) ?>" class="button"><span>Reserve</span></a>
              </div>

            </div>

          <?php endwhile; ?>
          <?php wp_reset_postdata(); ?>
        <?php endif; ?>

      </div>

      <div class="page-campaign__pagenavi pagenavi">
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
</main>
<?php get_footer(); ?>