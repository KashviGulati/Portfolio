import { motion } from 'framer-motion'
import { Reveal } from './Animations'

export default function Contact() {
  return (
    <section id="contact" style={{ background:'var(--mint)', scrollMarginTop:72 }}>
      <div style={{ padding:'6rem 3.5rem', textAlign:'center' }}>
        <Reveal>
          <p style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'2.5px', color:'rgba(255,255,255,0.6)', marginBottom:'0.4rem' }}>Let's connect</p>
          <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:40, color:'#fff', marginBottom:'0.8rem', lineHeight:1.15 }}>
            Get in <span style={{ color:'var(--ivory)' }}>Touch</span>
          </h2>
          <p style={{ fontSize:15, color:'rgba(255,255,255,0.75)', marginBottom:'2.5rem', lineHeight:1.7 }}>
            Open to full-time roles, internships, freelance projects,<br />and interesting collaborations.
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:'1rem', flexWrap:'wrap', marginBottom:'2rem' }}>
            {[
              { label:'✉ Email me', href:'mailto:kashvigulati42@gmail.com', primary:true },
              { label:'LinkedIn',   href:'https://www.linkedin.com/in/kashvi-gulati/', primary:false },
              { label:'GitHub',     href:'https://github.com/KashviGulati', primary:false },
            ].map(({ label, href, primary }) => (
              <motion.a key={label} href={href} target={primary ? undefined : '_blank'} rel="noreferrer"
                whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                style={{
                  background: primary ? '#fff' : 'rgba(255,255,255,0.2)',
                  color: primary ? 'var(--coral)' : '#fff',
                  border: primary ? '0.5px solid #fff' : '0.5px solid rgba(255,255,255,0.4)',
                  borderRadius: 30, padding:'12px 28px', fontSize:13,
                  fontFamily:"'DM Sans', sans-serif", display:'inline-block',
                }}
              >
                {label}
              </motion.a>
            ))}
          </div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.5)' }}>
            <a href="mailto:kashvigulati42@gmail.com" style={{ color:'rgba(255,255,255,0.7)' }}>kashvigulati42@gmail.com</a>
            {' · '}+91 8307533390
          </div>
        </Reveal>
      </div>
    </section>
  )
}