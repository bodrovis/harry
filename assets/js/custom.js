function update_hash() {
  document.location.hash = '#' + this.attr('id');
}

$(document).ready(function() {
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

  $('.book-main .page-num').click(function(e) {
    update_hash.apply($(this).closest('.row'));
  });

  $('.chapter-title').click(function(e) {
    update_hash.apply($(this));
  });

  let $index = $('.index-wrapper');
  if($index.length > 0) {
    let index_contents = '<h5>Оглавление этой части</h5><ul class="index">';
    $('.chapter-title').each(function() {
      let $this = $(this);
      index_contents += '<li><a href="#' + $this.attr('id') + '">' + $this.text() + '</a></li>';
    });
    index_contents += '</ul>';
    $index.html(index_contents);
  }

  let $nested_active = $('.main-menu .dropdown .is-active');

  if($nested_active.length > 0) {
    $nested_active.closest('.has-children').addClass('is-active')
  }
});