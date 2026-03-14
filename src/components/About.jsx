import { motion } from 'framer-motion'
import { Reveal, Stagger, StaggerItem } from './Animations'

const cards = [
  { icon: '🎓', title: 'B.Tech Computer Science & Engineering', sub: 'Lovely Professional University · CGPA 8.29' },
  { icon: '🏆', title: 'Google Cloud Agentic AI Day — Finalist',  sub: 'Hackathon · Bangalore · Jul 2025' },
  { icon: '💼', title: 'Full Stack Developer Intern',              sub: 'NetPy Technologies · Jun–Sep 2025' },
  { icon: '🤖', title: 'Advanced Data Science & Generative AI',   sub: 'Certified · AlgoTutor Academy · Aug 2025' },
]

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--ivory)', scrollMarginTop: 72 }}>
      <div style={{ padding: '5.5rem 3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

          <Reveal>
            <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '2.5px', color: 'var(--text-light)', marginBottom: '0.4rem' }}>About me</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, color: 'var(--text-dark)', marginBottom: '2rem', lineHeight: 1.15 }}>
              Turning <em style={{ fontStyle:'italic' }}>ideas</em> into<br />
              <span style={{ color: 'var(--coral)' }}>intelligent</span> products
            </h2>
            {[
              <>I'm a Computer Science student at <strong style={{color:'var(--text-dark)',fontWeight:500}}>Lovely Professional University</strong> with a passion for building AI-powered systems that solve real problems.</>,
              <>When I'm not coding, I'm exploring ML architectures, competing in hackathons, or sharpening communication skills — recently placed <strong style={{color:'var(--text-dark)',fontWeight:500}}>2nd in a Group Discussion Competition</strong>.</>,
              <>Actively seeking opportunities to grow, contribute, and keep building things that matter.</>,
            ].map((t, i) => (
              <p key={i} style={{ fontSize: 15, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.2rem' }}>{t}</p>
            ))}
          </Reveal>

          <Stagger staggerDelay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cards.map(({ icon, title, sub }) => (
                <StaggerItem key={title}>
                  <motion.div className="hoverable"
                    whileHover={{ y: -3, borderColor: 'var(--mint)', boxShadow: '0 8px 24px rgba(141,207,200,0.12)' }}
                    transition={{ duration: 0.2 }}
                    style={{ background: '#fff', border: '0.5px solid var(--border)', borderRadius: 14, padding: '1.1rem 1.3rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                  >
                    <div style={{ width:38, height:38, borderRadius:10, background:'var(--mint-pale)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, flexShrink:0 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 3 }}>{title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{sub}</div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </Stagger>

        </div>
      </div>
    </section>
  )
}