import React, { useEffect, useRef } from 'react';

export default function FireworksCanvas({ active = true, burstTrigger = 0 }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animIdRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  const timerRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#f07b70', '#e8c56a', '#ffffff', '#c0392b', '#ff9f43'];

    const random = (min, max) => min + Math.random() * (max - min);
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const createRocket = () => {
      const w = canvas.width;
      const h = canvas.height;
      return {
        role: 'rocket',
        x: random(w * 0.15, w * 0.85),
        y: h + 10,
        vx: random(-35, 35),
        vy: -Math.sqrt(840 * random(0.45, 0.72) * Math.max(420, h)),
        size: 2.5,
        color: pick(colors),
        alpha: 0.95,
        life: 1,
        decay: 0,
        wobble: 0
      };
    };

    const explodeRocket = (rocket) => {
      const count = Math.floor(random(45, 75));
      const speed = random(180, 320);
      const isPattern = Math.random() > 0.5;
      const sparks = [];

      // Flash
      sparks.push({
        role: 'flash',
        x: rocket.x,
        y: rocket.y,
        size: 8,
        color: '#ffffff',
        alpha: 0.7,
        life: 1,
        decay: 3.5,
        vx: 0,
        vy: 0,
        wobble: 0
      });

      for (let i = 0; i < count; i++) {
        const angle = isPattern ? (i / count) * Math.PI * 2 + random(-0.05, 0.05) : random(0, Math.PI * 2);
        const spd = isPattern ? speed * random(0.9, 1.1) : speed * Math.sqrt(Math.random());
        sparks.push({
          role: 'spark',
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          size: random(1.8, 3.2),
          color: Math.random() < 0.15 ? '#ffffff' : rocket.color,
          alpha: 1,
          life: 1,
          decay: random(0.35, 0.55),
          wobble: random(0, Math.PI * 2)
        });
      }
      return sparks;
    };

    const spawnBurst = () => {
      const w = canvas.width;
      const h = canvas.height;
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const fakeRocket = {
            x: random(w * 0.25, w * 0.75),
            y: random(h * 0.2, h * 0.45),
            color: pick(colors)
          };
          particlesRef.current.push(...explodeRocket(fakeRocket));
        }, i * 260);
      }
    };

    // Burst on trigger
    if (burstTrigger > 0) {
      spawnBurst();
    }

    const loop = (now) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (active) {
        timerRef.current += dt;
        if (timerRef.current > random(2.2, 3.8)) {
          timerRef.current = 0;
          particlesRef.current.push(createRocket());
        }
      }

      const nextParticles = [];

      for (let p of particlesRef.current) {
        if (p.role === 'rocket') {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += 420 * dt;
          p.alpha = 0.95;

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          if (p.vy > -60) {
            nextParticles.push(...explodeRocket(p));
          } else {
            nextParticles.push(p);
          }
        } else if (p.role === 'flash') {
          p.size += 340 * dt;
          p.life -= p.decay * dt;
          p.alpha = Math.max(0, p.life * 0.4);

          if (p.life > 0) {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            nextParticles.push(p);
          }
        } else if (p.role === 'spark') {
          p.vy += 140 * dt;
          p.vx *= (1 - 0.9 * dt);
          p.vy *= (1 - 0.9 * dt);
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.life -= p.decay * dt;
          p.wobble += 20 * dt;
          p.alpha = Math.max(0, p.life * (p.life < 0.5 ? 0.5 + 0.5 * Math.sin(p.wobble) : 1));

          if (p.life > 0) {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            nextParticles.push(p);
          }
        }
      }

      particlesRef.current = nextParticles;
      animIdRef.current = requestAnimationFrame(loop);
    };

    animIdRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [active, burstTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
}
