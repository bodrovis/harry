(function() {
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
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  function openDialog(dialog, trigger) {
    if (!dialog) return;
    dialog.style.display = 'block';
    dialog.setAttribute('aria-hidden', 'false');

    if (trigger && trigger.hasAttribute('aria-expanded')) {
      trigger.setAttribute('aria-expanded', 'true');
    }
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    dialog.style.display = 'none';
    dialog.setAttribute('aria-hidden', 'true');

    var id = dialog.getAttribute('id');
    if (!id) return;

    var triggers = document.querySelectorAll(
      '.js-show-dialog[data-target="#' + id + '"]'
    );
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].hasAttribute('aria-expanded')) {
        triggers[i].setAttribute('aria-expanded', 'false');
      }
    }
  }

  ready(function() {
    var nested_active = document.querySelector('.main-menu .dropdown .is-active');
    if (nested_active) {
      var parentWithChildren = nested_active.closest('.has-children');
      if (parentWithChildren) {
        parentWithChildren.classList.add('is-active');
      }
    }

    document.addEventListener(
      'click',
      function(e) {
        for (var target = e.target; target && target !== this; target = target.parentNode) {
          if (target.matches('.page-num')) {
            update_hash.apply(target.closest('.row'));
            break;
          }
        }
      },
      false
    );

    document.addEventListener(
      'click',
      function(e) {
        for (var target = e.target; target && target !== this; target = target.parentNode) {
          if (target.matches('.chapter-title')) {
            update_hash.apply(target);
            break;
          }
        }
      },
      false
    );

    document.addEventListener(
      'click',
      function(e) {
        for (var target = e.target; target && target !== this; target = target.parentNode) {
          if (target.matches('.js-show-dialog')) {
            e.preventDefault();
            var dialogSelector = target.getAttribute('data-target');
            if (!dialogSelector) break;
            var dialog = document.querySelector(dialogSelector);
            openDialog(dialog, target);
            break;
          }
        }
      },
      false
    );

    document.addEventListener(
      'keydown',
      function(evt) {
        evt = evt || window.event;
        var isEscape = false;

        if ('key' in evt) {
          isEscape = evt.key === 'Escape' || evt.key === 'Esc';
        } else if ('keyCode' in evt) {
          isEscape = evt.keyCode === 27;
        }

        if (isEscape) {
          var dialogs = document.querySelectorAll('.js-dialog');
          for (var i = 0; i < dialogs.length; i++) {
            closeDialog(dialogs[i]);
          }
        }
      },
      false
    );

    document.addEventListener(
      'click',
      function(e) {
        for (var target = e.target; target && target !== this; target = target.parentNode) {
          if (target.matches('.js-close-dialog')) {
            e.preventDefault();
            var dialog = target.closest('.js-dialog');
            closeDialog(dialog);
            break;
          }
        }
      },
      false
    );

    document.addEventListener(
      'click',
      function(e) {
        for (var target = e.target; target && target !== this; target = target.parentNode) {
          if (target.matches('.js-menu-toggler')) {
            e.preventDefault();
            var parent = target.closest('.js-menu');
            if (!parent) break;

            var list = parent.querySelector(target.getAttribute('data-target'));
            if (!list) break;

            list.classList.toggle('visible');

            if (target.hasAttribute('aria-expanded')) {
              var expanded = target.getAttribute('aria-expanded') === 'true';
              target.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            }

            break;
          }
        }
      },
      false
    );

    document.addEventListener(
      'click',
      function(e) {
        for (var target = e.target; target && target !== this; target = target.parentNode) {
          if (target.matches('.js-show-toggle')) {
            e.preventDefault();
            var target_element = target.getAttribute('data-target');
            var parent = target.parentNode;

            if (!target_element || !parent) break;

            parent.classList.toggle('opened');
            var child = parent.querySelector(target_element);
            if (child) {
              child.classList.toggle('hidden');
            }

            break;
          }
        }
      },
      false
    );
  });
})();