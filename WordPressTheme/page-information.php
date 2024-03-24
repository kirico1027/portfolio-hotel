<?php get_header(); ?>
<main>

  <?php get_template_part('template-parts/sub-mv'); ?>

  <?php get_template_part('template-parts/breadcrumb'); ?>

  <section class="page-info layout-page-info">
    <div class="page-info__inner inner">
      <div class="page-info__tab tab">
        <ul class="tab__menu tab-menu">
          <li class="tab-menu__item js-tab-menu" data-number="tab01"><span>Gardening Party</span>
          </li>
          <li class="tab-menu__item js-tab-menu" data-number="tab02"><span>Events</span></li>
          <li class="tab-menu__item js-tab-menu" data-number="tab03"><span>Relaxation</span></li>
        </ul>
        <ul class="tab__content tab-content">
          <li id="tab01" class="tab-content__item js-tab-content is-active">
            <div class="tab-content__box">
              <div class="tab-content__body">
                <h2 class="tab-content__title">Gardening Party</h2>
                <p class="tab-content__text">
                  春の訪れを感じる特別なガーデニングパーティに、ぜひご参加ください。ホテル庭園では、新緑が輝き、心地よい風が吹き抜けます。レストランからは、春の味覚を楽しめる軽食が提供されます。プロのガーデニングアドバイザーによるワークショップでは、春の植物の育て方やお手入れのコツを学び、庭園をより楽しむヒントを得られます。音楽や春の香りに包まれながら、贅沢な時間をお過ごしください。
                </p>
              </div>
              <figure class="tab-content__image">
                <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/information1.jpg" alt="ガーデニングパーティの画像"
                  loading="lazy">
              </figure>
            </div>
          </li>
          <li id="tab02" class="tab-content__item js-tab-content">
            <div class="tab-content__box">
              <div class="tab-content__body">
                <h2 class="tab-content__title">Events</h2>
                <p class="tab-content__text">
                  若手アーティストの展覧会を開催します。彼らの作品は現代の感性と新しい芸術の視点を示し、様々なスタイルやテクニックが融合されています。絵画から立体作品まで多彩なジャンルを展示し、一つ一つが独自の物語を語ります。展覧会は芸術の可能性を広げる素晴らしい機会であり、新たな才能を発見する場でもあります。ぜひ、ご家族やお友達をお誘いの上、お越しください。
                </p>
              </div>
              <figure class="tab-content__image">
                <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/information2.jpg" alt="展覧会の画像"
                  loading="lazy">
              </figure>
            </div>
          </li>
          <li id="tab03" class="tab-content__item js-tab-content">
            <div class="tab-content__box">
              <div class="tab-content__body">
                <h2 class="tab-content__title">Relaxation</h2>
                <p class="tab-content__text">
                  ホテル内のリラクゼーション施設では、最高級の癒しを提供しております。アロマの心地よい香りに包まれながら、一流の施術師による贅沢なトリートメントをご堪能いただけます。特別な宿泊者限定の割引もご用意しております。日常の疲れを癒し、心身をリフレッシュする至福のひとときをお楽しみください。リラックスしておくつろぎいただける空間で、癒しと快適さに満ちた体験をお約束いたします。
                </p>
              </div>
              <figure class="tab-content__image">
                <img src="<?php echo get_theme_file_uri(); ?>/assets/images/common/information3.jpg" alt="リラクゼーションの画像"
                  loading="lazy">
              </figure>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>

</main>
<?php get_footer(); ?>