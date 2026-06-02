const canvas = document.getElementById("signalCanvas");
const context = canvas?.getContext("2d");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas && context) {
  const particles = Array.from({ length: 30 }, (_, index) => ({
    phase: index * 0.44,
    radius: 1.6 + (index % 4) * 0.65,
    speed: 0.0014 + (index % 5) * 0.00018,
    xBias: 0.42 + (index % 7) * 0.09,
    yBias: 0.2 + (index % 6) * 0.11,
  }));

  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function pointFor(particle, time) {
    const wave = Math.sin(time * particle.speed + particle.phase);
    const drift = Math.cos(time * particle.speed * 0.72 + particle.phase);

    return {
      x: width * particle.xBias + wave * width * 0.16,
      y: height * particle.yBias + drift * height * 0.1,
    };
  }

  function draw(time = 0) {
    context.clearRect(0, 0, width, height);

    const points = particles.map((particle) => pointFor(particle, time));

    for (let index = 0; index < points.length; index += 1) {
      const point = points[index];
      const next = points[(index + 5) % points.length];
      const distance = Math.hypot(point.x - next.x, point.y - next.y);
      const alpha = Math.max(0, 1 - distance / 460) * 0.34;

      context.strokeStyle = `rgba(190, 238, 232, ${alpha})`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(point.x, point.y);
      context.lineTo(next.x, next.y);
      context.stroke();
    }

    points.forEach((point, index) => {
      const particle = particles[index];
      const pulse = reducedMotion ? 0.45 : 0.45 + Math.sin(time * 0.002 + particle.phase) * 0.25;

      context.fillStyle = `rgba(245, 210, 132, ${0.35 + pulse * 0.28})`;
      context.beginPath();
      context.arc(point.x, point.y, particle.radius + pulse * 1.6, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = `rgba(77, 219, 211, ${0.22 + pulse * 0.22})`;
      context.lineWidth = 1;
      context.beginPath();
      context.arc(point.x, point.y, particle.radius * 5.5, 0, Math.PI * 2);
      context.stroke();
    });

    if (!reducedMotion) {
      window.requestAnimationFrame(draw);
    }
  }

  resize();
  draw();
  window.addEventListener("resize", () => {
    resize();
    draw();
  });
}
