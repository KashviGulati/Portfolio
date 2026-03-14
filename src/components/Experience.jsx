import { motion } from 'framer-motion'
import { Reveal, Stagger, StaggerItem } from './Animations'

const bullets = [
  'Developed a production-ready Android application frontend using React Native (Expo), improving UI responsiveness and layout stability by 30%.',
  'Implemented JWT authentication and refresh token workflows, reducing re-authentication issues by 25%.',
  'Collaborated in an Agile development environment — sprint planning, task execution, and feature delivery.',
]

export default function Experience() {
  return (
    <section id="experience" style={{ background: 'var(--mint-pale)', scrollMarginTop: 72 }}>
      <div style={{ padding: '5.5rem 3.5rem' }}>

        <Reveal>
          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '2.5px', color: 'var(--text-light)', marginBottom: '0.4rem' }}>Work history</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, color: 'var(--text-dark)', marginBottom: '3rem', lineHeight: 1.15 }}>
            Where I've <span style={{ color: 'var(--coral)' }}>Worked</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <motion.div
            whileHover={{ boxShadow: '0 16px 48px rgba(141,207,200,0.15)', borderColor: 'var(--mint-light)' }}
            transition={{ duration: 0.25 }}
            style={{ background: '#fff', border: '0.5px solid var(--border)', borderRadius: 20, padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
          >
            {/* Top accent bar */}
            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--coral)', transformOrigin: 'left' }}
            />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.8rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ fontSize: 12, fontWeight: 500, color: 'var(--coral)', marginBottom: 4, letterSpacing: '0.5px' }}
                >
                  NetPy Technologies
                </motion.p>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: 'var(--text-dark)', marginBottom: 4 }}
                >
                  Full Stack Developer Intern
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  style={{ fontSize: 11, color: 'var(--text-light)' }}
                >
                  Jun 2025 – Sep 2025
                </motion.p>
              </div>

              {/* Right side — badge + certificate link */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem' }}
              >
                {/* Status badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--mint-pale)', border: '0.5px solid var(--border)', borderRadius: 20, padding: '6px 14px', fontSize: 11, color: 'var(--text-mid)' }}>
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mint)', display: 'inline-block' }}
                  />
                  Certificate Awarded
                </div>

                {/* Certificate link */}
                <motion.a
                  href="/certificates/experience.pdf"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 3, color: 'var(--coral)' }}
                  style={{ fontSize: 12, color: 'var(--text-light)', display: 'inline-flex', alignItems: 'center', gap: 5, cursor: 'pointer', transition: 'color 0.2s' }}
                >
                  View Certificate
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>→</motion.span>
                </motion.a>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: '0.5px', background: 'var(--border)', marginBottom: '1.8rem', transformOrigin: 'left' }}
            />

            {/* Bullets */}
            <Stagger staggerDelay={0.12}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {bullets.map((b, i) => (
                  <StaggerItem key={i}>
                    <motion.div
                      whileHover={{ x: 6 }} transition={{ duration: 0.2 }}
                      style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}
                    >
                      <motion.div
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 * i, type: 'spring', stiffness: 300 }}
                        style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--coral)', flexShrink: 0, marginTop: 6 }}
                      />
                      <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.75 }}>{b}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ display: 'flex', gap: '2rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '0.5px solid var(--border)', flexWrap: 'wrap' }}
            >
              {[
                { num: '30%', label: 'UI responsiveness improved' },
                { num: '25%', label: 'Re-auth issues reduced' },
                { num: '4mo', label: 'Duration' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: 'var(--coral)', display: 'block' }}>{num}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}