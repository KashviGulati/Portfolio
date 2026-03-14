import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const links = ['about', 'skills', 'projects', 'experience', 'certificates', 'contact']

function MagneticLink({ href, children }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20 })
  const sy = useSpring(y, { stiffness: 300, damping: 20 })
  const ref = useRef(null)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width  / 2) * 0.35)
    y.set((e.clientY - r.top  - r.height / 2) * 0.35)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        x: sx, y: sy,
        fontSize: 11, color: 'var(--text-mid)',
        letterSpacing: '1.8px', textTransform: 'uppercase',
        position: 'relative', paddingBottom: 3, display: 'inline-block',
      }}
      whileHover={{ color: 'var(--coral)' }}
      transition={{ color: { duration: 0.2 } }}
    >
      {children}
      <motion.span
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 1, background: 'var(--coral)',
          transformOrigin: 'left', display: 'block',
        }}
      />
    </motion.a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.1rem 3.5rem',
        background: 'rgba(253,250,240,0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '0.5px solid var(--border)',
        boxShadow: scrolled ? '0 2px 24px rgba(141,207,200,0.14)' : 'none',
        transition: 'box-shadow 0.3s',
        gap: '1rem',
      }}
    >
      {/* Logo */}
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 22, color: 'var(--coral)', cursor: 'default', flexShrink: 0,
        }}
      >
        Kashvi
      </motion.span>

      {/* Nav links */}
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', flexWrap: 'wrap' }}>
        {links.map((s, i) => (
          <motion.li key={s}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.07, duration: 0.5 }}
          >
            <MagneticLink href={`#${s}`}>{s}</MagneticLink>
          </motion.li>
        ))}
      </ul>

      {/* Right side — Download CV + Hire Me */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{ display: 'flex', gap: '0.7rem', alignItems: 'center', flexShrink: 0 }}
      >
        {/* Download CV */}
        <motion.a
          href="/cv.pdf"
          download="Kashvi_Gulati_CV.pdf"
          whileHover={{
            scale: 1.05, y: -2,
            borderColor: 'var(--coral)',
            color: 'var(--coral)',
          }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'transparent',
            color: 'var(--text-mid)',
            border: '0.5px solid var(--border)',
            borderRadius: 24, padding: '8px 18px',
            fontSize: 11, letterSpacing: '1px',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif",
            display: 'inline-flex', alignItems: 'center', gap: 6,
            transition: 'color 0.2s, border-color 0.2s',
            cursor: 'pointer',
          }}
        >
          <motion.span
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
          CV
        </motion.a>

        {/* Hire Me */}
        <motion.a
          href="mailto:kashvigulati42@gmail.com"
          whileHover={{ scale: 1.07, boxShadow: '0 8px 24px rgba(244,133,138,0.35)', y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'var(--coral)', color: '#fff',
            borderRadius: 24, padding: '9px 22px',
            fontSize: 11, letterSpacing: '1.2px',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif",
            display: 'inline-block',
            cursor: 'pointer',
          }}
        >
          Hire Me
        </motion.a>
      </motion.div>
    </motion.nav>
  )
}
