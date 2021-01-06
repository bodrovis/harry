age_confirmed = Cookies.get('harry-age-confirmed');
if (!age_confirmed) {
  $main = $('.main-content');
  $age_check = $('.age-check');

  $main.hide();
  $age_check.show();

  $('.js-age-yes').click(function(e) {
    e.preventDefault();
    Cookies.set('harry-age-confirmed', 'true', { sameSite: 'strict',  expires: 7 });
    $main.show();
    $age_check.hide();
  });

  $('.js-age-no').click(function(e) {
    e.preventDefault();
    $age_check.hide();
  });
}
