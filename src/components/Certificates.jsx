import { motion } from 'framer-motion'
import { Reveal } from './Animations'
import { useState, useEffect, useRef } from 'react'

const certificates = [
  {
    title: 'Advanced Data Science & Generative AI',
    issuer: 'AlgoTutor Academy',
    date: 'Aug 2025',
    icon: '🤖',
    color: 'var(--coral)',
    colorPale: 'var(--blush-pale)',
    skills: ['Generative AI', 'Deep Learning', 'Data Science', 'LLMs', 'Neural Networks'],
    desc: 'Comprehensive program covering end-to-end data science workflows, generative AI architectures, and practical LLM applications.',
    link: '/certificates/training.pdf',
  },
  {
    title: 'The Bits and Bytes of Computer Networking',
    issuer: 'Google',
    date: 'Sep 2024',
    icon: '🌐',
    color: 'var(--mint)',
    colorPale: 'var(--mint-pale)',
    skills: ['Networking', 'TCP/IP', 'DNS', 'Protocols', 'Network Security'],
    desc: 'Google-certified course covering fundamentals of computer networking, protocols, and how the internet works at a technical level.',
    link: '/certificates/bits.pdf',
  },
  {
    title: 'Computational Theory: Language Principle & Finite Automata',
    issuer: 'Infosys Springboard',
    date: 'Aug 22, 2025',
    icon: '⚙️',
    color: 'var(--mint)',
    colorPale: 'var(--mint-pale)',
    skills: ['Computational Theory', 'Finite Automata', 'Language Principles', 'Theory of Computation'],
    desc: 'Course completion certificate by Infosys Springboard for successfully completing Computational Theory including Language Principles and Finite Automata Theory.',
    link: '/certificates/automata.pdf',
  },
  {
    title: 'Peer-to-Peer Protocols and Local Area Networks',
    issuer: 'University of Colorado / Coursera',
    date: 'Oct 11, 2024',
    icon: '🔗',
    color: 'var(--coral)',
    colorPale: 'var(--blush-pale)',
    skills: ['P2P Protocols', 'LAN', 'Network Architecture', 'Coursera'],
    desc: 'Course certificate from the University of Colorado System authorized through Coursera, covering peer-to-peer protocols and local area network architecture.',
    link: '/certificates/peer.pdf',
  },
  {
    title: 'HackVerse 2024 — Certificate of Participation',
    issuer: 'OASIS / Linux Socials, LPU',
    date: 'Mar 28–29, 2024',
    icon: '🏆',
    color: 'var(--blush)',
    colorPale: 'var(--blush-pale)',
    skills: ['Hackathon', 'Problem Solving', 'Coding', '24hr Challenge'],
    desc: 'Participated in HackVerse 2024, a 24-hour hackathon organized by OASIS under the Student Welfare Wing at LPU, showcasing exceptional coding and problem-solving skills.',
    link: '/certificates/Kashvi.pdf',
  },
]

function useInViewOnce(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return visible
}

// each card gets a unique entrance animation


