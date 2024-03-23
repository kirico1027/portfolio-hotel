<aside class="blog-common__sidebar sidebar">
  <div class="sidebar__inner">
    <div class="sidebar__container">
      <div class="sidebar__popular sidebar-popular">
        <h2 class="sidebar-popular__title sidebar-title">
          Popular Blogs
        </h2>
        <ul class="sidebar-popular__list">
          <?php
          $loopcounter = 0;

          $args = array(
            'post_type' => 'post',
            'meta_key' => 'post_views_count',
            'orderby' => 'meta_value_num',
            'order' => 'DESC',
            'posts_per_page' => 3
          );
          $the_query = new WP_Query($args);
          if ($the_query->have_posts()) :
            while ($the_query->have_posts()) : $the_query->the_post();
              $loopcounter++; ?>
          <li>
            <a href="<?php echo get_permalink(); ?>">
              <div class="sidebar-popular__item">
                <figure class="sidebar-popular__image">
                  <?php if (has_post_thumbnail()) : ?>
                  <?php the_post_thumbnail('full'); ?>
                  <?php endif; ?>
                </figure>
                <div class="sidebar-popular__body">
                  <time datetime="<?php the_time('c'); ?>"
                    class="sidebar-popular__date date"><?php the_time('Y.m/d'); ?></time>
                  <h3 class="sidebar-popular__text">
                    <?php echo wp_trim_words(get_the_title(), 20, '…'); ?></h3>
                </div>
              </div>
            </a>
          </li>
          <?php endwhile;
          endif;
          wp_reset_postdata();
          ?>
        </ul>
      </div>
      <div class=" sidebar__review sidebar-review">
        <h2 class="sidebar-review__main-title sidebar-title">
          Voice
        </h2>
        <div class="sidebar-review__content">
          <?php
          $args = array(
            "post_type" => "voice",
            "posts_per_page" => 1,
          );
          $the_query = new WP_Query($args);
          ?>
          <?php if ($the_query->have_posts()) : ?>
          <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>
          <figure class="sidebar-review__image">
            <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('full'); ?>
            <?php else : ?>
            <img src="<?php echo esc_url(get_theme_file_uri("/images/common/noimage.jpg")); ?>" alt="NoImage画像"
              loading="lazy">
            <?php endif; ?>
          </figure>
          <div class="sidebar-review__body">
            <?php
                $personalInfo = get_field('personal_info');
                if ($personalInfo) :
                ?>
            <span
              class="sidebar-review__age"><?php echo $personalInfo['personal_age']; ?>代(<?php echo $personalInfo['personal_gender']; ?>)</span>
            <?php endif; ?>
            <h3 class="sidebar-review__title"><?php echo wp_trim_words(get_the_title(), 20, '…'); ?></h3>
            <p class="sidebar-review__text">
              <?php
                  $customer_text = get_field("customer_text");
                  if (mb_strlen($customer_text) > 50) {
                    echo mb_substr($customer_text, 0, 50, 'UTF-8') . '...';
                  } else {
                    echo $customer_text;
                  }
                  ?>
            </p>

          </div>
          <?php endwhile; ?> <?php wp_reset_postdata(); ?> <?php endif; ?>
        </div>
        <div class="sidebar-review__button">
          <a href="<?php echo esc_url(home_url("/voice")) ?>" class="button"><span>View&nbsp;more</span></a>
        </div>
      </div>
      <div class="sidebar__campaign sidebar-campaign">
        <h2 class="sidebar-campaign__title sidebar-title">
          Rooms & Suites
        </h2>
        <ul class="sidebar-campaign__cards">
          <?php
          $args = array(
            "post_type" => "campaign",
            "posts_per_page" => 2,
          );
          $the_query = new WP_Query($args);
          ?>
          <?php if ($the_query->have_posts()) : ?>
          <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>
          <li class="sidebar-campaign__card sidebar-campaign-card">
            <div class="sidebar-campaign-card__item">
              <figure class="sidebar-campaign-card__img">
                <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('full'); ?>
                <?php else : ?>
                <img src="<?php echo esc_url(get_theme_file_uri("/images/common/noimage.jpg")); ?>" alt="NoImage画像"
                  loading="lazy">
                <?php endif; ?>
              </figure>
              <div class="sidebar-campaign-card__body">
                <h3 class="sidebar-campaign-card__title-main"><?php the_title(); ?></h3>
                <p class="campaign-card__text">
                  <?php
                      $campaign_text = get_field("campaign_text");
                      if (mb_strlen($campaign_text) > 50) {
                        echo mb_substr($campaign_text, 0, 50, 'UTF-8') . '...';
                      } else {
                        echo $campaign_text;
                      }
                      ?>
                </p>

                <?php $priceGroup = get_field('price_group');
                    if ($priceGroup['price_before'] && $priceGroup['price_after']) : ?>
                <p class="sidebar-campaign-card__price">
                  <span>¥<?php echo $priceGroup['price_before']; ?></span>¥<?php echo $priceGroup['price_after']; ?>
                </p>
                <?php endif; ?>
              </div>
            </div>
          </li>
          <?php endwhile; ?>
          <?php wp_reset_postdata(); ?>
          <?php endif; ?>
        </ul>
        <div class="sidebar-campaign__button">
          <a href="<?php echo esc_url(home_url("/campaign")) ?>" class="button"><span>View&nbsp;more</span></a>
        </div>
      </div>

      <div class="sidebar__archive sidebar-archive">
        <h2 class="sidebar-archive__title sidebar-title">
          Archives
        </h2>
        <div class="sidebar-archive__accordion sidebar-accordion">
          <div class="sidebar-accordion__box js-accordion__box">
            <?php
            $year_prev = null;
            $months = $wpdb->get_results("SELECT DISTINCT MONTH( post_date ) AS month ,
                                      YEAR( post_date ) AS year,
                                      COUNT( id ) as post_count FROM $wpdb->posts
                                      WHERE post_status = 'publish' and post_date <= now( )
                                      and post_type = 'post'
                                      GROUP BY month , year
                                      ORDER BY post_date DESC");
            foreach ($months as $month) :
              $year_current = $month->year;
              if ($year_current != $year_prev) {
                if ($year_prev != null) { ?>
            <?php } ?>
            <p class="sidebar-accordion__year js-accordion__year"><?php echo $month->year; ?></p>
            <div class="sidebar-accordion__month-box">
              <ul class="sidebar-accordion__month js-accordion__month">
                <?php } ?>
                <li>
                  <a
                    href="<?php bloginfo('url') ?>/<?php echo $month->year; ?>/<?php echo date("m", mktime(0, 0, 0, $month->month, 1, $month->year)) ?>">
                    <?php echo date("n", mktime(0, 0, 0, $month->month, 1, $month->year)) ?>月
                    (<?php echo $month->post_count; ?>)
                  </a>
                </li>
                <?php $year_prev = $year_current;
              endforeach; ?>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</aside>