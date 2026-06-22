import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroDaynightLoop from './assets/optimized/hero-daynight-loop-web.mp4';
import heroDaynightPoster from './assets/optimized/hero-daynight-poster.jpg';
import heroMarquee01 from './assets/optimized/hero-marquee-01-thumb.jpg';
import heroMarquee02 from './assets/optimized/hero-marquee-02-thumb.jpg';
import heroMarquee03 from './assets/optimized/hero-marquee-03-thumb.jpg';
import heroMarquee04 from './assets/optimized/hero-marquee-04-thumb.jpg';
import heroMarquee05 from './assets/optimized/hero-marquee-05-thumb.jpg';
import heroMarquee06 from './assets/optimized/hero-marquee-06-thumb.jpg';
import heroMarquee07 from './assets/optimized/hero-marquee-07-thumb.jpg';
import heroMarquee08 from './assets/optimized/hero-marquee-08-thumb.jpg';
import heroMarquee09 from './assets/optimized/hero-marquee-09-thumb.jpg';
import heroMarquee10 from './assets/optimized/hero-marquee-10-thumb.jpg';
import heroMarquee11 from './assets/optimized/hero-marquee-11-thumb.jpg';
import heroMarquee12 from './assets/optimized/hero-marquee-12-thumb.jpg';
import liYifengProfile from './assets/optimized/li-yifeng-profile-card.jpg';
import projectIpCharacter from './assets/optimized/project-ip-character-card.jpg';
import projectIpShortfilm from './assets/optimized/project-ip-shortfilm-card.jpg';
import BorderGlow from './components/BorderGlow.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import { careerPath, navigation, profile, projects, strengths } from './data.js';

gsap.registerPlugin(ScrollTrigger);

const SoftAurora = lazy(() => import('./components/SoftAurora.jsx'));

function VideoBackdrop() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    playVideo();
    document.addEventListener('visibilitychange', playVideo);

    return () => {
      document.removeEventListener('visibilitychange', playVideo);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      src={heroDaynightLoop}
      poster={heroDaynightPoster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}

function HeroAmbientMotion() {
  return (
    <div className="hero-ambient" aria-hidden="true">
      <div className="hero-leaf-motion">
        <span className="hero-leaf hero-leaf-a" />
        <span className="hero-leaf hero-leaf-b" />
        <span className="hero-leaf hero-leaf-c" />
      </div>
    </div>
  );
}

function Header() {
  const [isFloating, setIsFloating] = useState(false);
  const isFloatingRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const updateHeaderState = () => {
      const threshold = Math.min(window.innerHeight * 0.72, 560);
      const nextFloating = window.scrollY >= threshold;
      if (nextFloating === isFloatingRef.current) return;
      isFloatingRef.current = nextFloating;
      setIsFloating(nextFloating);
    };

    const requestHeaderUpdate = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        updateHeaderState();
      });
    };

    updateHeaderState();
    window.addEventListener('scroll', requestHeaderUpdate, { passive: true });
    window.addEventListener('resize', requestHeaderUpdate);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('scroll', requestHeaderUpdate);
      window.removeEventListener('resize', requestHeaderUpdate);
    };
  }, []);

  return (
    <header className={`site-header${isFloating ? ' site-header-floating' : ''}`}>
      <a className="brand" href="#top" aria-label="返回首页">
        <span className="brand-mark">CO</span>
        <span>{profile.name}</span>
      </a>
      <nav className="main-nav" aria-label="页面导航">
        {navigation.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-action" href="#contact">
        联系我
      </a>
    </header>
  );
}

const galleryThemes = {
  mint: {
    accent: '#b9ff37',
    secondary: '#dfffd1',
    base: '#101815',
    glow: 'rgba(185, 255, 55, 0.58)',
  },
  amber: {
    accent: '#ffad55',
    secondary: '#ffe3bd',
    base: '#18130d',
    glow: 'rgba(255, 173, 85, 0.5)',
  },
  violet: {
    accent: '#b8a5ff',
    secondary: '#e2dbff',
    base: '#12101c',
    glow: 'rgba(184, 165, 255, 0.54)',
  },
};

