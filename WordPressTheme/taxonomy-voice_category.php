<?php get_header(); ?>
<main>

  <section class="sub-mv">
    <picture class="sub-mv__picture">
      <source srcset="<?php echo get_theme_file_uri(); ?>/assets/images/common/sub-mv-voice.jpg"
        media="(min-width: 768px)" type="image/jpg">
      <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/sub-mv-voice.jpg"
        alt="エメラルドグリーンの海に浮かぶ5人のダイバーたちを俯瞰でとらえた画像" loading="lazy">
    </picture>
    <h1 class="sub-mv__title">
      <?php
    $term_name = '';
    if (is_tax()) {
      $term = get_queried_object();
      if ($term && $term->name) {
        $term_name = $term->name;
      }
    }
    ?>
      <h1 class="sub-mv__title">
        <?php echo esc_html($term_name); ?>
      </h1>
    </h1>
  </section>

  <?php get_template_part('template-parts/breadcrumb'); ?>

  <div class="archive-voice layout-archive-voice">
    <div class="archive-voice__inner inner">
      <div class="archive-voice__category-list category-list">

        <ul class="category-list__items">
          <?php
        $current_post_type = get_post_type();
        $post_type_archive_class = ($current_post_type === 'campaign' && !is_tax()) ? 'is-active' : '';
        $post_type_archive_link = sprintf(
            '<li class="category-list__item %s"><a href="%s" alt="%s">ALL</a></li>',
            $post_type_archive_class,
            esc_url(home_url('/voice')),
            esc_attr(__('View all posts', 'textdomain'))
        );
        echo sprintf(esc_html__('%s', 'textdomain'), $post_type_archive_link);

        $current_term_id = get_queried_object_id();
        $terms = get_terms(array(
            'taxonomy' => 'voice_category',
            'orderby' => 'name',
            'order' => 'DESC',
            'number' => 5
        ));

        if ($terms) {
            foreach ($terms as $term) {
                $term_class = ($current_term_id === $term->term_id) ? 'is-active' : '';
                $term_link = sprintf(
                    '<li class="category-list__item %s"><a href="%s" alt="%s">%s</a></li>',
                    $term_class,
                    esc_url(get_term_link($term->term_id)),
                    esc_attr(sprintf(__('View all posts in %s', 'textdomain'), $term->name)),
                    esc_html($term->name)
                );
                echo sprintf(esc_html__('%s', 'textdomain'), $term_link);
            }
        }
        ?>
        </ul>
      </div>

      <ul class="archive-voice__cards voice-cards">

        <?php
         $genre_slug = get_query_var('voice_category');
        $args = array(
          "post_type" => "voice",
          "posts_per_page" => 6,
          'tax_query' => array(
            array(
              'taxonomy' => 'voice_category',
              'field'    => 'slug',
              'terms'    => $genre_slug,
            ),
          ),
        );
        $the_query = new WP_Query($args);
        ?>
        <?php if ($the_query->have_posts()) : ?>
        <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>
        <li class="voice-cards__card voice-card">
          <div class="voice-card__item">
            <div class="voice-card__head">
              <div class="voice-card__content">
                <div class="voice-card__box">
                  <?php
                        $personalInfo = get_field('personal_info');
                        if ($personalInfo) :
                        ?>
                  <span
                    class="voice-card__info"><?php echo $personalInfo['personal_age']; ?>代(<?php echo $personalInfo['personal_gender']; ?>)</span>
                  <?php endif; ?>
                  <br><span class="voice-card__category"><?php
                  $taxonomy_terms = get_the_terms($post->ID, 'voice_category');
                  if (!empty($taxonomy_terms)) {
                    foreach ($taxonomy_terms as $taxonomy_term) {
                      echo '<span>' . esc_html($taxonomy_term->name) . '</span>';
                    }
                  }
                  ?></span>
                </div>
                <h2 class="voice-card__title">
                  <?php echo wp_trim_words(get_the_title(), 20, '…'); ?>
                </h2>
              </div>
              <figure class="voice-card__img js-colorbox">
                <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('full'); ?>
                <?php else : ?>
                <img src="<?php echo esc_url(get_theme_file_uri("/images/common/noimage.jpg")); ?>" alt="NoImage画像"
                  loading="lazy">
                <?php endif; ?>
              </figure>
            </div>
            <p class="voice-card__text">
              <?php
                    $customer_text = get_field("customer_text");
                    if (mb_strlen($customer_text) > 200) {
                      echo mb_substr($customer_text, 0, 200, 'UTF-8') . '...';
                    } else {
                      echo $customer_text;
                    }
                    ?>
            </p>
          </div>
        </li>
        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
        <?php endif; ?>
      </ul>

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