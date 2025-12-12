import React, { useEffect, useState } from 'react'
import '../styles/hero.css'
import CurvedLoop from './CurvedLoop'

export default function HeroSectionBooking() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // trigger hero text animation shortly after mount
    const t = setTimeout(() => setAnimate(true), 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      style={{ position: 'relative', width: '100%', height: window.innerWidth < 768 ? 300 : 500, overflow: 'hidden' }}
      aria-label="Hero section"
    >
      {/* Video loads immediately */}
      <video
        src="https://res.cloudinary.com/drmcnkjkn/video/upload/v1764764534/bookingvidtoa_wuv2co.mp4"
        poster="/images/banner-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
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

      {/* Overlay (centered gradient + text) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: window.innerWidth < 768 ? '10%' : '15%',
            textAlign: 'center',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.45) 100%)',
          }}
        >
        <div style={{ color: '#fff', width: '100%' }}>
         <CurvedLoop marqueeText="Meet ✦ Our ✦ Readers ✦ " speed={2} curveAmount={-180} direction="left" interactive={true} className="hero-curved-loop" />
          </div>
        </div>
    </section>  
  )
}