const glowThemes = {
  mint: {
    hsl: '88 100 62',
    colors: ['#b9ff37', '#5eead4', '#f7ffb8'],
    bg: 'rgba(11, 18, 15, 0.82)',
  },
  amber: {
    hsl: '32 100 66',
    colors: ['#ffad55', '#facc15', '#f7f0c8'],
    bg: 'rgba(20, 15, 10, 0.82)',
  },
  violet: {
    hsl: '254 100 78',
    colors: ['#b8a5ff', '#38bdf8', '#f0abfc'],
    bg: 'rgba(14, 12, 24, 0.82)',
  },
};

const glowToneOrder = ['mint', 'amber', 'violet'];

const projectImages = {
  ipCharacter: projectIpCharacter,
  ipShortfilm: projectIpShortfilm,
  spaceVisual: heroMarquee12,
};

function getGlowTheme(tone) {
  return glowThemes[tone] ?? glowThemes.mint;
}

const heroMarqueeImages = [
  { src: heroMarquee01, tone: 'mint' },
  { src: heroMarquee02, tone: 'violet' },
  { src: heroMarquee03, tone: 'amber' },
  { src: heroMarquee04, tone: 'mint' },
  { src: heroMarquee05, tone: 'violet' },
  { src: heroMarquee06, tone: 'amber' },
  { src: heroMarquee07, tone: 'mint' },
  { src: heroMarquee08, tone: 'violet' },
  { src: heroMarquee09, tone: 'amber' },
  { src: heroMarquee10, tone: 'mint' },
  { src: heroMarquee11, tone: 'violet' },
  { src: heroMarquee12, tone: 'amber' },
];

