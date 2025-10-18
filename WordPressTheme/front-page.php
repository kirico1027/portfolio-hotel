<?php get_header(); ?>
<main>
  <section class="mv">
    <div class="mv__sticky-wrap">
      <div class="c-fv__bg"></div>
      <div class="mv__inner">
        <div class="mv__title-wrap">
          <h2 class="mv__main-title">KIRICO</h2>
          <p class=" mv__sub-title">PALACE HOTEL</p>
        </div>
        <div class="mv__swiper mv-swiper swiper js-mv-swiper">
          <div class="mv-swiper__wrapper swiper-wrapper">
            <?php
            $mv_pc_img = get_field('mv_pc');
            $mv_sp_img = get_field('mv_sp');
            $mv_alt = get_field('mv_alt');

            // $mv_pc_img と $mv_sp_img の配列の要素数を取得し、大きい方の数でループを回す
            $max_items = max(count($mv_pc_img), count($mv_sp_img));

            for ($i = 0; $i < $max_items; $i++) :
              $pc_key = 'mv_pc' . ($i + 1); // PC用のキー
              $sp_key = 'mv_sp' . ($i + 1); // SP用のキー
              $alt_key = 'mv_alt' . ($i + 1); // alt属性用のキー

              // PCとSPの画像が両方存在するかチェック
              if (!empty($mv_pc_img[$pc_key]) && !empty($mv_sp_img[$sp_key])) {
                $pc_src = $mv_pc_img[$pc_key];
                $sp_src = $mv_sp_img[$sp_key];
                $alt = isset($mv_alt[$alt_key]) ? $mv_alt[$alt_key] : ''; // alt属性が設定されていない場合は空文字をセット

            ?>
                <div class="mv-swiper__slide swiper-slide">
                  <picture class="mv-swiper__image">
                    <source srcset="<?php echo esc_url($pc_src); ?>" media="(min-width:768px)" type="image/jpg">
                    <img src="<?php echo esc_url($sp_src); ?>" alt="<?php echo esc_attr($alt); ?>">
                  </picture>
                </div>
            <?php
              }
            endfor;
            ?>

          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="rooms layout-rooms">
    <div class="rooms__inner">
      <div class="rooms__title section-title">
        <h3 class="section-title__main">
          <span class="text">R</span><span class="text">o</span><span class="text">o</span><span
            class="text">m</span><span class="text">s</span>
          <span class="text">&</span>
          <span class="text">S</span><span class="text">u</span><span class="text">i</span><span
            class="text">t</span><span class="text">e</span><span class="text">s</span>
        </h3>
      </div>
      <div class="rooms__content js-fade-down">
        <div class="rooms__swiper swiper js-rooms-swiper">

          <div class="rooms__cards swiper-wrapper">
            <?php
            $args = array(
              "post_type" => "campaign",
              "posts_per_page" => -1,
              'orderby'        => 'date',
              'order'          => 'DESC'
            );
            $the_query = new WP_Query($args);
            ?>
            <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>
              <div class="rooms__card room-card swiper-slide">
                <div class="room-card__item">
                  <figure class="room-card__img">
                    <?php if (has_post_thumbnail()) : ?>
                      <?php the_post_thumbnail('full'); ?>
                    <?php else : ?>
                      <img src="<?php echo esc_url(get_theme_file_uri("/assets/images/common/noimage.jpg")); ?>"
                        alt="<?php echo esc_attr(get_the_title()); ?>の画像" loading="lazy">
                    <?php endif; ?>
                  </figure>
                  <div class="room-card__body">
                    <h4 class="room-card__title-main"><?php the_title(); ?></h4>
                    <p class="room-card__text">
                      <?php
                      $campaign_text = get_field("campaign_text");
                      if ($campaign_text) {
                        if (mb_strlen($campaign_text) > 80) {
                          echo esc_html(mb_substr($campaign_text, 0, 80, 'UTF-8')) . '...';
                        } else {
                          echo esc_html($campaign_text);
                        }
                      }
                      ?>
                    </p>
                  </div>
                </div>
              </div>
            <?php endwhile; ?>
            <?php wp_reset_postdata(); ?>
          </div>
        </div>
        <div class="rooms__swiper-button-wrap">
          <button class="swiper-button-prev"></button>
          <div class="swiper-pagination"></div>
          <button class="swiper-button-next"></button>
        </div>
      </div>

      <div class="rooms__button">
        <a href="<?php echo esc_url(home_url("/campaign")) ?>" class="button js-fade-in"><span>View
            more</span></a>
      </div>
    </div>
  </section>

  <section class="about layout-about">
    <div class="about__inner inner">
      <div class="about__title section-title">
        <h3 class="section-title__main">
          <span class="text">A</span><span class="text">b</span><span class="text">o</span><span
            class="text">u</span><span class="text">t</span>
          <span class="text">u</span><span class="text">s</span>
        </h3>
      </div>
      <div class="about__main-image about-main-image">
        <div class="about-main-image__image">
          <picture class="about-main-image__image-left js-fade-down">
            <source srcset="<?php echo get_theme_file_uri() ?>/assets/images/common/about2.jpg"
              media="(min-width: 768px)" type="image/jpg">
            <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/about2.jpg" alt="ホテル内のレストランの画像"
              loading="lazy">
          </picture>
          <picture class="about-main-image__image-right js-fade-down">
            <source srcset="<?php echo get_theme_file_uri() ?>/assets/images/common/about1.jpg"
              media="(min-width: 768px)" type="image/jpg">
            <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/about1.jpg" alt="ホテルの寝室の画像"
              loading="lazy">
          </picture>
        </div>
        <div class="about-main-image__body">
          <p class="about-main-image__body-title">with&nbsp;all<br>one's&nbsp;heart</p>
          <div class="about-main-image__box">
            <p class="about-main-image__text">
              真心を込めて・・・お客様の快適な滞在を第一に考え、笑顔と心温まるサービスでお迎えします。<br>
              <span>清潔なお部屋と充実したアメニティで、心地よい時間を提供いたします。お客様の幸せを願い、心からのサポートをお約束いたします。 </span>
            </p>
            <div class="about-main-image__button">
              <a href="<?php echo esc_url(home_url("/about")) ?>" class="button js-fade-in"><span>View
                  more</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="information layout-information">
    <div class="information__inner inner">
      <div class="information__title section-title">
        <h3 class="section-title__main">
          <span class="text">I</span><span class="text">n</span><span class="text">f</span><span
            class="text">o</span><span class="text">r</span><span class="text">m</span><span class="text">a</span><span
            class="text">t</span><span class="text">i</span><span class="text">o</span><span class="text">n</span>
        </h3>
      </div>
      <div class="information__card information-card">
        <figure class="information-card__img js-colorbox">
          <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/information1.jpg" alt="ガーデニングパーティの画像"
            loading="lazy">
        </figure>
        <div class="information-card__body">
          <div class="information-content">
            <h4 class="information-card__title">Gardening Party</h4>
            <p class="information-card__text js-colorChange">
              春の訪れを感じるガーデニングパーティに、ぜひご参加ください。<br>
              ホテル庭園では新緑が輝き、心地よい風が吹き抜けます。春の味覚を楽しめる軽食や、プロによる植物のお手入れワークショップもご用意。音楽と春の香りに包まれた、贅沢なひとときをお楽しみください。
            </p>
          </div>
          <div class="information__button">
            <a href="<?php echo esc_url(home_url("/information")) ?>" class="button"><span>View
                more</span></a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="parallax-bg"></div>

  <section class="blog">
    <div class="blog__inner">
      <div class="blog__title">
        <h3 class="section-title__main">
          <span class="text">B</span><span class="text">l</span><span class="text">o</span><span class="text">g</span>
        </h3>
      </div>
      <ul class="blog__cards blog-cards">
        <?php
        $args = array(
          "post_type" => "post",
          "posts_per_page" => 3,
          'orderby'        => 'date',
          'order'          => 'DESC'
        );
        $the_query = new WP_Query($args);
        if ($the_query->have_posts()) :
          while ($the_query->have_posts()) : $the_query->the_post();
        ?>
            <li class="blog-cards__card blog-card js-fade-down">
              <a href="<?php the_permalink(); ?>">
                <div class="blog-card__item">
                  <figure class="blog-card__img">
                    <?php if (has_post_thumbnail()) : ?>
                      <?php the_post_thumbnail('full'); ?>
                    <?php else : ?>
                      <img src="<?php echo esc_url(get_theme_file_uri("/assets/images/common/noimage.jpg")); ?>"
                        alt="<?php echo esc_attr(get_the_title()); ?>の画像" loading="lazy">
                    <?php endif; ?>
                  </figure>
                  <div class="blog-card__body">
                    <time datetime="<?php the_time('c'); ?>" class="blog-card__date date"><?php the_time('Y.m/d'); ?></time>
                    <h4 class="blog-card__title"><?php echo wp_trim_words(get_the_title(), 16, '…'); ?></h4>
                    <p class="blog-card__text">
                      <?php echo wp_trim_words(get_the_content(), 70, '…'); ?>
                    </p>
                  </div>
                </div>
              </a>
            </li>
        <?php
          endwhile;
          wp_reset_postdata();
        endif;
        ?>
      </ul>
      <div class="blog__button">
        <a href="<?php echo esc_url(home_url("/blog")) ?>" class="button js-fade-in"><span>View more</span></a>
      </div>
    </div>
  </section>

  <section class="voice layout-voice">
    <div class="voice__inner inner">
      <div class="voice__title section-title">
        <h3 class="section-title__main">
          <span class="text">V</span><span class="text">o</span><span class="text">i</span><span
            class="text">c</span><span class="text">e</span>
        </h3>
      </div>
      <ul class="voice__cards voice-cards js-fade-down">
        <?php
        $args = array(
          "post_type" => "voice",
          "posts_per_page" => 2,
          'orderby' => 'rand'
        );
        $the_query = new WP_Query($args);
        if ($the_query->have_posts()) :
          while ($the_query->have_posts()) : $the_query->the_post();
        ?>
            <li class="voice-cards__card voice-card">
              <div class="voice-card__item">
                <div class="voice-card__head">
                  <div class="voice-card__content">
                    <div class="voice-card__box">
                      <?php
                      $personalInfo = get_field('personal_info');
                      if ($personalInfo) :
                      ?> <span class="voice-card__info">
                          <?php echo esc_html($personalInfo['personal_age']); ?>代(<?php echo esc_html($personalInfo['personal_gender']); ?>)</span>
                      <?php endif; ?>
                      <span class="voice-card__category">
                        <?php
                        $terms = get_the_terms(get_the_ID(), 'voice_category');
                        if ($terms && !is_wp_error($terms)) {
                          echo esc_html($terms[0]->name);
                        }
                        ?>
                      </span>
                    </div>
                    <h4 class="voice-card__title">
                      <?php echo wp_trim_words(get_the_title(), 20, '…'); ?>
                    </h4>
                    <div>
                      <?php
                      $termGroup = get_field('term_group');
                      if ($termGroup) :
                      ?>
                        <p class="page-rooms-card__period">
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
                  if ($customer_text) {
                    if (mb_strlen($customer_text) > 150) {
                      echo esc_html(mb_substr($customer_text, 0, 150, 'UTF-8')) . '...';
                    } else {
                      echo esc_html($customer_text);
                    }
                  }
                  ?>
                </p>
              </div>
            </li>
          <?php endwhile; ?>
          <?php wp_reset_postdata(); ?>
        <?php endif; ?>
      </ul>
      <div class="voice__button">
        <a href="<?php echo esc_url(home_url("/voice")) ?>" class="button js-fade-in"><span>View
            more</span></a>
      </div>
    </div>
  </section>

  <section class="location layout-location">
    <div class="location__inner inner">
      <div class="location__title section-title">
        <h3 class="section-title__main">
          <span class="text">L</span><span class="text">o</span><span class="text">c</span><span
            class="text">a</span><span class="text">t</span><span class="text">i</span><span class="text">o</span><span
            class="text">n</span>
        </h3>
      </div>
      <div class="location__container">
        <div class="location__content">
          <picture class="location__image js-colorbox">
            <source srcset="<?php echo get_theme_file_uri() ?>/assets/images/common/price-pc.jpg"
              media="(min-width: 768px)" type="image/jpg">
            <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/sub-mv-others.jpg"
              alt="海底の岩場にひしめくサンゴとその周りに群れる赤色の鮮やかな小魚の画像" loading="lazy">
          </picture>
          <div class="location__list">
            <div class="contact__body">
              <div class="contact__info">
                <p class="contact__info-intro">
                  当ホテルは新潟市中央区湖畔町に位置し、<br>美しい湖畔ロケーションと質の高いサービスで<br>お客様をお迎えします。<br>地元食材を使用した料理やスパ、<br>観光地へのアクセスも良好です。<br>是非、新潟の魅力をお楽しみください。
                </p>
                <p class="contact__info-address">
                  <span class="contact__info-name">Kirico Palace Hotel</span><br>
                  新潟県新潟市中央区湖畔町1-2-3<br>
                  1-2-3 Kohancho, Chuo-ku, Niigata City, <br class="u-mobile">Niigata Prefecture, Japan<br>
                  Phone: 0120 (062) 6200<br>
                  Email: info@kiricopalacehotel.ie
                </p>
              </div>
              <div class="contact__map-wrap">
                <div class="contact__map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d25181.590301363347!2d139.03739536476618!3d37.91410263746811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z5paw5r2f55yM5paw5r2f5biC5Lit5aSu5Yy65rmW55WU55S6MS0yLTM!5e0!3m2!1sja!2sjp!4v1709948861134!5m2!1sja!2sjp"
                    width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>

</main>
<?php get_footer(); ?>