export function animateScale(object, targetScale, duration = 300) {
  const start = object.scale.clone();
  const startTime = performance.now();

  function tick(now) {
    const t = Math.min((now - startTime) / duration, 1);

    object.scale.lerpVectors(start, targetScale, t);
    object.updateMatrixWorld(true);

    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
