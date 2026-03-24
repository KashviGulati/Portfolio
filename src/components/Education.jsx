import { motion } from 'framer-motion'
import { Reveal, Stagger, StaggerItem } from './Animations'
import { Brain, Globe, Cloud, Medal } from 'lucide-react'

const edu = [
  { deg:'B.Tech — Computer Science & Engineering', school:'Lovely Professional University, Phagwara', detail:'Aug 2023 – Present · CGPA 8.29' },
  { deg:'Senior Secondary (12th)', school:'GMSSSS Yamunanagar, Haryana', detail:'Apr 2021 – May 2023 · 75%' },
  { deg:'Secondary (10th)', school:'ST. Thomas School Yamunanagar', detail:'Apr 2009 – May 2021 · 95.6%' },
]

const ach = [
  { Icon: Brain,  title:'Advanced Data Science & Generative AI', sub:'AlgoTutor Academy · Aug 2025' },
  { Icon: Globe,  title:'Bits and Bytes of Computer Networking',  sub:'Google · Sep 2024' },
  { Icon: Cloud,  title:'Google Cloud Agentic AI Day — Finalist', sub:'Hackathon · Bangalore · Jul 2025' },
  { Icon: Medal,  title:'2nd Place — Group Discussion Competition', sub:'Centre for Professional Enhancement · Dec 2025' },
]

export default function Education() {
  return (
    <section id="education" style={{ background:'var(--ivory)', scrollMarginTop:72 }}>
      <div style={{ padding:'5.5rem 3.5rem' }}>
        <Reveal>
          <p style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'2.5px', color:'var(--text-light)', marginBottom:'0.4rem' }}>Academic background</p>
          <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:40, color:'var(--text-dark)', marginBottom:'2.8rem', lineHeight:1.15 }}>
            Education &amp; <span style={{ color:'var(--coral)' }}>Achievements</span>
          </h2>
        </Reveal>

        <Stagger staggerDelay={0.1}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.2rem', marginBottom:'1.5rem' }}>
            {edu.map(({ deg, school, detail }) => (
              <StaggerItem key={deg}>
                <motion.div className="hoverable"
                  whileHover={{ y:-3, borderColor:'var(--mint-light)' }} transition={{ duration:0.2 }}
                  style={{ background:'#fff', border:'0.5px solid var(--border)', borderRadius:14, padding:'1.4rem' }}
                >
                  <div style={{ fontSize:13, fontWeight:500, color:'var(--text-dark)', marginBottom:4 }}>{deg}</div>
                  <div style={{ fontSize:12, color:'var(--coral)', marginBottom:4 }}>{school}</div>
                  <div style={{ fontSize:11, color:'var(--text-light)' }}>{detail}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>

        <Stagger staggerDelay={0.1}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            {ach.map(({ Icon, title, sub }) => (
              <StaggerItem key={title}>
                <motion.div className="hoverable"
                  whileHover={{ y:-3, borderColor:'var(--blush)' }} transition={{ duration:0.2 }}
                  style={{ background:'#fff', border:'0.5px solid var(--border)', borderRadius:14, padding:'1.2rem 1.4rem', display:'flex', gap:'1rem', alignItems:'flex-start' }}
                >
                  <div style={{ width:38, height:38, borderRadius:10, background:'var(--blush-pale)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={18} color="var(--coral)" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:500, color:'var(--text-dark)', marginBottom:3 }}>{title}</div>
                    <div style={{ fontSize:12, color:'var(--text-light)' }}>{sub}</div>
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