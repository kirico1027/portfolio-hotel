<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="format-detection" content="telephone=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php wp_head(); ?>
</head>

<?php
$home = esc_url(home_url("/"));
$campaign = esc_url(home_url("/campaign"));
$about = esc_url(home_url("/about-us"));
$information = esc_url(home_url("/information"));
$blog = esc_url(home_url("/blog"));
$voice = esc_url(home_url("/voice"));
$contact = esc_url(home_url("/contact"));
$campaign_category_license = esc_url(home_url("/campaign_category/rooms"));
$campaign_category_trial_diving = esc_url(home_url("/campaign_category/suites"));
$privacypolicy = esc_url(home_url("/privacypolicy"));
?>

<body <?php body_class(is_front_page() ? 'is-top' : ''); ?>>
  <?php wp_body_open(); ?>
  <header class="header js-header">
    <div class="header__inner">
      <?php if (is_front_page()) : ?>
      <h1 class="header__logo">
        <a href="<?php echo $home; ?>">
          <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/logo-main.svg" alt="KIRICO PALECE HOTEL"
            class="header__logo-main">
        </a>
        <a href="<?php echo $home; ?>">
          <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/logo-sub.svg" alt=" KIRICO PALECE HOTEL"
            class="header__logo-sub"> </a>
      </h1>
      <?php else : ?>
      <div class="header__logo">
        <a href="<?php echo $home; ?>">
          <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/logo-main.svg" alt="KIRICO PALECE HOTEL"
            class="header__logo-main">
        </a>
        <a href="<?php echo $home; ?>">
          <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/logo-sub.svg" alt="KIRICO PALECE HOTEL"
            class="header__logo-sub">
        </a>
      </div>
      <?php endif; ?>
      <nav class="header__nav">
        <ul class="header__nav-items">
          <li class="header__nav-item">
            <a class="js-splitText" href="<?php echo $campaign; ?>">ROOMS &amp; SUITES</a>
          </li>
          <li class="header__nav-item">
            <a class="js-splitText" href="<?php echo $about; ?>">ABOUT US</a>
          </li>
          <li class="header__nav-item">
            <a class="js-splitText" href="<?php echo $information; ?>">INFORMATION</a>
          </li>
          <li class="header__nav-item">
            <a class="js-splitText" href="<?php echo $blog; ?>">BLOG</a>
          </li>
          <li class="header__nav-item">
            <a class="js-splitText" href="<?php echo $voice; ?>">VOICE</a>
          </li>
          <li class="header__nav-item">
            <a class="js-splitText" href="<?php echo $contact; ?>">CONTACT</a>
          </li>
        </ul>
      </nav>
      <div class="header__hamburger js-hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="header__drawer js-drawer">
        <div class="header__drawer-wrapper">
          <nav class="header__drawer-nav">
            <div class="header__drawer-items">
              <div class="header__drawer-content">
                <div class="header__drawer-block">
                  <div class="header__drawer-item header__drawer-item--main">
                    <a href="<?php echo $campaign; ?>">Rooms&nbsp;&&nbsp;Suites</a>
                  </div>
                  <div class="header__drawer-item">
                    <a href="<?php echo $campaign_category_license; ?>">Rooms</a>
                  </div>
                  <div class="header__drawer-item">
                    <a href="<?php echo $campaign_category_trial_diving; ?>">Suites</a>
                  </div>
                </div>
              </div>
              <div class="header__drawer-content">
                <div class="header__drawer-item header__drawer-item--main">
                  <a href="<?php echo $about; ?>">About&nbsp;us</a>
                </div>
              </div>
              <div class="header__drawer-content">
                <div class="header__drawer-block">
                  <div class="header__drawer-item header__drawer-item--main">
                    <a href="<?php echo $information; ?>">Information</a>
                  </div>
                  <div class="header__drawer-item">
                    <a href="<?php echo $information; ?>?tab=tab01">Gardening Party</a>
                  </div>
                  <div class="header__drawer-item">
                    <a href="<?php echo $information; ?>?tab=tab02">Events</a>
                  </div>
                  <div class="header__drawer-item">
                    <a href="<?php echo $information; ?>?tab=tab03">Relaxation</a>
                  </div>
                </div>
              </div>
              <div class="header__drawer-content">
                <div class="header__drawer-item header__drawer-item--main">
                  <a href="<?php echo $blog; ?>">Blog</a>
                </div>
              </div>
              <div class="header__drawer-content">
                <div class="header__drawer-item header__drawer-item--main">
                  <a href="<?php echo $voice; ?>">Voice</a>
                </div>
              </div>
              <div class="header__drawer-content">
                <div class="header__drawer-item header__drawer-item--main">
                  <a href="<?php echo $contact; ?>">Contact</a>
                </div>
              </div>
              <div class="header__drawer-content">
                <div class="header__drawer-item header__drawer-item--main">
                  <a href="<?php echo $privacypolicy; ?>">Privacy Policy</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>