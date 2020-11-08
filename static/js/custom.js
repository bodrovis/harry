function update_hash() {
  document.location.hash = '#' + this.attr('id');
}

$(document).ready(function() {
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