function usePortfolioMotion() {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('motion-ready');

    if (reduceMotion) {
      return () => {
        document.documentElement.classList.remove('motion-ready');
      };
    }

    const ctx = gsap.context(() => {
      const dramaticEase = 'expo.out';
      const smoothEase = 'power4.out';

      gsap.set('.opening-mask', { autoAlpha: 1 });
      gsap.set('.opening-mask__line', {
        xPercent: -50,
        yPercent: -50,
        scaleX: 0,
        transformOrigin: 'left center',
      });
      gsap.set('.opening-mask__panel', { yPercent: 0 });
      gsap.set('.site-header', { y: -42, autoAlpha: 0 });
      gsap.set('.hero-video', {
        scale: 1.08,
        filter: 'saturate(1.05) contrast(1.12) brightness(0.52)',
      });
      gsap.set('.hero-kicker, .hero-lede', { y: 38, autoAlpha: 0 });
      gsap.set('.hero-actions a', { y: 34, autoAlpha: 0 });
      gsap.set('.hero .hero-title span', {
        yPercent: 118,
        scaleX: 0.72,
        rotateX: 16,
        clipPath: 'inset(0 0 100% 0)',
        autoAlpha: 0,
        transformOrigin: 'left bottom',
      });
      gsap.set('.hero-work-marquee', {
        y: 128,
        autoAlpha: 0,
        filter: 'blur(18px)',
      });

      gsap
        .timeline({ defaults: { ease: dramaticEase } })
        .to('.opening-mask__line', {
          scaleX: 1,
          duration: 1.05,
          ease: 'power3.inOut',
        }, 0.12)
        .to('.opening-mask__panel', {
          yPercent: (index) => (index === 0 ? -104 : 104),
          duration: 1.42,
          stagger: 0.08,
          ease: 'power4.inOut',
        }, 0.48)
        .to('.opening-mask', {
          autoAlpha: 0,
          duration: 0.52,
          ease: 'power2.out',
        }, 1.62)
        .to('.hero-video', {
          scale: 1,
          filter: 'saturate(1.12) contrast(1.06) brightness(0.88)',
          duration: 2.2,
        }, 0.32)
        .to('.site-header', {
          y: 0,
          autoAlpha: 1,
          duration: 1.05,
          ease: smoothEase,
        }, 0.78)
        .to('.hero .hero-title span', {
          yPercent: 0,
          scaleX: 1,
          rotateX: 0,
          clipPath: 'inset(0 0 0% 0)',
          autoAlpha: 1,
          duration: 1.52,
          stagger: 0.18,
          ease: dramaticEase,
        }, 0.92)
        .to('.hero-kicker', {
          y: 0,
          autoAlpha: 1,
          duration: 0.88,
          ease: smoothEase,
        }, 1.2)
        .to('.hero-lede', {
          y: 0,
          autoAlpha: 1,
          duration: 0.92,
          ease: smoothEase,
        }, 1.36)
        .to('.hero-actions a', {
          y: 0,
          autoAlpha: 1,
          duration: 0.95,
          stagger: 0.12,
          ease: smoothEase,
        }, 1.52)
        .to('.hero-work-marquee', {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 1.35,
          ease: smoothEase,
        }, 1.72);

      gsap.to('.hero-title-group', {
        yPercent: -9,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
        },
      });

      gsap.to('.hero-work-marquee', {
        yPercent: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: '35% top',
          end: 'bottom top',
          scrub: 1.1,
        },
      });

      gsap.utils.toArray('.profile-section, .projects-section, .strength-section, .contact-section').forEach((section) => {
        const heading = section.querySelector('.experience-heading h2, .section-heading h2, .contact-grid h2');
        const secondaryText = section.querySelectorAll('.experience-heading p, .experience-index, .section-heading .eyebrow, .contact-grid .eyebrow, .section-heading > p:last-child');
        const cards = section.querySelectorAll('.experience-profile-card, .experience-about, .career-item, .project-card, .strength-card, .contact-card');
        const images = section.querySelectorAll('.experience-profile-card .pc-card, .project-image');
        const media = section.querySelectorAll('.project-image-media');

        if (heading) {
          gsap.set(heading, {
            x: -190,
            scaleX: 0.76,
            skewX: -8,
            autoAlpha: 0,
            transformOrigin: 'left center',
          });
        }

        gsap.set(secondaryText, { y: 26, autoAlpha: 0 });

        gsap.set(cards, {
          y: 96,
          scale: 0.94,
          autoAlpha: 0,
          filter: 'blur(12px)',
        });

        gsap.set(images, {
          clipPath: 'inset(0 100% 0 0 round 24px)',
        });

        gsap.set(media, {
          scale: 1.12,
          xPercent: -3,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            once: true,
          },
        });

        if (heading) {
          timeline.to(heading, {
            x: 0,
            scaleX: 1,
            skewX: 0,
            autoAlpha: 1,
            duration: 1.25,
            ease: dramaticEase,
          });
        }

        timeline
          .to(secondaryText, {
            y: 0,
            autoAlpha: 1,
            duration: 0.82,
            stagger: 0.08,
            ease: smoothEase,
          }, heading ? '<0.2' : 0)
          .to(images, {
            clipPath: 'inset(0 0% 0 0 round 24px)',
            duration: 1.2,
            stagger: 0.08,
            ease: 'power4.inOut',
          }, '<0.08')
          .to(media, {
            scale: 1,
            xPercent: 0,
            duration: 1.35,
            stagger: 0.08,
            ease: smoothEase,
          }, '<')
          .to(cards, {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 1.05,
            stagger: 0.11,
            ease: smoothEase,
          }, '<0.14');
      });

      gsap.utils.toArray('.project-image-media').forEach((media) => {
        const card = media.closest('.project-card') || media;
        gsap.to(media, {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
          },
        });
      });
    });

    const refreshTriggers = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshTriggers, { once: true });

    return () => {
      window.removeEventListener('load', refreshTriggers);
      ctx.revert();
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);
}

