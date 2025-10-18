<?php get_header(); ?>
<main>

  <?php get_template_part('template-parts/sub-mv'); ?>

  <?php get_template_part('template-parts/breadcrumb'); ?>

  <section class="page-about-lead layout-page-about-lead">
    <div class="page-about-lead__inner inner">
      <div class="page-about-lead__content-sp">
        <div class="page-about-lead__image">
          <figure class="page-about-lead__image-right js-fade-down">
            <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/about2.jpg" alt="ホテルの寝室の画像"
              loading="lazy">
          </figure>
          <h1 class="page-about-lead__body-title js-fade-in">with all<br>one's heart</h1>
        </div>
        <div class="page-about-lead__box">
          <p class="page-about-lead__text js-fade-in">
            真心を込めて・・・お客様の快適な滞在を第一に考え、笑顔と心温まるサービスでお迎えします。<br>
            <span>清潔なお部屋と充実したアメニティで、心地よい時間を提供いたします。お客様の幸せを願い、心からのサポートをお約束いたします。</span>
          </p>
        </div>
      </div>
      <div class="page-about-lead__content-pc about-main-image">
        <div class="about-main-image__image">
          <figure class="about-main-image__image-left js-fade-down">
            <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/about2.jpg" alt="ホテルの寝室の画像"
              loading="lazy">
          </figure>
          <figure class="about-main-image__image-right js-fade-down">
            <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/about1.jpg" alt="ホテルのレストランの画像"
              loading="lazy">
          </figure>
        </div>
        <div class="about-main-image__body">
          <h1 class="about-main-image__body-title js-fade-in">with&nbsp;all<br>one's&nbsp;heart</h1>
          <div class="about-main-image__box">
            <p class="about-main-image__text js-fade-in">
              真心を込めて・・・お客様の快適な滞在を第一に考え、笑顔と心温まるサービスでお迎えします。<br>
              <span>清潔なお部屋と充実したアメニティで、心地よい時間を提供いたします。お客様の幸せを願い、心からのサポートをお約束いたします。</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="page-about-gallery layout-page-about-gallery">
    <div class="page-about-gallery__inner inner">
      <div class="page-about-gallery__title section-title">
        <h2 class="section-title__main">
          <span class="text">G</span><span class="text">a</span><span class="text">l</span><span
            class="text">l</span><span class="text">e</span><span class="text">r</span><span class="text">y</span>
        </h2>
      </div>
      <div class="page-about-gallery__container">
        <?php
        $gallery_group = SCF::get_option_meta('gallery-option', 'about-us_gallery');
        if ($gallery_group) :
          foreach ($gallery_group as $item) :
        ?>
            <div class="page-about-gallery__image">
              <?php if (!empty($item['gallery_image'])) : ?>
                <?php
                $image_url = wp_get_attachment_url($item['gallery_image']);
                $image_alt = get_post_meta($item['gallery_image'], '_wp_attachment_image_alt', true);
                if (empty($image_alt)) {
                  $image_alt = 'ギャラリー画像';
                }
                ?>
                <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($image_alt); ?>" loading="lazy">
              <?php endif; ?>
            </div>
          <?php
          endforeach;
        else :
          ?>
          <p>No images found.</p>
        <?php endif; ?>
      </div>
      <div class="page-about-gallery__modal modal-image"></div>
    </div>
  </section>
</main>
<?php get_footer(); ?>