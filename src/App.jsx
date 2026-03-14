import Cursor from './components/Cursor'
import ScrollBar from './components/ScrollBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import Education from './components/Education'
import Contact from './components/Contact'

const Divider = () => (
  <div style={{ height: '0.5px', background: 'var(--border)' }} />
)

const Footer = () => (
  <footer style={{
    background: 'var(--ivory-dark)',
    padding: '1.5rem 3.5rem',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    borderTop: '0.5px solid var(--border)',
  }}>
    <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: 'var(--text-dark)' }}>
      Kashvi Gulati
    </span>
    <span style={{ fontSize: 11, color: 'var(--text-light)' }}>© 2026 · Built with ♡</span>
  </footer>
)

export default function App() {
  return (
    <>
      <ScrollBar />
      <Cursor />
      <Navbar />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <Experience />
      <Divider />
      <Certificates />
      <Divider />
      <Education />
      <Contact />
      <Footer />
    </>
  )
}