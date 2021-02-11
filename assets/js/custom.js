(function() {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      var el = this;

      do {
        if (Element.prototype.matches.call(el, s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

  function update_hash() {
    document.location.hash = '#' + this.getAttribute('id');
  }

  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function() {
    var nested_active = document.querySelector('.main-menu .dropdown .is-active');
    if(!!nested_active) {
      nested_active.closest('.has-children').classList.add('is-active');
    }

    var index = document.querySelector('.js-index-placeholder');
    if(!!index) {
      var index_contents = '<ul class="index">';
      Array.prototype.forEach.call(document.querySelectorAll('.chapter-title'), function(el, _i){
        index_contents += '<li><a href="#' + el.getAttribute('id') + '">' + el.textContent + '</a></li>';
      });
      index_contents += '</ul>';
      index.innerHTML = index_contents;

      var button = document.querySelector('.js-show-index');
      var tooltip = document.querySelector('.js-index-placeholder');
  
      let popperInstance = null;

      function create() {
        popperInstance = Popper.createPopper(button, tooltip, {
          strategy: 'absolute',
          placement: 'top-start',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [-41, 8],
              },
            }
          ],
        });
      }

      function destroy() {
        if (popperInstance) {
          popperInstance.destroy();
          popperInstance = null;
        }
      }
  
      button.addEventListener('click', function(e) {
        e.preventDefault();

        this.classList.toggle('opened');
        if(tooltip.hasAttribute('data-show')) {
          tooltip.removeAttribute('data-show');
          destroy();
        } else {
          tooltip.setAttribute('data-show', '');
          create();
        }
      });
    }

    document.addEventListener('click', function(e) {
      for (var target = e.target; target && target != this; target = target.parentNode) {
        if (target.matches('.page-num')) {
          update_hash.apply(target.closest('.row'));
          break;
        }
      }
    }, false);

    document.addEventListener('click', function(e) {
      for (var target = e.target; target && target != this; target = target.parentNode) {
        if (target.matches('.chapter-title')) {
          update_hash.apply(target);
          break;
        }
      }
    }, false);

    document.addEventListener('click', function(e) {
      for (var target = e.target; target && target != this; target = target.parentNode) {
        if (target.matches('.js-show-dialog')) {
          e.preventDefault();
          document.querySelector(target.getAttribute('data-target')).style.display = 'block';
          break;
        }
      }
    }, false);

    document.addEventListener('click', function(e) {
      for (var target = e.target; target && target != this; target = target.parentNode) {
        if (target.matches('.js-close-dialog')) {
          e.preventDefault();
          target.closest('.js-dialog').style.display = 'none';
          break;
        }
      }
    }, false);

    document.addEventListener('click', function(e) {
      for (var target = e.target; target && target != this; target = target.parentNode) {
        if (target.matches('.js-menu-toggler')) {
          e.preventDefault();
          var parent = target.closest('.js-menu');
          parent.querySelector(target.getAttribute('data-target')).classList.toggle('visible');
          break;
        }
      }
    }, false);

    document.addEventListener('click', function(e) {
      for (var target = e.target; target && target != this; target = target.parentNode) {
        if (target.matches('.js-show-toggle')) {
          e.preventDefault();
          var target_element = target.getAttribute('data-target');
          var parent = target.parentNode;
          parent.classList.toggle('opened');
          parent.querySelector(target_element).classList.toggle('hidden');

          break;
        }
      }
    }, false);
  });
})();
