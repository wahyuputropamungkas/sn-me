$(function () {

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
    var viewportW = window.innerWidth;
    var contentH = $papan[0].scrollHeight;
    var contentW = $papan[0].scrollWidth;
    var padding = 28;

    var scaleH = (viewportH - padding) / contentH;
    var scaleW = (viewportW - padding) / contentW;
    var scale = Math.min(scaleH, scaleW, 1);

    if (scale < 1) {
      $papan.css({
        transform: 'scale(' + scale + ')',
        transformOrigin: 'top center',
        width: (100 / scale) + '%',
        height: (100 / scale) + 'vh'
      });
    }
  }

  sesuaikanViewport();
  $(window).on('resize', sesuaikanViewport);

});
