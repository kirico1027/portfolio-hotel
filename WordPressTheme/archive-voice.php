<?php get_header(); ?>
<main>

  <?php get_template_part('template-parts/sub-mv'); ?>

  <?php get_template_part('template-parts/breadcrumb'); ?>

  <div class="archive-voice layout-archive-voice">
    <div class="archive-voice__inner inner">
      <div class="archive-voice__category-list category-list js-fade-in">

        <?php
        $current_term_id = 0;
        $terms = get_terms(array(
          'taxonomy' => 'voice_category',
          'orderby' => 'name',
          'order' => 'DESC',
          'number' => 5,
        ));
        ?>

        <ul class="category-list__items">
          <li class="category-list__item is-active">
            <a href="<?php echo esc_url(home_url('voice')); ?>">ALL</a>
          </li>

          <?php
          if ($terms) :
            foreach ($terms as $term) :
              $term_class = ($current_term_id === $term->term_id) ? 'is-active' : '';
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

      <ul class="archive-voice__cards voice-cards">
        <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
        <li class="voice-cards__card voice-card js-card-fade">
          <div class="voice-card__item">
            <div class="voice-card__head">
              <div class="voice-card__content">
                <div class="voice-card__box">
                  <?php
                      $personalInfo = get_field('personal_info');
                      if ($personalInfo) :
                      ?>
                  <span
                    class="voice-card__info"><?php echo esc_html($personalInfo['personal_age']); ?>代(<?php echo esc_html($personalInfo['personal_gender']); ?>)</span>
                  <?php endif; ?>
                  <br>
                  <span class="voice-card__category">
                    <?php
                        $taxonomy_terms = get_the_terms($post->ID, 'voice_category');
                        if (!empty($taxonomy_terms)) {
                          foreach ($taxonomy_terms as $taxonomy_term) {
                            echo '<span>' . esc_html($taxonomy_term->name) . '</span>';
                          }
                        }
                        ?>
                  </span>
                </div>
                <h2 class="voice-card__title">
                  <?php echo wp_trim_words(get_the_title(), 20, '…'); ?>
                </h2>
                <div>
                  <?php
                      $termGroup = get_field('term_group');
                      if ($termGroup) :
                      ?>
                  <p class="page-campaign-card__period">
                    <?php echo esc_html($termGroup['term_start']); ?> 〜 <?php echo esc_html($termGroup['term_end']); ?>
                  </p>
                  <?php endif; ?>
                </div>
              </div>
              <figure class="voice-card__img js-colorbox">
                <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('full'); ?>
                <?php else : ?>
                <img src="<?php echo esc_url(get_theme_file_uri("/assets/images/common/noimage.jpg")); ?>"
                  alt="<?php echo esc_attr(get_the_title()); ?>の画像" loading="lazy">
                <?php endif; ?>
              </figure>
            </div>
            <p class="voice-card__text">
              <?php
                  $customer_text = get_field("customer_text");
                  if (!empty($customer_text)) {
                    if (mb_strlen($customer_text) > 200) {
                      echo esc_html(mb_substr($customer_text, 0, 200, 'UTF-8')) . '...';
                    } else {
                      echo esc_html($customer_text);
                    }
                  }
                  ?>
            </p>
          </div>
        </li>
        <?php endwhile; ?>
        <?php endif; ?>
      </ul>

      <div class="page-campaign__pagenavi pagenavi layout-pagenavi">
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