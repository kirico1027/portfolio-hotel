<?php if (is_front_page()) : ?>
  <footer class="footer">
  <?php else : ?>
    <footer class="footer layout-footer">
    <?php endif; ?>
    <div class="footer__inner inner">
      <div class="footer__content">
        <?php
        $home = esc_url(home_url("/"));
        $campaign = esc_url(home_url("/campaign"));
        $about = esc_url(home_url("/about-us"));
        $information = esc_url(home_url("/information"));
        $blog = esc_url(home_url("/blog"));
        $voice = esc_url(home_url("/voice"));
        $contact = esc_url(home_url("/contact"));
        $campaign_category_rooms = esc_url(home_url("/campaign_category/rooms"));
        $campaign_category_suites = esc_url(home_url("/campaign_category/suites"));
        $privacypolicy = esc_url(home_url("/privacypolicy"));
        ?>

        <div class="footer__head-box">
          <div class="footer__logo">
            <a href="<?php echo $home; ?>">
              <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/logo-main.svg"
                alt="KIRICO PALACE HOTEL">
            </a>
          </div>

          <div class="footer__sns">
            <a class="footer__sns-icon" href="https://www.facebook.com" target="_blank" rel="noopener">
              <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/facebook.svg" alt="Facebook">
            </a>
            <a class="footer__sns-icon" href="https://www.instagram.com" target="_blank" rel="noopener">
              <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/instagram.svg" alt="Instagram">
            </a>
          </div>
        </div>
        <nav class="footer__nav">
          <div class="footer__nav-items">
            <ul class="footer__nav-container">
              <li class="footer__nav-content">
                <ul class="footer__nav-block">
                  <li class="footer__nav-item footer__nav-item--main">
                    <a href="<?php echo $campaign; ?>">Rooms & Suites</a>
                  </li>
                  <li class="footer__nav-item">
                    <a href="<?php echo $campaign_category_rooms; ?>">Rooms</a>
                  </li>
                  <li class="footer__nav-item">
                    <a href="<?php echo $campaign_category_suites; ?>">Suites</a>
                  </li>
                </ul>
              </li>
              <li class="footer__nav-content">
                <div class="footer__nav-item footer__nav-item--main">
                  <a href="<?php echo $about; ?>">About us</a>
                </div>
              </li>
              <li class="footer__nav-content">
                <ul class="footer__nav-block">
                  <li class="footer__nav-item footer__nav-item--main">
                    <a href="<?php echo $information; ?>">Information</a>
                  </li>
                  <li class="footer__nav-item">
                    <a href="<?php echo $information; ?>?tab=tab01">Gardening Party</a>
                  </li>
                  <li class="footer__nav-item">
                    <a href="<?php echo $information; ?>?tab=tab02">Events</a>
                  </li>
                  <li class="footer__nav-item">
                    <a href="<?php echo $information; ?>?tab=tab03">Relaxation</a>
                  </li>
                </ul>
              </li>
              <li class="footer__nav-content">
                <div class="footer__nav-item footer__nav-item--main">
                  <a href="<?php echo $blog; ?>">Blog</a>
                </div>
              </li>
              <li class="footer__nav-content">
                <div class="footer__nav-item footer__nav-item--main">
                  <a href="<?php echo $voice; ?>">Voice</a>
                </div>
              </li>
              <li class="footer__nav-content">
                <div class="footer__nav-item footer__nav-item--main">
                  <a href="<?php echo $contact; ?>">Contact</a>
                </div>
                <div class="footer__nav-item footer__nav-item--main">
                  <a href="<?php echo $privacypolicy; ?>">Privacy Policy</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <small class="footer__copyright">Copyright
          &copy;<?php echo wp_date("Y"); ?>
          Kirico Palece Hotel All Rights Reserved.</small>
      </div>
    </div>
    </footer>
    <?php wp_footer(); ?>