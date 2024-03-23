<?php get_header(); ?>
<main>

  <?php get_template_part('template-parts/sub-mv'); ?>

  <?php get_template_part('template-parts/breadcrumb'); ?>

  <section class="page-about-lead layout-page-about-lead">
    <div class="page-about-lead__inner inner">
      <div class="page-about-lead__content-sp">
        <div class="page-about-lead__image">
          <figure class="page-about-lead__image-right">
            <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/about2.jpg" alt="ホテルの寝室の画像"
              loading="lazy">
          </figure>
          <h2 class="page-about-lead__body-title">with&nbsp;all<br>one's&nbsp;heart</h2>
        </div>
        <div class="page-about-lead__box">
          <p class="page-about-lead__text">
            真心を込めて・・・お客様の快適な滞在を第一に考え、笑顔と心温まるサービスでお迎えします。<br>
            <span>清潔なお部屋と充実したアメニティで、心地よい時間を提供いたします。お客様の幸せを願い、心からのサポートをお約束いたします。</span>
          </p>
        </div>
      </div>
      <div class="page-about-lead__content-pc about-main-image">
        <div class="about-main-image__image">
          <figure class="about-main-image__image-left">
            <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/about2.jpg" alt="ホテルの寝室の画像"
              loading="lazy">
          </figure>
          <figure class="about-main-image__image-right">
            <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/about1.jpg" alt="ホテルのレストランの画像"
              loading="lazy">
          </figure>
        </div>
        <div class="about-main-image__body">
          <h2 class="about-main-image__body-title">with&nbsp;all<br>one's&nbsp;heart</h2>
          <div class="about-main-image__box">
            <p class="about-main-image__text">
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
        <h2 class="section-title__main">Gallery</h2>
      </div>
      <div class="page-about-gallery__container">

        <?php $fields = SCF::get('about-us_gallery'); ?>
        <?php foreach($fields as $field): ?>
        <?php if($field['gallery_image']): ?>
        <div class="page-about-gallery__image">
          <img src="<?php echo wp_get_attachment_url($field['gallery_image']); ?>" alt="">
        </div>
        <?php endif; ?>
        <?php endforeach; ?>

      </div>
      <div class="page-about-gallery__modal modal-image"></div>
    </div>
  </section>
</main>
<?php get_footer(); ?>