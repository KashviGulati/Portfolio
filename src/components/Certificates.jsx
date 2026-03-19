import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Reveal } from './Animations'

const certificates = [
  {
    title: 'Advanced Data Science & Generative AI',
    issuer: 'AlgoTutor Academy',
    date: 'Aug 2025',
    icon: '🤖',
    colorHex: '#F4858A',
    colorPale: '#FDE8E8',
    skills: ['Generative AI', 'Deep Learning', 'Data Science', 'LLMs', 'Neural Networks'],
    desc: 'Comprehensive program covering end-to-end data science workflows, generative AI architectures, and practical LLM applications.',
    link: '/certificates/training.pdf',
  },
  {
    title: 'The Bits and Bytes of Computer Networking',
    issuer: 'Google',
    date: 'Sep 2024',
    icon: '🌐',
    colorHex: '#8DCFC8',
    colorPale: '#E0F5F2',
    skills: ['Networking', 'TCP/IP', 'DNS', 'Protocols', 'Network Security'],
    desc: 'Google-certified course covering fundamentals of computer networking, protocols, and how the internet works at a technical level.',
    link: '/certificates/bits.pdf',
  },
  {
    title: 'Computational Theory: Language Principle & Finite Automata',
    issuer: 'Infosys Springboard',
    date: 'Aug 22, 2025',
    icon: '⚙️',
    colorHex: '#8DCFC8',
    colorPale: '#E0F5F2',
    skills: ['Computational Theory', 'Finite Automata', 'Language Principles', 'Theory of Computation'],
    desc: 'Course completion by Infosys Springboard covering Computational Theory including Language Principles and Finite Automata Theory.',
    link: '/certificates/automata.pdf',
  },
  {
    title: 'Peer-to-Peer Protocols and Local Area Networks',
    issuer: 'University of Colorado / Coursera',
    date: 'Oct 11, 2024',
    icon: '🔗',
    colorHex: '#F4858A',
    colorPale: '#FDE8E8',
    skills: ['P2P Protocols', 'LAN', 'Network Architecture', 'Coursera'],
    desc: 'University of Colorado certificate through Coursera covering peer-to-peer protocols and local area network architecture.',
    link: '/certificates/peer.pdf',
  },
  {
    title: 'HackVerse 2024 — Certificate of Participation',
    issuer: 'OASIS / Linux Socials, LPU',
    date: 'Mar 28–29, 2024',
    icon: '🏆',
    colorHex: '#F9AEAE',
    colorPale: '#FDE8E8',
    skills: ['Hackathon', 'Problem Solving', 'Coding', '24hr Challenge'],
    desc: 'Participated in HackVerse 2024, a 24-hour hackathon at LPU showcasing exceptional coding and problem-solving skills.',
    link: '/certificates/Kashvi.pdf',
  },
]

function useInViewOnce(ref, threshold = 0.1) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return visible
}

