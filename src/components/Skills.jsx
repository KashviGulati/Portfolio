import { motion } from 'framer-motion'
import { Reveal, Stagger, StaggerItem } from './Animations'

const groups = [
  { title: 'Languages', items: [
    {l:'Python',t:'hot'},{l:'JavaScript',t:'hot'},{l:'C++',t:'mid'},{l:'C',t:'mid'},{l:'SQL',t:'mid'},
  ]},
  { title: 'Frameworks & Libraries', items: [
    {l:'React',t:'hot'},{l:'PyTorch',t:'hot'},{l:'LangChain',t:'hot'},{l:'Flask',t:'mid'},
    {l:'Django',t:'mid'},{l:'Scikit-learn',t:'mid'},{l:'NumPy',t:'cool'},{l:'Pandas',t:'cool'},
  ]},
  { title: 'Tools & Platforms', items: [
    {l:'FAISS',t:'hot'},{l:'Supabase',t:'mid'},{l:'Power BI',t:'mid'},
    {l:'n8n',t:'cool'},{l:'REST APIs',t:'mid'},{l:'Git',t:'cool'},{l:'SQLite',t:'cool'},
  ]},
]

const tagStyle = {
  hot:  { background:'var(--blush-pale)', color:'#b04050', border:'0.5px solid var(--blush)' },
  mid:  { background:'var(--mint-pale)',  color:'var(--text-mid)', border:'0.5px solid var(--border)' },
  cool: { background:'#fff8e0', color:'#7a6010', border:'0.5px solid #f0dc88' },
}

export default function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--mint-pale)', scrollMarginTop: 72 }}>
      <div style={{ padding: '5.5rem 3.5rem' }}>
        <Reveal>
          <p style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'2.5px', color:'var(--text-light)', marginBottom:'0.4rem' }}>Tech arsenal</p>
          <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:40, color:'var(--text-dark)', marginBottom:'2.8rem', lineHeight:1.15 }}>
            Skills &amp; <span style={{ color:'var(--coral)' }}>Tools</span>
          </h2>
        </Reveal>
        <Stagger staggerDelay={0.12}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
            {groups.map(({ title, items }) => (
              <StaggerItem key={title}>
                <motion.div className="hoverable"
                  whileHover={{ y:-3, borderColor:'var(--mint)' }} transition={{ duration:0.2 }}
                  style={{ background:'#fff', border:'0.5px solid var(--border)', borderRadius:16, padding:'1.6rem' }}
                >
                  <div style={{ fontSize:10, textTransform:'uppercase', letterSpacing:2, color:'var(--mint)', marginBottom:'1rem', fontWeight:500 }}>{title}</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                    {items.map(({ l, t }) => (
                      <motion.span key={l}
                        whileHover={{ scale:1.08 }} whileTap={{ scale:0.95 }}
                        style={{ fontSize:12, padding:'5px 13px', borderRadius:16, cursor:'default', ...tagStyle[t] }}
                      >{l}</motion.span>
                    ))}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  )
}