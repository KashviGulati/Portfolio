import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Reveal } from './Animations'

const projects = [
  {
    num: '01', year: 'Jan 2026', accentColor: '#8DCFC8',
    title: 'CodeScope AI',
    category: 'AI · RAG · Dev Tools',
    desc: 'Fully local RAG-based code intelligence. Semantically analyzes large multi-language codebases and answers natural-language queries with file- and line-level source attribution.',
    tags: ['Python', 'CodeBERT', 'FAISS', 'RAG', 'AST Parsing'],
    link: 'https://github.com/KashviGulati',
    stat1: { val: '100%', label: 'Local' },
    stat2: { val: 'Multi', label: 'Language' },
  },
  {
    num: '02', year: 'Sep 2025', accentColor: '#F9AEAE',
    title: 'AirSentinel AI',
    category: 'AI · Data · Flask',
    desc: 'Full-stack AQI monitoring platform with real-time ingestion, 24-step Transformer-based forecasting, and dual anomaly detection using Isolation Forest and Z-score.',
    tags: ['PyTorch', 'XGBoost', 'Flask', 'Scikit-learn', 'REST APIs'],
    link: 'https://github.com/KashviGulati',
    stat1: { val: '24', label: 'Step Forecast' },
    stat2: { val: '5', label: 'ML Models' },
  },
  {
    num: '03', year: 'Nov 2025', accentColor: '#F4858A',
    title: 'InterviewPrep',
    category: 'React · AI · SaaS',
    desc: 'Cross-platform AI communication practice platform with 90%+ speech-to-text accuracy, personalized feedback on filler words and pacing.',
    tags: ['React', 'Vite', 'AssemblyAI', 'Gemini API', 'Supabase'],
    link: 'https://github.com/KashviGulati',
    stat1: { val: '90%+', label: 'Accuracy' },
    stat2: { val: 'Real-time', label: 'Feedback' },
  },
  {
    num: '04', year: 'Mar 2026', accentColor: '#8DCFC8',
    title: 'Data Engineering Pipeline',
    category: 'Python · AWS · Airflow',
    desc: 'Scalable ETL pipeline to ingest multi-source datasets into a centralized PostgreSQL analytics database with AWS S3 and Apache Airflow orchestration.',
    tags: ['Python', 'SQL', 'PostgreSQL', 'AWS S3', 'Apache Airflow'],
    link: 'https://github.com/KashviGulati',
    stat1: { val: 'ETL', label: 'Pipeline' },
    stat2: { val: 'AWS', label: 'S3 Cloud' },
  },
  {
    num: '05', year: '2026', accentColor: '#F4858A',
    title: 'RAG-Driven AI Agent',
    category: 'FastAPI · LLM · GANs',
    desc: 'RAG-based AI agent achieving 20–30% faster semantic document retrieval with EDA automation, ML model training, and GAN-based data visualization.',
    tags: ['Python', 'FastAPI', 'ChromaDB', 'Gemini API', 'GANs'],
    link: 'https://github.com/KashviGulati',
    stat1: { val: '30%', label: 'Faster' },
    stat2: { val: '40%', label: 'Better Insights' },
  },
]

const scattered = [
  { x: -300, y: -60,  rotate: -11, scale: 0.78 },
  { x: -150, y:  70,  rotate:   8, scale: 0.75 },
  { x:    0, y: -40,  rotate:  -3, scale: 0.80 },
  { x:  155, y:  65,  rotate:   9, scale: 0.76 },
  { x:  295, y: -55,  rotate:  -9, scale: 0.79 },
]

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

