  <footer class="footer layout-footer">
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
        $campaign_category_license = esc_url(home_url("/campaign_category/rooms"));
        $campaign_category_trial_diving = esc_url(home_url("/campaign_category/suites"));
        $privacypolicy = esc_url(home_url("/privacypolicy"));
        ?>

        <div class="footer__head-box">
          <div class="footer__logo">
            <a href="<?php echo $home; ?>">
              <!-- <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/logo.svg" alt="CodeUps"> -->
              Kirico Palece Hotel
            </a>
          </div>

          <div class="footer__sns">
            <a class="footer__sns-icon" href="https://www.facebook.com" target="_blank" rel="noopener">
              <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/facebook.svg" alt="facebook">
            </a>
            <a class="footer__sns-icon" href="https://www.instagram.com" target="_blank" rel="noopener">
              <img src="<?php echo get_theme_file_uri() ?>/assets/images/common/instagram.svg" alt="instagram">
            </a>
          </div>
        </div>
        <nav class="footer__nav">
          <div class="footer__nav-items">
            <div class="footer__nav-container">
              <div class="footer__nav-content">
                <div class="footer__nav-block">
                  <div class="footer__nav-item footer__nav-item--main">
                    <a href="<?php echo $campaign; ?>">Rooms & Suites</a>
                  </div>
                  <div class="footer__nav-item">
                    <a href="<?php echo $campaign_category_license; ?>">Rooms</a>
                  </div>
                  <div class="footer__nav-item">
                    <a href="<?php echo $campaign_category_trial_diving; ?>">Suites</a>
                  </div>
                </div>
              </div>
              <div class="footer__nav-content">
                <div class="footer__nav-item footer__nav-item--main">
                  <a href="<?php echo $about; ?>">About us</a>
                </div>
              </div>
              <div class="footer__nav-content">
                <div class="footer__nav-block">
                  <div class="footer__nav-item footer__nav-item--main">
                    <a href="<?php echo $information; ?>">Information</a>
                  </div>
                  <div class="footer__nav-item">
                    <a href="<?php echo $information; ?>?tab=tab01">Gardening Party</a>
                  </div>
                  <div class="footer__nav-item">
                    <a href="<?php echo $information; ?>?tab=tab02">Events</a>
                  </div>
                  <div class="footer__nav-item">
                    <a href="<?php echo $information; ?>?tab=tab03">Relaxation</a>
                  </div>
                </div>
              </div>
              <div class="footer__nav-content">
                <div class="footer__nav-item footer__nav-item--main">
                  <a href="<?php echo $blog; ?>">Blog</a>
                </div>
              </div>
              <div class="footer__nav-content">
                <div class="footer__nav-item footer__nav-item--main">
                  <a href="<?php echo $voice; ?>">Voice</a>
                </div>
              </div>
              <div class="footer__nav-content">
                <div class="footer__nav-item footer__nav-item--main">
                  <a href="<?php echo $contact; ?>">Contact</a>
                </div>
                <div class="footer__nav-item footer__nav-item--main">
                  <a href="<?php echo $privacypolicy; ?>">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <small
          class="footer__copyright">Copyright&nbsp;&copy;&nbsp;<?php echo wp_date("Y"); ?>&nbsp;Kirico&nbsp;Palece&nbsp;Hotel&nbsp;All&nbsp;Rights&nbsp;Reserved.</small>
      </div>
    </div>
  </footer>
  <?php wp_footer(); ?>
  </body>

  </html>