export default function Certificates() {
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)
  const sectionRef = useRef(null)
  const inView = useInViewOnce(sectionRef)
  const ease = [0.22, 1, 0.36, 1]

  useEffect(() => {
    document.body.style.overflow = active !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  return (
    <>
      <section
        id="certificates"
        ref={sectionRef}
        style={{ background: 'var(--ivory)', scrollMarginTop: 72, overflow: 'hidden' }}
      >
        <div style={{ padding: '5.5rem 3.5rem' }}>

          {/* Header */}
          <Reveal>
            <p style={{
              fontSize: 10, textTransform: 'uppercase', letterSpacing: '2.5px',
              color: 'var(--text-light)', marginBottom: '0.4rem',
            }}>
              Credentials
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 40, color: 'var(--text-dark)', lineHeight: 1.15,
              }}>
                Certificates &amp;{' '}
                <span style={{ color: 'var(--coral)', fontStyle: 'italic' }}>Badges</span>
              </h2>
              <p style={{ fontSize: 12, color: 'var(--text-light)' }}>
                Hover to preview · Click to open
              </p>
            </div>
          </Reveal>

          {/* ── ACCORDION ROWS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {certificates.map((cert, i) => {
              const isHovered = hovered === i
              const isActive  = active === i

              return (
                <motion.div
                  key={cert.title}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.09, ease }}
                  style={{
                    borderTop: '0.5px solid var(--border)',
                    borderBottom: i === certificates.length - 1 ? '0.5px solid var(--border)' : 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Expanding color bg on hover */}
                  <motion.div
                    animate={{
                      scaleX: isHovered ? 1 : 0,
                      opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: `${cert.colorHex}0c`,
                      transformOrigin: 'left', zIndex: 0,
                    }}
                  />

                  {/* Left bar slides down */}
                  <motion.div
                    animate={{ scaleY: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.35, ease }}
                    style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: 3, background: cert.colorHex,
                      transformOrigin: 'top', zIndex: 2,
                    }}
                  />

                  {/* Row content */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    padding: '1.6rem 1.5rem 1.6rem 2rem',
                    gap: '2rem', position: 'relative', zIndex: 1,
                  }}>

                    {/* Number */}
                    <motion.span
                      animate={{
                        color: isHovered ? cert.colorHex : 'var(--text-light)',
                        scale: isHovered ? 1.1 : 1,
                      }}
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: 22, minWidth: 36, flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.span>

                    {/* Icon */}
                    <motion.div
                      animate={{
                        background: isHovered ? cert.colorHex : cert.colorPale,
                        rotate: isHovered ? [0, -8, 8, 0] : 0,
                        scale: isHovered ? 1.15 : 1,
                      }}
                      transition={{ duration: 0.35 }}
                      style={{
                        width: 44, height: 44, borderRadius: 12,
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: 20, flexShrink: 0,
                      }}
                    >
                      {cert.icon}
                    </motion.div>

                    {/* Title + issuer */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <motion.p
                        animate={{ color: isHovered ? 'var(--text-dark)' : 'var(--text-mid)', x: isHovered ? 6 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          fontFamily: "'DM Serif Display', serif",
                          fontSize: 18, lineHeight: 1.3, marginBottom: 3,
                          fontWeight: isHovered ? 500 : 400,
                        }}
                      >
                        {cert.title}
                      </motion.p>
                      <motion.p
                        animate={{ x: isHovered ? 6 : 0, opacity: isHovered ? 1 : 0.7 }}
                        style={{ fontSize: 12, color: 'var(--text-light)' }}
                      >
                        {cert.issuer} &nbsp;·&nbsp; {cert.date}
                      </motion.p>
                    </div>

                    {/* Tags — slide in on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3, ease }}
                          style={{ display: 'flex', flexWrap: 'wrap', gap: 5, maxWidth: 240, justifyContent: 'flex-end' }}
                        >
                          {cert.skills.slice(0, 3).map((s, si) => (
                            <motion.span
                              key={s}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: si * 0.05, type: 'spring', stiffness: 280 }}
                              style={{
                                fontSize: 10, padding: '3px 10px', borderRadius: 10,
                                background: cert.colorPale, color: 'var(--text-mid)',
                                border: `0.5px solid ${cert.colorHex}40`,
                              }}
                            >
                              {s}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Arrow */}
                    <motion.div
                      animate={{
                        x: isHovered ? 0 : -8,
                        opacity: isHovered ? 1 : 0,
                        color: cert.colorHex,
                      }}
                      style={{ fontSize: 22, flexShrink: 0 }}
                    >
                      →
                    </motion.div>
                  </div>

                  {/* Expanded desc — accordion */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          padding: '0 2rem 1.4rem 6.5rem',
                          display: 'flex', alignItems: 'flex-end',
                          justifyContent: 'space-between', gap: '2rem',
                        }}>
                          <p style={{ fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.75, maxWidth: 520 }}>
                            {cert.desc}
                          </p>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{
                              fontSize: 11, color: cert.colorHex,
                              fontWeight: 500, whiteSpace: 'nowrap',
                            }}
                          >
                            Click to view full cert →
                          </motion.span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── FULL SCREEN MODAL ── */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(45,74,71,0.45)',
              backdropFilter: 'blur(14px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
          >
            {(() => {
              const cert = certificates[active]
              return (
                <motion.div
                  initial={{ scale: 0.75, opacity: 0, y: 80, rotateX: -12 }}
                  animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 40 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  onClick={e => e.stopPropagation()}
                  style={{
                    background: '#fff', borderRadius: 28,
                    maxWidth: 600, width: '100%',
                    overflow: 'hidden', position: 'relative',
                    boxShadow: `0 48px 120px ${cert.colorHex}45`,
                  }}
                >
                  {/* Curtain wipe reveal */}
                  <motion.div
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: cert.colorHex,
                      transformOrigin: 'right', zIndex: 10,
                    }}
                  />

                  {/* Floating particles */}
                  {[...Array(10)].map((_, pi) => (
                    <motion.div key={pi}
                      initial={{ opacity: 0, x: Math.random() * 600, y: Math.random() * 400, scale: 0 }}
                      animate={{ opacity: [0, 0.35, 0], scale: [0, 1, 0], y: Math.random() * 400 - 50 }}
                      transition={{ duration: 2.5 + Math.random() * 2, delay: 0.3 + Math.random() * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute', left: 0, top: 0,
                        width: 5 + Math.random() * 7, height: 5 + Math.random() * 7,
                        borderRadius: '50%', background: cert.colorHex,
                        pointerEvents: 'none', zIndex: 0,
                      }}
                    />
                  ))}

                  {/* Top color stripe */}
                  <div style={{ height: 6, background: cert.colorHex, position: 'relative', zIndex: 1 }} />

                  <div style={{ padding: '2.2rem 2.5rem', position: 'relative', zIndex: 1 }}>

                    {/* Close */}
                    <motion.button
                      onClick={() => setActive(null)}
                      whileHover={{ scale: 1.15, rotate: 90, color: cert.colorHex }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute', top: '1.2rem', right: '1.5rem',
                        background: 'transparent', border: 'none',
                        fontSize: 20, color: 'var(--text-light)', cursor: 'pointer',
                      }}
                    >✕</motion.button>

                    {/* Icon + meta */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.35 }}
                      style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: '1.6rem' }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 200 }}
                        style={{
                          width: 54, height: 54, borderRadius: 15,
                          background: cert.colorPale, fontSize: 26,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: `0 4px 20px ${cert.colorHex}30`,
                        }}
                      >
                        {cert.icon}
                      </motion.div>
                      <div>
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 }}
                          style={{ fontSize: 13, color: cert.colorHex, fontWeight: 600, marginBottom: 2 }}
                        >
                          {cert.issuer}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          style={{ fontSize: 11, color: 'var(--text-light)' }}
                        >
                          {cert.date}
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.55, delay: 0.38, ease: [0.22,1,0.36,1] }}
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: 26, color: 'var(--text-dark)',
                        lineHeight: 1.25, marginBottom: '0.8rem',
                      }}
                    >
                      {cert.title}
                    </motion.h2>

                    {/* Animated underline */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.55, delay: 0.5, ease: [0.22,1,0.36,1] }}
                      style={{ height: 2, background: cert.colorHex, borderRadius: 2, transformOrigin: 'left', marginBottom: '1.2rem' }}
                    />

                    {/* Desc */}
                    <motion.p
                      initial={{ opacity: 0, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.55, delay: 0.48 }}
                      style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '1.5rem' }}
                    >
                      {cert.desc}
                    </motion.p>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: '2rem' }}>
                      {cert.skills.map((s, si) => (
                        <motion.span key={s}
                          initial={{ opacity: 0, scale: 0.6, y: 12 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: 0.55 + si * 0.07, type: 'spring', stiffness: 280 }}
                          whileHover={{ scale: 1.1, y: -3 }}
                          style={{
                            fontSize: 12, padding: '5px 14px', borderRadius: 12,
                            background: cert.colorPale, color: 'var(--text-mid)',
                            border: `0.5px solid ${cert.colorHex}35`, cursor: 'default',
                          }}
                        >
                          {s}
                        </motion.span>
                      ))}
                    </div>

                    {/* CTA row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <motion.a
                        href={cert.link} target="_blank" rel="noreferrer"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                        whileHover={{ scale: 1.04, y: -3, boxShadow: `0 12px 32px ${cert.colorHex}45` }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 8,
                          background: cert.colorHex, color: '#fff',
                          padding: '12px 26px', borderRadius: 30,
                          fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                        }}
                      >
                        View Certificate
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
                      </motion.a>

                      {/* Nav between certs */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.75 }}
                        style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}
                      >
                        <motion.button
                          onClick={e => { e.stopPropagation(); setActive(a => (a - 1 + certificates.length) % certificates.length) }}
                          whileHover={{ scale: 1.1, background: cert.colorPale, borderColor: cert.colorHex }}
                          style={{ width: 36, height: 36, borderRadius: '50%', border: '0.5px solid var(--border)', background: '#fff', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                        >←</motion.button>
                        <motion.button
                          onClick={e => { e.stopPropagation(); setActive(a => (a + 1) % certificates.length) }}
                          whileHover={{ scale: 1.1, background: cert.colorHex, color: '#fff', borderColor: cert.colorHex }}
                          style={{ width: 36, height: 36, borderRadius: '50%', border: '0.5px solid var(--border)', background: '#fff', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                        >→</motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}