import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const ease = [0.22, 1, 0.36, 1]

// ── Count up ──
function CountUp({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const isFloat = String(target).includes('.')
    const start = performance.now()
    const duration = 1800
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(
        isFloat
          ? parseFloat((eased * target).toFixed(2))
          : Math.floor(eased * target)
      )
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [visible, target])

  return <span ref={ref}>{val}{suffix}</span>
}

// ── Text scramble ──
function ScrambleText({ text, delay = 0 }) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const [display, setDisplay] = useState(() => text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''))
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let frame = 0
    const total = 20
    const id = setInterval(() => {
      frame++
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (frame > (i / text.length) * total) return char
          return chars[Math.floor(Math.random() * chars.length)]
        }).join('')
      )
      if (frame >= total) clearInterval(id)
    }, 45)
    return () => clearInterval(id)
  }, [started, text])

  return <>{display}</>
}

// ── Floating particles ──
function Particles() {
  const [particles] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
      color: i % 3 === 0 ? '#F4858A' : i % 3 === 1 ? '#8DCFC8' : '#F9AEAE',
      moveX: Math.random() * 20 - 10,
    }))
  )

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            opacity: 0.35,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, p.moveX, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ── Morphing blob ──
function Blob() {
  return (
    <motion.div
      animate={{
        borderRadius: [
          '62% 38% 46% 54% / 55% 48% 52% 45%',
          '50% 50% 34% 66% / 56% 68% 32% 44%',
          '36% 64% 57% 43% / 47% 29% 71% 53%',
          '62% 38% 46% 54% / 55% 48% 52% 45%',
        ],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: 280, height: 280,
        background: 'var(--blush)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <motion.div
      animate={{ y: [0, -14, 0], rotate: [0, 3, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: 210, height: 210, borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid #fff',
        boxShadow: '0 8px 32px rgba(141,207,200,0.3)',
      }}
    >
      <img
        src="/photo.png"
        alt="Kashvi Gulati"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
      />
    </motion.div>

    </motion.div>
  )
}

// ── Float chip ──
function Chip({ children, style, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale:   { delay, duration: 0.5, ease },
        y:       { delay, duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
      whileHover={{ scale: 1.08, boxShadow: '0 6px 20px rgba(141,207,200,0.25)' }}
      style={{
        position: 'absolute',
        background: '#fff',
        border: '0.5px solid var(--border)',
        borderRadius: 12,
        padding: '8px 16px',
        fontSize: 11,
        color: 'var(--text-mid)',
        display: 'flex', alignItems: 'center', gap: 7,
        whiteSpace: 'nowrap',
        cursor: 'default',
        ...style,
      }}
    >
      <motion.span
        animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--coral)', flexShrink: 0,
        }}
      />
      {children}
    </motion.div>
  )
}

export default function Hero() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', paddingTop: 72 }}>

      {/* ── LEFT ── */}
      <div style={{ padding: '5rem 3.5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* Eyebrow with pulsing dot */}
        <motion.span
          initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 10, letterSpacing: 2, textTransform: 'uppercase',
            color: 'var(--mint)', border: '0.5px solid var(--mint)',
            padding: '5px 15px', borderRadius: 20,
            marginBottom: '2rem', width: 'fit-content',
          }}
        >
          {/* Pulsing dot */}
          <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.span
              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: 10, height: 10, borderRadius: '50%',
                background: 'var(--mint)', display: 'block',
              }}
            />
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--mint)', display: 'block', position: 'relative' }} />
          </span>
          Full Stack Developer &amp; AI Engineer
        </motion.span>

        {/* Word-by-word heading with clip reveal */}
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 68, lineHeight: 1.04,
          color: 'var(--text-dark)', marginBottom: '1.4rem',
        }}>
          {/* Line 1 */}
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
            >
              Hi, I'm
            </motion.div>
          </div>

          {/* Line 2 — scramble effect */}
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.48, ease }}
            >
              <em style={{ fontStyle: 'italic', color: 'var(--coral)' }}>
                <ScrambleText text="Kashvi" delay={0.9} />
              </em>
            </motion.div>
          </div>

          {/* Line 3 */}
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.61, ease }}
            >
              Gulati.
            </motion.div>
          </div>
        </h1>

        {/* Subtitle with blur-in */}
        <motion.p
          initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.85 }}
          style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.8, maxWidth: 420, marginBottom: '2.5rem' }}
        >
          Building intelligent systems — from local RAG pipelines to real-time AI platforms. Google Cloud Finalist. B.Tech CSE @ LPU.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -3, boxShadow: '0 12px 32px rgba(244,133,138,0.35)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'var(--coral)', color: '#fff',
              padding: '13px 30px', borderRadius: 32, fontSize: 13,
              fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >
            View Projects
            {/* Bouncing arrow */}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.a>

          <motion.a
            href="mailto:kashvigulati42@gmail.com"
            whileHover={{ scale: 1.05, y: -3, borderColor: 'var(--coral)', color: 'var(--coral)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'transparent', color: 'var(--text-mid)',
              border: '0.5px solid var(--border)',
              padding: '13px 30px', borderRadius: 32, fontSize: 13,
              fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Count-up stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          style={{ display: 'flex', gap: '2.5rem' }}
        >
          {[
            { target: 3,    suffix: '+', label: 'AI Projects'  },
            { target: 8.29, suffix: '',  label: 'CGPA'         },
            { target: 1,    suffix: '',  label: 'Internship'   },
            { target: 5,    suffix: '+', label: 'Frameworks'   },
          ].map(({ target, suffix, label }) => (
            <motion.div
              key={label}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <span style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 30, color: 'var(--coral)', display: 'block',
              }}>
                <CountUp target={target} suffix={suffix} />
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT ── */}
      <div style={{
        background: '#E8F7F5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <Particles />

        {/* BG circles */}
        <div style={{ position:'absolute', top:-80, right:-80, width:350, height:350, borderRadius:'50%', background:'var(--mint-light)', opacity:0.25, pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-50, left:-50, width:250, height:250, borderRadius:'50%', background:'var(--blush)', opacity:0.2, pointerEvents:'none' }} />

        {/* Rotating dashed orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', width: 340, height: 340,
            borderRadius: '50%', border: '1.5px dashed var(--mint-light)',
            zIndex: 1, pointerEvents: 'none',
          }}
        />

        {/* Blob */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <Blob />
        </motion.div>

        <Chip style={{ top: '16%', left: '4%' }}  delay={1.1}>React · Flask · PyTorch</Chip>
        <Chip style={{ bottom: '20%', right: '3%' }} delay={1.3}>Google Cloud Finalist</Chip>
        <Chip style={{ top: '60%', left: '3%' }}  delay={1.5}>CGPA 8.29</Chip>
      </div>

    </div>
  )
}