export default function Projects() {
  const sectionRef = useRef(null)
  const inView = useInViewOnce(sectionRef)
  const [active, setActive] = useState(null)
  const [dispersed, setDispersed] = useState(false)
  const ease = [0.22, 1, 0.36, 1]

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setDispersed(true), 500)
    return () => clearTimeout(t)
  }, [inView])

  const goNext = () => setActive(i => i === null ? 0 : (i + 1) % projects.length)
  const goPrev = () => setActive(i => i === null ? projects.length - 1 : (i - 1 + projects.length) % projects.length)

  const getAnimate = (i) => {
    const pos = scattered[i]
    const isActive = active === i
    const isOther = active !== null && !isActive
    if (!inView || !dispersed) return { x: 0, y: 0, rotate: 0, scale: 0, opacity: 0 }
    if (isActive)  return { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
    if (isOther)   return { x: pos.x * 1.6, y: pos.y * 1.6, rotate: pos.rotate * 2, scale: pos.scale * 0.7, opacity: 0.25 }
    return { x: pos.x, y: pos.y, rotate: pos.rotate, scale: pos.scale, opacity: 1 }
  }

  return (
    <section id="projects" ref={sectionRef} style={{ background: 'var(--ivory)', scrollMarginTop: 72 }}>
      <div style={{ padding: '4rem 3.5rem 3rem' }}>

        {/* Header */}
        <Reveal>
          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '2.5px', color: 'var(--text-light)', marginBottom: '0.3rem' }}>
            Selected work
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: 'var(--text-dark)', lineHeight: 1.15 }}>
              Featured <span style={{ color: 'var(--coral)' }}>Projects</span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 13, color: 'var(--text-light)' }}>
                {active !== null
                  ? `${String(active + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`
                  : `— / ${String(projects.length).padStart(2, '0')}`}
              </span>
              <AnimatePresence>
                {active !== null && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setActive(null)}
                    whileHover={{ borderColor: 'var(--coral)', color: 'var(--coral)' }}
                    style={{ borderRadius: 20, padding: '7px 14px', border: '0.5px solid var(--border)', background: '#fff', color: 'var(--text-mid)', fontSize: 11, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", transition: 'all 0.2s' }}
                  >
                    ✕ Close
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <p style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: '1rem', minHeight: 18 }}>
            {active === null ? 'Click a card or use arrows to explore' : `${projects[active].category} · ${projects[active].year}`}
          </p>

          {/* Dot nav */}
          <div style={{ display: 'flex', gap: 6, marginBottom: '1rem' }}>
            {projects.map((p, i) => (
              <motion.div key={i}
                onClick={() => setActive(active === i ? null : i)}
                animate={{ width: active === i ? 24 : 8, background: active === i ? p.accentColor : 'var(--border)' }}
                transition={{ duration: 0.3 }}
                style={{ height: 8, borderRadius: 4, cursor: 'pointer' }}
              />
            ))}
          </div>
        </Reveal>

        {/* Arena + side arrows */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem' }}>

          {/* LEFT ARROW */}
          <motion.button
            onClick={goPrev}
            whileHover={{ scale: 1.12, background: 'var(--mint-pale)', borderColor: 'var(--mint)' }}
            whileTap={{ scale: 0.93 }}
            animate={{ opacity: dispersed ? 1 : 0 }}
            style={{
              flexShrink: 0, width: 44, height: 44, borderRadius: '50%',
              border: '0.5px solid var(--border)', background: '#fff',
              color: 'var(--text-mid)', fontSize: 16, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 30, transition: 'all 0.2s',
            }}
          >←</motion.button>

          {/* Card arena */}
          <div style={{
            position: 'relative', flex: 1, height: 420,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>

            {/* Stacked deck hint */}
            <AnimatePresence>
              {inView && !dispersed && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ position: 'absolute', zIndex: 30, pointerEvents: 'none' }}
                >
                  {[2, 1, 0].map(offset => (
                    <motion.div key={offset}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: offset * -5, opacity: 1 - offset * 0.25 }}
                      transition={{ duration: 0.35, delay: offset * 0.07 }}
                      style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: `translate(-50%, -50%) rotate(${offset * 3 - 3}deg)`,
                        width: 260, height: 160,
                        background: '#fff', border: '0.5px solid var(--border)',
                        borderRadius: 18, boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cards */}
            {projects.map((p, i) => {
              const isActive = active === i
              return (
                <motion.div key={p.title}
                  onClick={() => !isActive && setActive(i)}
                  initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 0 }}
                  animate={getAnimate(i)}
                  transition={{
                    duration: isActive || (active !== null && active !== i) ? 0.5 : 0.7,
                    delay: dispersed && active === null ? i * 0.07 : 0,
                    ease,
                  }}
                  whileHover={
                    active === null && dispersed
                      ? { scale: scattered[i].scale * 1.1, y: scattered[i].y - 12, rotate: scattered[i].rotate * 0.3, zIndex: 10, transition: { duration: 0.22 } }
                      : {}
                  }
                  style={{
                    position: 'absolute',
                    width: isActive ? 500 : 260,
                    cursor: isActive ? 'default' : 'pointer',
                    zIndex: isActive ? 20 : 5,
                    transition: 'width 0.45s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <div style={{
                    background: '#fff',
                    border: `0.5px solid ${isActive ? p.accentColor : 'var(--border)'}`,
                    borderRadius: 20,
                    padding: isActive ? '1.6rem 2rem' : '1.3rem 1.5rem',
                    position: 'relative', overflow: 'hidden',
                    boxShadow: isActive ? `0 24px 64px ${p.accentColor}35` : '0 4px 20px rgba(0,0,0,0.07)',
                    transition: 'padding 0.4s, box-shadow 0.3s, border-color 0.3s',
                  }}>
                    <motion.div
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.45, ease }}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: p.accentColor, transformOrigin: 'left' }}
                    />
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0 }}
                      style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${p.accentColor}0e 0%, transparent 55%)`, zIndex: 0 }}
                    />
                    <div style={{
                      position: 'absolute', right: -4, top: -10,
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: isActive ? 96 : 72,
                      color: p.accentColor, opacity: 0.06,
                      pointerEvents: 'none', userSelect: 'none', lineHeight: 1, zIndex: 0,
                      transition: 'font-size 0.4s',
                    }}>{p.num}</div>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <p style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: p.accentColor, marginBottom: '0.35rem', fontWeight: 500 }}>
                        {p.category}
                      </p>
                      <h3 style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: isActive ? 24 : 15,
                        color: 'var(--text-dark)', lineHeight: 1.2,
                        marginBottom: isActive ? '0.6rem' : '0.3rem',
                        transition: 'font-size 0.3s',
                      }}>{p.title}</h3>
                      <motion.div
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.35, delay: 0.1, ease }}
                        style={{ height: 1.5, background: p.accentColor, borderRadius: 2, transformOrigin: 'left', marginBottom: '0.7rem' }}
                      />

                      {!isActive && (
                        <p style={{ fontSize: 10, color: 'var(--text-light)', lineHeight: 1.5 }}>
                          {p.desc.slice(0, 52)}…
                        </p>
                      )}

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.35, delay: 0.2 }}
                          >
                            <p style={{ fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: '1rem' }}>
                              {p.desc}
                            </p>
                            <div style={{ display: 'flex', gap: '0.8rem', padding: '0.8rem', borderRadius: 12, background: `${p.accentColor}14`, marginBottom: '1rem' }}>
                              {[p.stat1, p.stat2].map(({ val, label }) => (
                                <div key={label} style={{ flex: 1, textAlign: 'center' }}>
                                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: p.accentColor }}>{val}</div>
                                  <div style={{ fontSize: 9, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
                                </div>
                              ))}
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: '1rem' }}>
                              {p.tags.map((t, ti) => (
                                <motion.span key={t}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.25 + ti * 0.05, type: 'spring', stiffness: 300 }}
                                  whileHover={{ scale: 1.08, y: -2 }}
                                  style={{ fontSize: 10, padding: '3px 10px', borderRadius: 8, background: 'var(--mint-pale)', color: 'var(--text-mid)', border: '0.5px solid var(--border)', cursor: 'default' }}
                                >{t}</motion.span>
                              ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <motion.a
                                href={p.link} target="_blank" rel="noreferrer"
                                whileHover={{ x: 5 }}
                                style={{ fontSize: 12, color: 'var(--coral)', display: 'inline-flex', alignItems: 'center', gap: 5, fontWeight: 500 }}
                              >
                                View on GitHub
                                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
                              </motion.a>
                              <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{p.year}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* RIGHT ARROW */}
          <motion.button
            onClick={goNext}
            whileHover={{ scale: 1.12, background: 'var(--coral)', borderColor: 'var(--coral)', color: '#fff' }}
            whileTap={{ scale: 0.93 }}
            animate={{ opacity: dispersed ? 1 : 0 }}
            style={{
              flexShrink: 0, width: 44, height: 44, borderRadius: '50%',
              border: '0.5px solid var(--border)', background: '#fff',
              color: 'var(--text-mid)', fontSize: 16, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 30, transition: 'all 0.2s',
            }}
          >→</motion.button>

        </div>
      </div>
    </section>
  )
}