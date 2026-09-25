(() => {
  'use strict';
  const frame = document.getElementById('game-frame');
  const shell = document.getElementById('player-shell');
  const start = document.getElementById('player-start');
  const launch = document.getElementById('player-launch');
  const status = document.getElementById('player-status');
  const fullscreen = document.getElementById('player-fullscreen');
  const helpBar = document.getElementById('player-help-bar');
  const hideHelp = document.getElementById('player-hide-help');
  const showHelp = document.getElementById('player-show-help');
  let started = false;

  hideHelp.addEventListener('click', () => {
    helpBar.hidden = true;
    hideHelp.setAttribute('aria-expanded', 'false');
    showHelp.hidden = false;
    if (started) frame.focus();
    else showHelp.focus();
  });

  showHelp.addEventListener('click', () => {
    helpBar.hidden = false;
    hideHelp.setAttribute('aria-expanded', 'true');
    showHelp.hidden = true;
    hideHelp.focus();
  });

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
