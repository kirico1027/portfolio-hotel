<?php
$image_pc = '';
$image_sp = '';
$mv_title = '';

if (is_page('about-us')) {
  $image_pc = '/assets/images/common/sub-mv-about.jpg';
  $image_sp = '/assets/images/common/sub-mv-about.jpg';
  $mv_title = 'About us';
} elseif (is_post_type_archive('voice')) {
  $image_pc = '/assets/images/common/sub-mv-voice.jpg';
  $image_sp = '/assets/images/common/sub-mv-voice.jpg';
  $mv_title = 'Voice';
} elseif (is_page('information')) {
  $image_pc = '/assets/images/common/sub-mv-information.jpg';
  $image_sp = '/assets/images/common/sub-mv-information.jpg';
  $mv_title = 'Information';
} elseif (is_page('contact') || is_page('contact/thanks')) {
  $image_pc = '/assets/images/common/sub-mv-contact.jpg';
  $image_sp = '/assets/images/common/sub-mv-contact.jpg';
  $mv_title = 'Contact';
} elseif (is_post_type_archive('campaign')) {
  $image_pc = '/assets/images/common/sub-mv-campaign.jpg';
  $image_sp = '/assets/images/common/sub-mv-campaign.jpg';
  $mv_title = 'Rooms & Suites';
} elseif (is_home() || is_single()) {
  $image_pc = '/assets/images/common/sub-mv-blog.jpg';
  $image_sp = '/assets/images/common/sub-mv-blog.jpg';
  $mv_title = 'Blog';
} else {
  $image_pc = '/assets/images/common/sub-mv-others.jpg';
  $image_sp = '/assets/images/common/sub-mv-others.jpg';
  $mv_title = 'Privacy Policy';
}
?>

<section class="sub-mv">
  <picture class="sub-mv__picture">
    <source srcset="<?php echo esc_url(get_theme_file_uri($image_pc)); ?>" media="(min-width: 768px)" type="image/jpg">
    <img src="<?php echo esc_url(get_theme_file_uri($image_sp)); ?>" alt="">
  </picture>
  <h1 class="sub-mv__title"><?php echo esc_html($mv_title); ?></h1>
</section>