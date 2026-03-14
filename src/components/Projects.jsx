import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Reveal } from './Animations'

const projects = [
  {
    num: '01 — Jan 2026', accentColor: 'var(--mint)',
    title: 'CodeScope AI',
    desc: 'Fully local RAG-based code intelligence. Semantically analyzes large multi-language codebases and answers natural-language queries with file- and line-level source attribution.',
    tags: ['Python', 'CodeBERT', 'FAISS', 'RAG', 'AST Parsing'],
    link: 'https://github.com/KashviGulati/CodeScope-AI',
  },
  {
    num: '02 — Sep 2025', accentColor: 'var(--blush)',
    title: 'AirSentinel AI',
    desc: 'Full-stack AQI monitoring platform with real-time ingestion, 24-step Transformer-based forecasting, and dual anomaly detection using Isolation Forest and Z-score.',
    tags: ['PyTorch', 'XGBoost', 'Flask', 'Scikit-learn', 'REST APIs'],
    link: 'https://github.com/KashviGulati/AirSentinel-AI',
  },
  {
    num: '03 — Nov 2025', accentColor: 'var(--coral)',
    title: 'InterviewPrep',
    desc: 'Cross-platform AI communication practice platform with 90%+ speech-to-text accuracy, personalized feedback on filler words, pacing, clarity, and a dynamic performance dashboard.',
    tags: ['React', 'Vite', 'AssemblyAI', 'Gemini API', 'Supabase'],
    link: 'https://github.com/KashviGulati/SpeakPro',
  },
  {
    num: '04 — Mar 2026', accentColor: 'var(--mint)',
    title: 'End-to-End Data Engineering Pipeline',
    desc: 'Scalable ETL pipeline in Python to ingest multi-source datasets (CSV/APIs) into a centralized PostgreSQL analytics database. Integrated AWS S3 for cloud storage and orchestrated automated pipelines using Apache Airflow DAGs with built-in data validation.',
    tags: ['Python', 'SQL', 'PostgreSQL', 'AWS S3', 'Apache Airflow'],
    link: 'https://github.com/KashviGulati/ETLPipeline',
  },
  {
    num: '05 — 2026', accentColor: 'var(--coral)',
    title: 'RAG-Driven AI Agent',
    desc: 'RAG-based AI agent achieving 20–30% faster semantic document retrieval. Integrated EDA automation, ML model training, and GAN-based data visualization improving insight generation by 40%. Deployed RESTful APIs for file processing and semantic queries.',
    tags: ['Python', 'FastAPI', 'ChromaDB', 'Gemini API', 'SentenceTransformer', 'GANs'],
    link: 'https://github.com/KashviGulati/AI-Agent',
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

function TiltCard({ children, accentColor, inView, delay }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })
  const glowX = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(y, [-0.5, 0.5], ['0%', '100%'])

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX, rotateY,
        transformStyle: 'preserve-3d',
        background: '#fff',
        border: '0.5px solid var(--border)',
        borderRadius: 18,
        padding: '1.8rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        height: '100%',
      }}
      whileHover={{ boxShadow: '0 24px 60px rgba(141,207,200,0.25)', borderColor: 'var(--mint-light)' }}
    >
      {/* Mouse follow glow */}
      <motion.div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 18,
        background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(141,207,200,0.13) 0%, transparent 60%)`,
        zIndex: 0,
      }} />

      {/* Accent bar draws in */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accentColor, transformOrigin: 'left', zIndex: 2 }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  )
}

function ProjectCard({ project, delay }) {
  const ref = useRef(null)
  const inView = useInViewOnce(ref)

  return (
    <div ref={ref} style={{ height: '100%' }}>
      <TiltCard accentColor={project.accentColor} inView={inView} delay={delay}>

        {/* Number fades in */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
          style={{ fontSize: 10, color: 'var(--text-light)', marginBottom: '0.8rem', letterSpacing: 1 }}
        >
          {project.num}
        </motion.p>

        {/* Title slides up */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: 'var(--text-dark)', marginBottom: '0.6rem', lineHeight: 1.25 }}
        >
          {project.title}
        </motion.h3>

        {/* Desc blurs in */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6, delay: delay + 0.36 }}
          style={{ fontSize: 13, color: 'var(--text-mid)', lineHeight: 1.65, marginBottom: '1.2rem', flex: 1 }}
        >
          {project.desc}
        </motion.p>

        {/* Divider draws */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '0.5px', background: 'var(--border)', marginBottom: '1rem', transformOrigin: 'left' }}
        />

        {/* Tags pop in one by one */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.2rem' }}>
          {project.tags.map((t, ti) => (
            <motion.span key={t}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: delay + 0.44 + ti * 0.06, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.08, y: -2 }}
              style={{ fontSize: 10, background: 'var(--mint-pale)', color: 'var(--text-mid)', padding: '3px 10px', borderRadius: 8 }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* Link slides in */}
        <motion.a
          href={project.link} target="_blank" rel="noreferrer"
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.6 }}
          whileHover={{ x: 5 }}
          style={{ fontSize: 12, color: 'var(--coral)', display: 'inline-flex', alignItems: 'center', gap: 5 }}
        >
          View on GitHub
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>→</motion.span>
        </motion.a>

      </TiltCard>
    </div>
  )
}

export default function Projects() {
  const row1 = projects.slice(0, 3)
  const row2 = projects.slice(3)

  return (
    <section id="projects" style={{ background: 'var(--ivory)', scrollMarginTop: 72 }}>
      <div style={{ padding: '5.5rem 3.5rem' }}>

        <Reveal>
          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '2.5px', color: 'var(--text-light)', marginBottom: '0.4rem' }}>
            Selected work
          </p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, color: 'var(--text-dark)', marginBottom: '2.8rem', lineHeight: 1.15 }}>
            Featured <span style={{ color: 'var(--coral)' }}>Projects</span>
          </h2>
        </Reveal>

        {/* Row 1 — 3 cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '1.5rem',
        }}>
          {row1.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 0.13} />
          ))}
        </div>

        {/* Row 2 — 2 cards centered */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          {row2.map((p, i) => (
            <div key={p.title} style={{ width: 'calc(33.333% - 0.75rem)' }}>
              <ProjectCard project={p} delay={i * 0.13} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}