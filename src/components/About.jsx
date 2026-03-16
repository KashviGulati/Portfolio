import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function useInViewOnce(ref, threshold = 0.15) {
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

const cards = [
  { icon: '🎓', title: 'B.Tech Computer Science & Engineering', sub: 'Lovely Professional University · CGPA 8.29' },
  { icon: '🏆', title: 'Google Cloud Agentic AI Day — Finalist', sub: 'Hackathon · Bangalore · Jul 2025' },
  { icon: '💼', title: 'Full Stack Developer Intern', sub: 'NetPy Technologies · Jun–Sep 2025' },
  { icon: '🤖', title: 'Advanced Data Science & Generative AI', sub: 'Certified · AlgoTutor Academy · Aug 2025' },
]

const lines = [
  <>I'm a Computer Science student at <strong style={{ color: 'var(--text-dark)', fontWeight: 500 }}>Lovely Professional University</strong> with a passion for building AI-powered systems that solve real problems.</>,
  <>When I'm not coding, I'm exploring ML architectures, competing in hackathons, or sharpening communication skills — recently placed <strong style={{ color: 'var(--text-dark)', fontWeight: 500 }}>2nd in a Group Discussion Competition</strong>.</>,
  <>Actively seeking opportunities to grow, contribute, and keep building things that matter.</>,
]

export default function About() {
  const sectionRef = useRef(null)
  const inView = useInViewOnce(sectionRef)
  const ease = [0.22, 1, 0.36, 1]

  return (
    <section id="about" ref={sectionRef} style={{ background: 'var(--ivory)', scrollMarginTop: 72 }}>
      <div style={{ padding: '5.5rem 3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

          {/* Left — text reveals line by line */}
          <div>
            {/* Label flips in */}
            <motion.p
              initial={{ rotateX: -90, opacity: 0 }}
              animate={inView ? { rotateX: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, ease }}
              style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '2.5px', color: 'var(--text-light)', marginBottom: '0.4rem', transformOrigin: 'bottom' }}
            >
              About me
            </motion.p>

            {/* Title — each word drops from above */}
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, color: 'var(--text-dark)', marginBottom: '2rem', lineHeight: 1.15, overflow: 'hidden' }}>
              {['Turning', 'ideas', 'into'].map((word, i) => (
                <motion.span key={word}
                  initial={{ y: 60, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease }}
                  style={{ display: 'inline-block', marginRight: '0.3em' }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {['intelligent', 'products'].map((word, i) => (
                <motion.span key={word}
                  initial={{ y: 60, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.34 + i * 0.08, ease }}
                  style={{ display: 'inline-block', marginRight: '0.3em', color: i === 0 ? 'var(--coral)' : 'var(--text-dark)', fontStyle: i === 0 ? 'italic' : 'normal' }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            {/* Paragraph lines slide in from left one by one */}
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ x: -40, opacity: 0, filter: 'blur(4px)' }}
                animate={inView ? { x: 0, opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease }}
                style={{ display: 'flex', gap: 12, marginBottom: '1.1rem', alignItems: 'flex-start' }}
              >
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.15, ease }}
                  style={{ width: 2, minHeight: 20, background: 'var(--mint)', borderRadius: 2, transformOrigin: 'top', flexShrink: 0, marginTop: 3 }}
                />
                <p style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.85 }}>{line}</p>
              </motion.div>
            ))}
          </div>

          {/* Right — cards fly in from right with stagger */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cards.map(({ icon, title, sub }, i) => (
              <motion.div key={title}
                initial={{ x: 60, opacity: 0, scale: 0.95 }}
                animate={inView ? { x: 0, opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease }}
                whileHover={{ x: 6, boxShadow: '0 8px 28px rgba(141,207,200,0.18)', borderColor: 'var(--mint)' }}
                style={{ background: '#fff', border: '0.5px solid var(--border)', borderRadius: 14, padding: '1.1rem 1.3rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', cursor: 'default', transition: 'border-color 0.2s, box-shadow 0.2s' }}
              >
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  animate={inView ? { rotate: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12, type: 'spring', stiffness: 260 }}
                  style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--mint-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}
                >
                  {icon}
                </motion.div>
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.12 }}
                    style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 3 }}
                  >
                    {title}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.42 + i * 0.12 }}
                    style={{ fontSize: 12, color: 'var(--text-light)' }}
                  >
                    {sub}
                  </motion.div>
                </div>
                {/* Animated side accent */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.38 + i * 0.12, ease }}
                  style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3, background: 'var(--mint)', borderRadius: '0 2px 2px 0', transformOrigin: 'top' }}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}