import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function useInViewOnce(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return visible
}

const links = [
  { label: '✉ Email me', href: 'mailto:kashvigulati42@gmail.com', primary: true, detail: 'kashvigulati42@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kashvi-gulati/', primary: false, detail: 'linkedin.com/in/kashvi-gulati' },
  { label: 'GitHub', href: 'https://github.com/KashviGulati', primary: false, detail: 'github.com/KashviGulati' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInViewOnce(ref)
  const [hoveredLink, setHoveredLink] = useState(null)
  const ease = [0.22, 1, 0.36, 1]

  return (
    <section id="contact" ref={ref} style={{ background: 'var(--mint)', scrollMarginTop: 72 }}>
      <div style={{ padding: '6rem 3.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

        {/* Animated background blobs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: -60, right: -60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }}
        />

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.6)', marginBottom: '0.4rem' }}
        >
          Let's connect
        </motion.p>

        {/* Big title — each word from different direction */}
        <div style={{ marginBottom: '1rem', overflow: 'hidden' }}>
          {[
            { word: 'Get', from: { x: -60, opacity: 0 } },
            { word: 'in', from: { y: 40, opacity: 0 } },
            { word: 'Touch', from: { x: 60, opacity: 0 } },
          ].map(({ word, from }, i) => (
            <motion.span key={word}
              initial={from}
              animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.1, ease }}
              style={{
                display: 'inline-block', marginRight: '0.3em',
                fontFamily: "'DM Serif Display', serif",
                fontSize: 48, color: '#fff', lineHeight: 1.15,
                fontStyle: word === 'in' ? 'italic' : 'normal',
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', marginBottom: '3rem', lineHeight: 1.7 }}
        >
          Open to full-time roles, internships, freelance projects,<br />and interesting collaborations.
        </motion.p>

        {/* Link cards — staggered scale in */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {links.map(({ label, href, primary, detail }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1, type: 'spring', stiffness: 260 }}
              onMouseEnter={() => setHoveredLink(i)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <motion.a
                href={href} target={primary ? undefined : '_blank'} rel="noreferrer"
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 4, padding: '14px 28px',
                  background: primary ? '#fff' : 'rgba(255,255,255,0.15)',
                  color: primary ? 'var(--coral)' : '#fff',
                  border: primary ? 'none' : '0.5px solid rgba(255,255,255,0.35)',
                  borderRadius: 32,
                  fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                  transition: 'background 0.2s',
                  boxShadow: primary ? '0 8px 24px rgba(0,0,0,0.12)' : 'none',
                }}
              >
                {label}
                <motion.span
                  animate={{ opacity: hoveredLink === i ? 1 : 0, y: hoveredLink === i ? 0 : 4 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: 10, opacity: 0.7, letterSpacing: 0.3 }}
                >
                  {detail}
                </motion.span>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease }}
          style={{ height: 1, background: 'rgba(255,255,255,0.2)', maxWidth: 200, margin: '0 auto 1.5rem', transformOrigin: 'center' }}
        />

        {/* Phone */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}
        >
          +91 8307533390
        </motion.p>

      </div>
    </section>
  )
}