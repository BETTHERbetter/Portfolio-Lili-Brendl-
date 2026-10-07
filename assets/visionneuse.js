// Agrandit une image au clic (plans, notices, photos, diapositives) ; flèches pour passer à la suivante
document.addEventListener('click', function (e) {
  var img = e.target.closest('.figs img, .terrain img, .galgrid img');
  if (!img || img.closest('.lb')) return;
  var zone = img.closest('.galgrid') || img.closest('.terrain') || img.closest('.article') || document;
  var liste = Array.prototype.slice.call(zone.querySelectorAll('.figs img, .terrain img, .galgrid img'));
  var i = liste.indexOf(img);

  var box = document.createElement('div');
  box.className = 'lb';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', 'Image agrandie');
  box.innerHTML = '<button type="button" class="close">Fermer</button>' +
    (liste.length > 1 ? '<button type="button" class="nav prev" aria-label="Image précédente">‹</button><button type="button" class="nav next" aria-label="Image suivante">›</button>' : '') +
    '<div><img alt=""><p></p></div>';
  var grand = box.querySelector('img'), texte = box.querySelector('p');

  function montre(n) {
    i = (n + liste.length) % liste.length;
    var src = liste[i], fig = src.closest('figure'), cap = fig && fig.querySelector('figcaption');
    grand.src = src.currentSrc || src.src;
    grand.alt = src.alt;
    var t = cap ? cap.textContent : '';
    texte.textContent = /^Diapositive \d+$/.test(t) ? t + ' sur ' + liste.length : t;
  }
  function close() { box.remove(); document.removeEventListener('keydown', onKey); img.focus && img.focus(); }
  function onKey(k) {
    if (k.key === 'Escape') close();
    else if (k.key === 'ArrowRight') montre(i + 1);
    else if (k.key === 'ArrowLeft') montre(i - 1);
  }
  box.addEventListener('click', function (ev) {
    if (ev.target.classList.contains('prev')) { ev.stopPropagation(); montre(i - 1); }
    else if (ev.target.classList.contains('next')) { ev.stopPropagation(); montre(i + 1); }
    else close();
  });
  document.addEventListener('keydown', onKey);
  montre(i);
  document.body.appendChild(box);
  box.querySelector('.close').focus();
});