function CertCard({ cert, index, colDelay }) {
  const ref = useRef(null)
  const inView = useInViewOnce(ref)

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.65, delay: colDelay * 0.13, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(141,207,200,0.22)', borderColor: cert.color }}
          transition={{ duration: 0.25 }}
          style={{
            background: '#fff',
            border: '0.5px solid var(--border)',
            borderRadius: 20,
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'default',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* Accent bar draws left to right */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: colDelay * 0.13 + 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: cert.color, transformOrigin: 'left' }}
          />

          {/* Watermark */}
          <div style={{ position: 'absolute', bottom: -10, right: -10, fontSize: 90, opacity: 0.04, pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>
            {cert.icon}
          </div>

          {/* Icon spins in */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: colDelay * 0.13 + 0.25, type: 'spring', stiffness: 220, damping: 18 }}
            style={{ width: 48, height: 48, borderRadius: 13, background: cert.colorPale, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: '1rem' }}
          >
            {cert.icon}
          </motion.div>

          {/* Title slides up */}
          <motion.h3
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: colDelay * 0.13 + 0.32 }}
            style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: 'var(--text-dark)', marginBottom: '0.5rem', lineHeight: 1.3 }}
          >
            {cert.title}
          </motion.h3>

          {/* Issuer + date fades in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: colDelay * 0.13 + 0.38 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.8rem', flexWrap: 'wrap' }}
          >
            <span style={{ fontSize: 12, color: cert.color, fontWeight: 500 }}>{cert.issuer}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border)', display: 'inline-block' }} />
            <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{cert.date}</span>
          </motion.div>

          {/* Description blurs in */}
          <motion.p
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.6, delay: colDelay * 0.13 + 0.42 }}
            style={{ fontSize: 12.5, color: 'var(--text-mid)', lineHeight: 1.65, marginBottom: '1.2rem' }}
          >
            {cert.desc}
          </motion.p>

          {/* Divider draws */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: colDelay * 0.13 + 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: '0.5px', background: 'var(--border)', marginBottom: '1rem', transformOrigin: 'left' }}
          />

          {/* Tags pop in one by one */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.5rem', flex: 1 }}>
            {cert.skills.map((s, si) => (
              <motion.span key={s}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: colDelay * 0.13 + 0.5 + si * 0.06, type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.1, y: -2 }}
                style={{ fontSize: 11, padding: '4px 11px', borderRadius: 12, background: cert.colorPale, color: 'var(--text-mid)', border: `0.5px solid ${cert.color}40`, cursor: 'default' }}
              >
                {s}
              </motion.span>
            ))}
          </div>

          {/* Bottom row slides up */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: colDelay * 0.13 + 0.65 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 18, height: 18, borderRadius: '50%', background: cert.colorPale, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--text-mid)' }}
              >
                ✓
              </motion.div>
              <span style={{ fontSize: 11, color: 'var(--text-light)' }}>Verified</span>
            </div>
            <motion.a
              href={cert.link} target="_blank" rel="noreferrer"
              whileHover={{ x: 4 }}
              onMouseEnter={e => e.currentTarget.style.color = cert.color}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-light)'}
              style={{ fontSize: 12, color: 'var(--text-light)', display: 'inline-flex', alignItems: 'center', gap: 5, cursor: 'pointer', transition: 'color 0.2s' }}
            >
              View Certificate
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>→</motion.span>
            </motion.a>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Certificates() {
  const row1 = certificates.slice(0, 3)
  const row2 = certificates.slice(3)

  return (
    <section id="certificates" style={{ background: 'var(--mint-pale)', scrollMarginTop: 72 }}>
      <div style={{ padding: '5.5rem 3.5rem' }}>

        <Reveal>
          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '2.5px', color: 'var(--text-light)', marginBottom: '0.4rem' }}>
            Credentials
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, color: 'var(--text-dark)', marginBottom: '2.8rem', lineHeight: 1.15 }}>
            Certificates &amp; <span style={{ color: 'var(--coral)' }}>Badges</span>
          </h2>
        </Reveal>

        {/* Row 1 — 3 cards, fly in from left / bottom / right */}
        <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1.5rem",
      }}
    >
      {certificates.map((cert, i) => (
        <div
          key={cert.title}
          style={
            i >= 3
              ? {
                  gridColumn: i === 3 ? "1 / span 1" : "2 / span 1",
                  justifySelf: "center",
                  width: "100%",
                  maxWidth: "100%",
                }
              : {}
          }
        >
          <CertCard cert={cert} index={i} colDelay={i % 3} />
        </div>
      ))}
    </div>

        {/* Row 2 — 2 cards perfectly centered */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
        }}>
          {row2.map((cert, i) => (
            <div key={cert.title} style={{ width: 'calc(33.333% - 0.75rem)' }}>
              <CertCard cert={cert} index={i + 3} colDelay={i} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}