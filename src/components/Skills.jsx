import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function useInViewOnce(ref, threshold = 0.12) {
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

const groups = [
  { title: 'Languages', items: [
    { l: 'Python', t: 'hot', pct: 95 }, { l: 'JavaScript', t: 'hot', pct: 85 },
    { l: 'C++', t: 'mid', pct: 75 }, { l: 'C', t: 'mid', pct: 70 }, { l: 'SQL', t: 'mid', pct: 80 },
  ]},
  { title: 'Frameworks & Libraries', items: [
    { l: 'React', t: 'hot', pct: 88 }, { l: 'PyTorch', t: 'hot', pct: 82 },
    { l: 'LangChain', t: 'hot', pct: 80 }, { l: 'Flask', t: 'mid', pct: 85 },
    { l: 'Django', t: 'mid', pct: 72 }, { l: 'Scikit-learn', t: 'mid', pct: 84 },
    { l: 'NumPy', t: 'cool', pct: 88 }, { l: 'Pandas', t: 'cool', pct: 86 },
  ]},
  { title: 'Tools & Platforms', items: [
    { l: 'FAISS', t: 'hot', pct: 78 }, { l: 'Supabase', t: 'mid', pct: 72 },
    { l: 'Power BI', t: 'mid', pct: 68 }, { l: 'n8n', t: 'cool', pct: 65 },
    { l: 'REST APIs', t: 'mid', pct: 88 }, { l: 'Git', t: 'cool', pct: 90 },
    { l: 'SQLite', t: 'cool', pct: 75 },
  ]},
]

const tagStyle = {
  hot:  { background: 'var(--blush-pale)', color: '#b04050', border: '0.5px solid var(--blush)' },
  mid:  { background: 'var(--mint-pale)',  color: 'var(--text-mid)', border: '0.5px solid var(--border)' },
  cool: { background: '#fff8e0', color: '#7a6010', border: '0.5px solid #f0dc88' },
}

function AnimatedBar({ pct, color, inView, delay }) {
  return (
    <div style={{ height: 4, background: 'var(--border)', borderRadius: 4, overflow: 'hidden', marginTop: 4 }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: '100%', background: color, borderRadius: 4 }}
      />
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const inView = useInViewOnce(sectionRef)
  const ease = [0.22, 1, 0.36, 1]

  // flip card state
  const [flipped, setFlipped] = useState({})
  const toggle = (key) => setFlipped(f => ({ ...f, [key]: !f[key] }))

  return (
    <section id="skills" ref={sectionRef} style={{ background: 'var(--mint-pale)', scrollMarginTop: 72 }}>
      <div style={{ padding: '5.5rem 3.5rem' }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '2.5px', color: 'var(--text-light)', marginBottom: '0.4rem' }}
        >
          Tech arsenal
        </motion.p>

        {/* Title — typewriter feel */}
        <div style={{ marginBottom: '2.8rem', overflow: 'hidden' }}>
          {['Skills', '&', 'Tools'].map((word, i) => (
            <motion.span key={word}
              initial={{ y: 56, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              style={{
                display: 'inline-block', marginRight: '0.3em',
                fontFamily: "'DM Serif Display', serif", fontSize: 40,
                color: word === '&' ? 'var(--coral)' : 'var(--text-dark)',
                fontStyle: word === '&' ? 'italic' : 'normal',
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>

          {/* Left — flip cards for each group */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {groups.map(({ title, items }, gi) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: gi * 0.15, ease }}
                style={{ perspective: 1000 }}
              >
                <motion.div
                  whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(141,207,200,0.18)', borderColor: 'var(--mint)' }}
                  style={{ background: '#fff', border: '0.5px solid var(--border)', borderRadius: 16, padding: '1.4rem', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--mint)', fontWeight: 500 }}>
                      {title}
                    </span>
                    <motion.span
                      onClick={() => toggle(title)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ fontSize: 10, color: 'var(--text-light)', cursor: 'pointer', padding: '3px 10px', border: '0.5px solid var(--border)', borderRadius: 12 }}
                    >
                      {flipped[title] ? 'Tags' : 'Levels'}
                    </motion.span>
                  </div>

                  {!flipped[title] ? (
                    /* Tags view */
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                      {items.map(({ l, t }, ii) => (
                        <motion.span key={l}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: gi * 0.15 + ii * 0.05, type: 'spring', stiffness: 280 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          style={{ fontSize: 12, padding: '5px 13px', borderRadius: 16, cursor: 'default', ...tagStyle[t] }}
                        >
                          {l}
                        </motion.span>
                      ))}
                    </div>
                  ) : (
                    /* Levels view — animated bars */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {items.map(({ l, pct, t }, ii) => (
                        <motion.div key={l}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: ii * 0.04 }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                            <span style={{ fontSize: 12, color: 'var(--text-mid)' }}>{l}</span>
                            <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{pct}%</span>
                          </div>
                          <AnimatedBar
                            pct={pct}
                            color={t === 'hot' ? 'var(--coral)' : t === 'mid' ? 'var(--mint)' : '#e8c84a'}
                            inView={true}
                            delay={ii * 0.06}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Right — rotating skill orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 380 }}
          >
            <div style={{ position: 'relative', width: 300, height: 300 }}>

              {/* Center circle */}
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 90, height: 90, borderRadius: '50%',
                  background: 'var(--mint)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 13, color: '#fff', textAlign: 'center', lineHeight: 1.3,
                  zIndex: 10,
                }}
              >
                Full<br />Stack
              </motion.div>

              {/* Orbit rings */}
              {[120, 180].map((r, ri) => (
                <motion.div
                  key={r}
                  animate={{ rotate: ri % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: ri === 0 ? 18 : 28, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    width: r * 2, height: r * 2,
                    marginLeft: -r, marginTop: -r,
                    borderRadius: '50%',
                    border: `1px dashed ${ri === 0 ? 'var(--mint-light)' : 'var(--blush)'}`,
                  }}
                >
                  {/* Pills on orbit */}
                  {(ri === 0
                    ? ['Python', 'React', 'PyTorch', 'FAISS']
                    : ['Flask', 'AWS', 'Git', 'SQL', 'GANs']
                  ).map((label, li, arr) => {
                    const angle = (li / arr.length) * 2 * Math.PI
                    const cx = r + Math.cos(angle) * r
                    const cy = r + Math.sin(angle) * r
                    return (
                      <motion.div
                        key={label}
                        style={{
                          position: 'absolute',
                          left: cx, top: cy,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        {/* counter-rotate so text stays upright */}
                        <motion.div
                          animate={{ rotate: ri % 2 === 0 ? -360 : 360 }}
                          transition={{ duration: ri === 0 ? 18 : 28, repeat: Infinity, ease: 'linear' }}
                          style={{
                            background: '#fff', border: `0.5px solid ${ri === 0 ? 'var(--mint)' : 'var(--blush)'}`,
                            borderRadius: 12, padding: '3px 10px',
                            fontSize: 10, color: 'var(--text-mid)',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                          }}
                        >
                          {label}
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              ))}

            </div>
          </motion.div>
        </div>

        {/* Toggle hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ fontSize: 11, color: 'var(--text-light)', marginTop: '1.5rem', textAlign: 'center' }}
        >
          Toggle "Levels" on any group to see proficiency bars
        </motion.p>

      </div>
    </section>
  )
}