function WorkMarquee() {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const groupWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const isVisibleRef = useRef(true);
  const dragRef = useRef({
    isDragging: false,
    lastClientX: 0,
    lastMoveTime: 0,
    totalDelta: 0,
    velocity: 0,
    suppressClick: false,
  });
  const inertiaRef = useRef(0);
  const marqueeItems = [heroMarqueeImages, heroMarqueeImages, heroMarqueeImages].flat();

  const normalizeOffset = () => {
    const groupWidth = groupWidthRef.current;
    if (!groupWidth) return;

    while (offsetRef.current <= groupWidth * -2) {
      offsetRef.current += groupWidth;
    }

    while (offsetRef.current > groupWidth * -1) {
      offsetRef.current -= groupWidth;
    }
  };

  const applyTrackTransform = () => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const autoSpeed = -0.032;
    const measureTrack = () => {
      const firstCard = track.children[0];
      const secondGroupFirstCard = track.children[heroMarqueeImages.length];
      if (!firstCard || !secondGroupFirstCard) return;

      const previousGroupWidth = groupWidthRef.current;
      const nextGroupWidth = secondGroupFirstCard.offsetLeft - firstCard.offsetLeft;
      if (!nextGroupWidth) return;

      groupWidthRef.current = nextGroupWidth;
      if (!previousGroupWidth) {
        offsetRef.current = -nextGroupWidth;
      } else if (previousGroupWidth !== nextGroupWidth) {
        const relativeOffset = (offsetRef.current + previousGroupWidth) / previousGroupWidth;
        offsetRef.current = -nextGroupWidth + relativeOffset * nextGroupWidth;
      }

      normalizeOffset();
      applyTrackTransform();
    };

    const resizeObserver = new ResizeObserver(measureTrack);
    resizeObserver.observe(track);
    window.addEventListener('resize', measureTrack);
    measureTrack();

    let animationFrame = 0;
    let loopRunning = false;
    let lastTimestamp = performance.now();
    const tick = (timestamp) => {
      if (!loopRunning) return;
      const deltaTime = Math.min(timestamp - lastTimestamp, 40);
      lastTimestamp = timestamp;

      if (!dragRef.current.isDragging && groupWidthRef.current) {
        offsetRef.current += (autoSpeed + inertiaRef.current) * deltaTime;
        inertiaRef.current *= Math.pow(0.92, deltaTime / 16.67);
        if (Math.abs(inertiaRef.current) < 0.004) {
          inertiaRef.current = 0;
        }
        normalizeOffset();
        applyTrackTransform();
      }

      animationFrame = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      loopRunning = false;
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const startLoop = () => {
      if (loopRunning || document.hidden || !isVisibleRef.current) return;
      loopRunning = true;
      lastTimestamp = performance.now();
      animationFrame = requestAnimationFrame(tick);
    };

    const updateLoopState = () => {
      if (document.hidden || !isVisibleRef.current) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    const marquee = track.parentElement ?? track;
    let intersectionObserver;
    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisibleRef.current = entry.isIntersecting;
          updateLoopState();
        },
        { rootMargin: '260px 0px' },
      );
      intersectionObserver.observe(marquee);
    }

    document.addEventListener('visibilitychange', updateLoopState);
    startLoop();

    return () => {
      stopLoop();
      intersectionObserver?.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', updateLoopState);
      window.removeEventListener('resize', measureTrack);
    };
  }, []);

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0 && event.buttons !== 1) return;
    try {
      event.currentTarget.setPointerCapture?.(event.pointerId);
    } catch {
      // Synthetic or interrupted pointer events can still use local drag state.
    }
    dragRef.current = {
      isDragging: true,
      lastClientX: event.clientX,
      lastMoveTime: performance.now(),
      totalDelta: 0,
      velocity: 0,
      suppressClick: false,
    };
    inertiaRef.current = 0;
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    const dragState = dragRef.current;
    if (!dragState.isDragging) return;

    const now = performance.now();
    const deltaX = event.clientX - dragState.lastClientX;
    const deltaTime = Math.max(now - dragState.lastMoveTime, 1);
    dragState.lastClientX = event.clientX;
    dragState.lastMoveTime = now;
    dragState.totalDelta += Math.abs(deltaX);
    dragState.velocity = deltaX / deltaTime;
    dragState.suppressClick = dragState.totalDelta > 6;

    offsetRef.current += deltaX;
    normalizeOffset();
    applyTrackTransform();
    event.preventDefault();
  };

  const endDrag = (event) => {
    const dragState = dragRef.current;
    if (!dragState.isDragging) return;

    dragState.isDragging = false;
    inertiaRef.current = Math.max(-1.1, Math.min(1.1, dragState.velocity));
    try {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    } catch {
      // The browser may release capture automatically on pointer cancel.
    }
    setIsDragging(false);
  };

  const handleClickCapture = (event) => {
    if (!dragRef.current.suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current.suppressClick = false;
  };

  return (
    <div
      className={`hero-work-marquee${isDragging ? ' is-dragging' : ''}`}
      aria-label="作品图片滚动展示，可拖拽横向浏览"
      onClickCapture={handleClickCapture}
      onPointerCancel={endDrag}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
    >
      <div className="hero-work-track" ref={trackRef}>
        {marqueeItems.map((item, index) => (
          <ProfileCard
            key={`hero-marquee-${index}`}
            avatarUrl={item.src}
            behindGlowColor={galleryThemes[item.tone]?.glow}
            behindGlowSize="44%"
            className={`hero-profile-card hero-profile-card-${item.tone}`}
            enableMobileTilt={false}
            enableTilt={false}
            handle="李奕锋"
            imageLoading="eager"
            innerGradient={`linear-gradient(145deg, ${galleryThemes[item.tone]?.base ?? '#101815'} 0%, rgba(255, 255, 255, 0.08) 100%)`}
            miniAvatarUrl={item.src}
            name=""
            status=""
            title=""
          />
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section-frame" id="top">
      <VideoBackdrop />
      <HeroAmbientMotion />
      <div className="hero-shade" />
      <div className="opening-mask" aria-hidden="true">
        <span className="opening-mask__panel" />
        <span className="opening-mask__panel" />
        <span className="opening-mask__line" />
      </div>
      <Header />
      <div className="hero-stage page-shell">
        <div className="hero-title-group">
          <p className="hero-kicker">求职意向：内容运营</p>
          <h1 className="hero-title" aria-label={`${profile.name} Portfolio`}>
            <span>{profile.name}</span>
            <span>PORTFOLIO</span>
          </h1>
          <p className="hero-lede">
            用内容策略、平台表达和数据复盘，让品牌内容更快、更准、更有辨识度。
          </p>
          <div className="hero-actions" aria-label="主要操作">
            <a className="primary-button" href="#projects">
              查看作品
            </a>
            <a className="ghost-button" href="#contact">
              联系我
            </a>
          </div>
        </div>
        <WorkMarquee />
      </div>
    </section>
  );
}

function DeferredAurora() {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const container = containerRef.current;
    let idleId = 0;
    let timeoutId = 0;
    let observer;
    let scheduled = false;

    const renderAurora = () => {
      setShouldRender(true);
    };

    const scheduleRender = () => {
      if (scheduled) return;
      scheduled = true;
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(renderAurora, { timeout: 1600 });
      } else {
        timeoutId = window.setTimeout(renderAurora, 700);
      }
    };

    if ('IntersectionObserver' in window && container) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          scheduleRender();
          observer?.disconnect();
        },
        { rootMargin: '720px 0px' },
      );
      observer.observe(container);
    } else {
      scheduleRender();
    }

    return () => {
      observer?.disconnect();
      if (idleId) {
        window.cancelIdleCallback?.(idleId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="content-aurora" ref={containerRef} aria-hidden="true">
      {shouldRender ? (
        <Suspense fallback={null}>
          <SoftAurora
            speed={0.42}
            scale={1.35}
            brightness={0.9}
            color1="#b9ff37"
            color2="#245dff"
            noiseFrequency={2.2}
            noiseAmplitude={0.92}
            bandHeight={0.44}
            bandSpread={1.14}
            octaveDecay={0.16}
            layerOffset={0.36}
            colorSpeed={0.7}
            enableMouseInteraction
            mouseInfluence={0.18}
          />
        </Suspense>
      ) : null}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function Experience() {
  return (
    <section className="profile-section section-pad" id="experience">
      <div className="page-shell experience-shell">
        <div className="experience-heading">
          <div>
            <h2>WORK EXPERIENCE <span>↘</span></h2>
            <p>个人经历</p>
          </div>
          <span className="experience-index">02 / EXPERIENCE</span>
        </div>

        <div className="experience-main">
          <ProfileCard
            avatarUrl={liYifengProfile}
            behindGlowColor="rgba(185, 255, 55, 0.5)"
            behindGlowSize="48%"
            className="experience-profile-card"
            contactText="联系我"
            enableMobileTilt={false}
            enableTilt
            handle="李奕锋"
            innerGradient="linear-gradient(145deg, rgba(14, 22, 18, 0.96) 0%, rgba(185, 255, 55, 0.16) 48%, rgba(5, 7, 8, 0.98) 100%)"
            miniAvatarUrl={liYifengProfile}
            name={profile.name}
            onContactClick={() => {
              window.location.href = `mailto:${profile.email}`;
            }}
            status="内容运营候选人"
            title="Content Operator"
          />

          <div className="experience-about">
            <p className="about-label">ABOUT ME</p>
            <h3>Hi, 我是 李奕锋 !</h3>
            <p className="about-copy">{profile.about}</p>

            <div className="about-facts">
              {profile.facts.map((fact) => (
                <div className="about-fact" key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>

            <div className="about-metrics">
              {profile.metrics.slice(0, 3).map((metric) => (
                <div className="about-metric" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            <div className="now-building">
              <span>NOW BUILDING</span>
              <div>
                {profile.building.map((item) => (
                  <b key={item}>{item}</b>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="career-path">
          <span className="career-label">CAREER PATH</span>
          <div className="career-line" />
          <div className="career-grid">
            {careerPath.map((item) => (
              <article className="career-item" key={`${item.period}-${item.company}`}>
                <span className="career-dot" />
                <time>{item.period}</time>
                <h3>{item.company}</h3>
                <b>{item.role}</b>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectVideoModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project?.video) return null;

  return (
    <div className="video-modal" role="dialog" aria-modal="true" aria-label={`${project.title}视频播放`} onClick={onClose}>
      <div className="video-modal-panel" onClick={(event) => event.stopPropagation()}>
        <button className="video-modal-close" type="button" onClick={onClose} aria-label="关闭视频">
          ×
        </button>
        <video className="project-modal-video" src={project.video} controls autoPlay playsInline />
        <div className="video-modal-caption">
          {project.type ? <span>{project.type}</span> : null}
          <strong>{project.title}</strong>
        </div>
      </div>
    </div>
  );
}

function ProjectPdfModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project?.pdf) return null;

  return (
    <div className="video-modal pdf-modal" role="dialog" aria-modal="true" aria-label={`${project.title} PDF展示`} onClick={onClose}>
      <div className="video-modal-panel pdf-modal-panel" onClick={(event) => event.stopPropagation()}>
        <button className="video-modal-close" type="button" onClick={onClose} aria-label="关闭PDF">
          ×
        </button>
        <iframe className="project-pdf-frame" src={`${project.pdf}#toolbar=1&navpanes=0`} title={`${project.title} PDF`} />
        <div className="video-modal-caption">
          {project.type ? <span>{project.type}</span> : null}
          <strong>{project.title}</strong>
          <a href={project.pdf} target="_blank" rel="noreferrer">
            新窗口打开
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectImage({ project }) {
  const imageSrc = projectImages[project.image];
  const videoSrc = project.video;
  const hasMedia = imageSrc || videoSrc;

  return (
    <div
      className={`project-image project-image-${project.tone}${hasMedia ? ' project-image-has-asset' : ''}${videoSrc ? ' project-image-video' : ''}`}
      aria-label={`${project.title}作品图片`}
    >
      {imageSrc ? (
        <>
          <img
            className="project-image-media"
            src={imageSrc}
            alt={`${project.title}作品图片`}
            loading="lazy"
            style={{
              objectFit: project.imageFit ?? 'cover',
              objectPosition: project.imagePosition ?? 'center',
            }}
          />
          {videoSrc ? (
            <span className="project-video-play" aria-hidden="true">
              <span />
              播放视频
            </span>
          ) : null}
        </>
      ) : videoSrc ? (
        <>
          <video
            className="project-image-media project-video-preview"
            src={`${videoSrc}#t=0.1`}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <span className="project-video-play" aria-hidden="true">
            <span />
            播放视频
          </span>
        </>
      ) : (
        <>
          <div className="image-topline">
            {project.type ? <span>{project.type}</span> : <span />}
            <span>Case Study</span>
          </div>
          <div className="image-figure">
            <span className="figure-bar" />
            <span className="figure-bar short" />
            <span className="figure-wave" />
          </div>
          <strong>{project.imageLabel}</strong>
        </>
      )}
    </div>
  );
}

function Projects() {
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  return (
    <section className="projects-section section-pad" id="projects">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Selected Work"
          title="精选项目"
        />
        <div className="project-grid">
          {projects.map((project, index) => {
            const theme = getGlowTheme(project.tone);
            const canOpenProject = Boolean(project.video || project.pdf);
            const projectDialogLabel = project.video ? `播放${project.title}视频` : `打开${project.title}PDF`;
            const interactiveCardProps = canOpenProject
              ? {
                  role: 'button',
                  tabIndex: 0,
                  'aria-label': projectDialogLabel,
                  onClick: () => setActiveProjectModal(project),
                  onKeyDown: (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setActiveProjectModal(project);
                    }
                  },
                }
              : {};

            return (
              <BorderGlow
                animated={index === 0}
                backgroundColor={theme.bg}
                borderRadius={26}
                className={`project-card project-card-${project.tone}${canOpenProject ? ' project-card-clickable' : ''}`}
                colors={theme.colors}
                coneSpread={24}
                edgeSensitivity={24}
                fillOpacity={0.24}
                glowColor={theme.hsl}
                glowIntensity={1.15}
                glowRadius={46}
                key={project.title}
                {...interactiveCardProps}
              >
                <ProjectImage project={project} />
                <div className="project-copy">
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="stat-row">
                    {project.stats.map((stat) => (
                      <b key={stat}>{stat}</b>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            );
          })}
        </div>
      </div>
      {activeProjectModal?.video ? (
        <ProjectVideoModal project={activeProjectModal} onClose={() => setActiveProjectModal(null)} />
      ) : null}
      {activeProjectModal?.pdf ? (
        <ProjectPdfModal project={activeProjectModal} onClose={() => setActiveProjectModal(null)} />
      ) : null}
    </section>
  );
}

function Strengths() {
  return (
    <section className="strength-section section-pad" id="strengths">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Strength"
          title="个人优势"
          description="围绕内容运营岗位的核心能力组织：从判断选题，到稳定交付，再到用数据反推策略。"
        />
        <div className="strength-grid">
          {strengths.map((item, index) => {
            const tone = glowToneOrder[index % glowToneOrder.length];
            const theme = getGlowTheme(tone);

            return (
              <BorderGlow
                animated={index === 0}
                backgroundColor={theme.bg}
                borderRadius={24}
                className={`strength-card strength-card-${tone}`}
                colors={theme.colors}
                coneSpread={26}
                edgeSensitivity={26}
                fillOpacity={0.2}
                glowColor={theme.hsl}
                glowIntensity={1}
                glowRadius={38}
                key={item.title}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </BorderGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="page-shell contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>期待把内容做成能被业务使用的增长资产</h2>
        </div>
        <BorderGlow
          animated
          backgroundColor={glowThemes.mint.bg}
          borderRadius={28}
          className="contact-card"
          colors={glowThemes.mint.colors}
          coneSpread={24}
          edgeSensitivity={24}
          fillOpacity={0.22}
          glowColor={glowThemes.mint.hsl}
          glowIntensity={1.1}
          glowRadius={48}
        >
          <p>如果你正在寻找内容运营、内容策划候选人，可以通过以下方式联系我。</p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
          <span>{profile.location}</span>
        </BorderGlow>
      </div>
    </section>
  );
}

export default function App() {
  usePortfolioMotion();

  return (
    <>
      <Hero />
      <main className="content-main">
        <DeferredAurora />
        <Experience />
        <Projects />
        <Strengths />
        <Contact />
      </main>
    </>
  );
}
