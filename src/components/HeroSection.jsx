import React, { useEffect, useRef, useState } from 'react'
import '../styles/hero.css'

export default function HeroSection() {
  const ref = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    // trigger hero text animation shortly after mount
    const t = setTimeout(() => setAnimate(true), 120)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    // Lazy-load the video when the section enters the viewport
    const el = ref.current
    if (!el) return
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            io.disconnect()
          }
        })
      }, { rootMargin: '200px' })
      io.observe(el)
      return () => io.disconnect()
    }
    // Fallback: load immediately (defer state update to avoid synchronous setState in effect)
    setTimeout(() => setShouldLoad(true), 0)
  }, [])

  return (
    <section
      ref={ref}
      style={{ position: 'relative', width: '100%', height: 500, overflow: 'hidden' }}
      aria-label="Hero section"
    >
      <video
        // the project's `public/hero.mp4` file is served at `/hero.mp4`
        src={shouldLoad ? 'https://res.cloudinary.com/drmcnkjkn/video/upload/v1764470002/6944249-hd_1920_1080_24fps_ieo906.mp4' : undefined}
        poster="/images/banner-poster.jpg"
        autoPlay={shouldLoad}
        muted
        loop
        playsInline
        preload={shouldLoad ? 'auto' : 'none'}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* Overlay (centered gradient + text + CTAs) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.45) 100%)',
        }}
      >
        <div style={{ color: '#fff', maxWidth: 920, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <div className={animate ? 'hero-fade delay-1' : 'hero-fade-init'} style={{ textTransform: 'uppercase', letterSpacing: 4, fontSize: '2.5rem', opacity: 0.95, fontWeight: 600 }}>
              WELCOME TO
            </div>

            <div className={animate ? 'hero-big-fade delay-1' : 'hero-fade-init'} style={{ fontSize: 120, lineHeight: 1, fontWeight: 800, marginTop: -8 }}>
              TOA
            </div>

            <div style={{ display: 'flex', gap: 14, marginTop: 18 }}>
              <button
                type="button"
                aria-label="Sign up"
                style={{
                  background: '#fff',
                  color: '#111',
                  padding: '10px 22px',
                  borderRadius: 9999,
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                  transition: 'transform 220ms cubic-bezier(.34,1.56,.64,1), opacity 160ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
              >
                Sign Up
              </button>

              <button
                type="button"
                aria-label="Log in"
                style={{
                  background: '#111',
                  color: '#fff',
                  padding: '10px 22px',
                  borderRadius: 9999,
                  border: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
                  transition: 'transform 220ms cubic-bezier(.34,1.56,.64,1), opacity 160ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}