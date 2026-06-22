import { useCallback, useEffect, useRef } from 'react';
import './BorderGlow.css';

function parseHsl(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHsl(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];

  return opacities.reduce((vars, opacity, index) => {
    vars[`--glow-color${keys[index]}`] = `hsl(${base} / ${Math.min(opacity * intensity, 100)}%)`;
    return vars;
  }, {});
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = [
  '--gradient-one',
  '--gradient-two',
  '--gradient-three',
  '--gradient-four',
  '--gradient-five',
  '--gradient-six',
  '--gradient-seven',
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors) {
  const vars = {};
  for (let index = 0; index < 7; index += 1) {
    const color = colors[Math.min(COLOR_MAP[index], colors.length - 1)];
    vars[GRADIENT_KEYS[index]] = `radial-gradient(at ${GRADIENT_POSITIONS[index]}, ${color} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(value) {
  return 1 - (1 - value) ** 3;
}

function easeInCubic(value) {
  return value ** 3;
}

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const startTime = performance.now() + delay;
  let frameId = 0;
  let timeoutId = 0;
  let cancelled = false;

  function tick() {
    if (cancelled) return;
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(progress));
    if (progress < 1) {
      frameId = requestAnimationFrame(tick);
    } else if (onEnd) {
      onEnd();
    }
  }

  timeoutId = window.setTimeout(() => {
    frameId = requestAnimationFrame(tick);
  }, delay);

  return () => {
    cancelled = true;
    window.clearTimeout(timeoutId);
    if (frameId) {
      cancelAnimationFrame(frameId);
    }
  };
}

function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120f17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
  ...cardProps
}) {
  const cardRef = useRef(null);

  const getCenterOfElement = useCallback((element) => {
    const { width, height } = element.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback(
    (element, x, y) => {
      const [centerX, centerY] = getCenterOfElement(element);
      const deltaX = x - centerX;
      const deltaY = y - centerY;
      const kx = deltaX === 0 ? Infinity : centerX / Math.abs(deltaX);
      const ky = deltaY === 0 ? Infinity : centerY / Math.abs(deltaY);
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    },
    [getCenterOfElement],
  );

  const getCursorAngle = useCallback(
    (element, x, y) => {
      const [centerX, centerY] = getCenterOfElement(element);
      const deltaX = x - centerX;
      const deltaY = y - centerY;
      if (deltaX === 0 && deltaY === 0) return 0;

      let degrees = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    },
    [getCenterOfElement],
  );

  const handlePointerMove = useCallback(
    (event) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const edge = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);

      card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
      card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
    },
    [getCursorAngle, getEdgeProximity],
  );

  const handlePointerEnter = useCallback(() => {
    cardRef.current?.classList.add('edge-active');
  }, []);

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove('edge-active');
    card.style.setProperty('--edge-proximity', '0');
  }, []);

  useEffect(() => {
    if (!animated || !cardRef.current) return undefined;

    const card = cardRef.current;
    const angleStart = 110;
    const angleEnd = 465;
    card.classList.add('sweep-active');
    card.style.setProperty('--cursor-angle', `${angleStart}deg`);

    const cancelAnimations = [
      animateValue({
        duration: 500,
        onUpdate: (value) => card.style.setProperty('--edge-proximity', value),
      }),
      animateValue({
        ease: easeInCubic,
        duration: 1500,
        end: 50,
        onUpdate: (value) => {
          card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (value / 100) + angleStart}deg`);
        },
      }),
      animateValue({
        ease: easeOutCubic,
        delay: 1500,
        duration: 2250,
        start: 50,
        end: 100,
        onUpdate: (value) => {
          card.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (value / 100) + angleStart}deg`);
        },
      }),
      animateValue({
        ease: easeInCubic,
        delay: 2500,
        duration: 1500,
        start: 100,
        end: 0,
        onUpdate: (value) => card.style.setProperty('--edge-proximity', value),
        onEnd: () => card.classList.remove('sweep-active'),
      }),
    ];

    return () => {
      cancelAnimations.forEach((cancel) => cancel());
      card.classList.remove('sweep-active');
    };
  }, [animated]);

  return (
    <div
      ref={cardRef}
      className={`border-glow-card ${className}`.trim()}
      {...cardProps}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...buildGlowVars(glowColor, glowIntensity),
        ...buildGradientVars(colors),
      }}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}

export default BorderGlow;
