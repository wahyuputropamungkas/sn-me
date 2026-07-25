$(function () {

  function tampilkanView(target) {
    var $current = $('.view-panel.is-active');
    var $next = $(target);

    if ($current.is($next)) return;

    $current.stop(true, true).fadeOut(180, function () {
      $current.removeClass('is-active').attr('hidden', true);
      $next.removeAttr('hidden').hide().addClass('is-active').fadeIn(280, function () {
        if (target === '#cv-view') {
          sesuaikanViewport();
          $('.js-show-card').trigger('focus');
        } else {
          $('.js-show-cv').trigger('focus');
        }
      });

      if (target !== '#cv-view') {
        $('.js-toggle-contact').attr('aria-expanded', 'false');
        $('#contact-options').stop(true, true).slideUp(0).attr('hidden', true);
      }
    });
  }

  $('.js-show-cv').on('click', function () {
    tampilkanView('#cv-view');
  });

  $('.js-show-card').on('click', function () {
    tampilkanView('#card-view');
  });

  $('.js-toggle-contact').on('click', function () {
    var $button = $(this);
    var $options = $('#contact-options');
    var willOpen = $button.attr('aria-expanded') !== 'true';

    $button.attr('aria-expanded', willOpen);

    if (willOpen) {
      $options.removeAttr('hidden').hide().stop(true, true).slideDown(220);
    } else {
      $options.stop(true, true).slideUp(180, function () {
        $options.attr('hidden', true);
      });
    }
  });

  $(document).on('keydown', function (event) {
    if (event.key !== 'Escape') return;

    if ($('#cv-view').hasClass('is-active')) {
      tampilkanView('#card-view');
    } else if ($('.js-toggle-contact').attr('aria-expanded') === 'true') {
      $('.js-toggle-contact').trigger('click');
    }
  });

  // Hover interaktif yang ringan dan modern
  $('.item-interaktif').on('mouseenter', function () {
    $(this).addClass('is-hover');
  }).on('mouseleave', function () {
    $(this).removeClass('is-hover');
  });

  // Pengalaman: hover glow saja, tanpa zoom agar teks tidak terpotong
  $('.exp-interaktif').on('mouseenter', function () {
    $(this).addClass('is-hover');
  }).on('mouseleave', function () {
    $(this).removeClass('is-hover');
  });

  // Foto: efek miring mengikuti posisi mouse
  var $fotoWrap = $('.foto-wrap');

  $fotoWrap.on('mousemove', function (e) {
    var rect = this.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;

    $('.foto').css(
      'transform',
      'scale(1.06) rotateX(' + (-y * 8) + 'deg) rotateY(' + (x * 8) + 'deg)'
    );
  }).on('mouseleave', function () {
    $('.foto').css('transform', '');
  });

  // Skala otomatis agar muat 1 viewport di desktop
  function sesuaikanViewport() {
    var $papan = $('.papan-biodata');

    $papan.css({
      transform: 'none',
      transformOrigin: 'top center',
      width: '',
      height: ''
    });

    if ($(window).width() <= 900) return;

    var viewportH = window.innerHeight;
    var contentH = $papan[0].scrollHeight;
    var padding = 28;

    var scaleH = (viewportH - padding) / contentH;
    var scale = Math.min(scaleH, 1);

    if (scale < 1) {
      $papan.css({
        transform: 'scale(' + scale + ')',
        transformOrigin: 'top center'
      });
    }
  }

  sesuaikanViewport();
  $(window).on('resize', sesuaikanViewport);

});
