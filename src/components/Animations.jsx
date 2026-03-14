import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 30 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, staggerDelay = 0.1 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: staggerDelay } } }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children }) {
  return (
    <motion.div variants={{
      hidden:  { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
    }}>
      {children}
    </motion.div>
  )
}

export function SlideIn({ children, delay = 0, direction = 'left' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const x = direction === 'left' ? -60 : 60
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function BlurIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, filter: 'blur(10px)', y: 16 }}
      animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

// Wraps a section with a subtle background color sweep on enter
export function SectionReveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}