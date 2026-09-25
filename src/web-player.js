(() => {
  'use strict';
  const frame = document.getElementById('game-frame');
  const shell = document.getElementById('player-shell');
  const start = document.getElementById('player-start');
  const launch = document.getElementById('player-launch');
  const status = document.getElementById('player-status');
  const fullscreen = document.getElementById('player-fullscreen');
  let started = false;

  start.addEventListener('click', () => {
    if (started) return;
    started = true;
    start.disabled = true;
    status.textContent = 'Loading game files…';
    frame.addEventListener('load', () => {
      status.textContent = 'Click inside the game to use your keyboard.';
      fullscreen.disabled = !document.fullscreenEnabled;
      frame.focus();
    }, { once: true });
    frame.src = frame.dataset.src;
    frame.hidden = false;
    launch.hidden = true;
    frame.focus();
  });

  fullscreen.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await shell.requestFullscreen();
      frame.focus();
    } catch (_) {
      status.textContent = 'Fullscreen is unavailable. You can keep playing here.';
    }
  });

  document.addEventListener('fullscreenchange', () => {
    fullscreen.textContent = document.fullscreenElement ? 'Exit fullscreen' : '⛶ Fullscreen';
  });
})();
