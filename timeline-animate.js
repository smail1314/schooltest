// 政策發展時間軸自動緩慢向右滾動，彈性回彈，點擊暫停30秒
(function() {
  const container = document.getElementById('timelineContainer');
  if (!container) return;

  let animationFrame;
  let paused = false;
  let pauseTimeout = null;
  let velocity = 2.5; // px per frame，提升右捲速度
  let direction = 1; // 1: right, -1: left
  // let bouncing = false;

  function animate() {
    if (paused) return;
    let maxScroll = container.scrollWidth - container.clientWidth;
    let current = container.scrollLeft;
    if (direction === 1) {
      if (current < maxScroll) {
        container.scrollLeft += velocity;
        animationFrame = requestAnimationFrame(animate);
      } else {
        // 到最右邊就停住，不回彈
        container.scrollLeft = maxScroll;
      }
    }
  }

  function pauseScroll() {
    if (paused) return;
    paused = true;
    if (animationFrame) cancelAnimationFrame(animationFrame);
    if (pauseTimeout) clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      paused = false;
      animate();
    }, 30000);
  }

  container.addEventListener('click', pauseScroll);


  animate();
})();
