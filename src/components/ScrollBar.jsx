import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 2, background: 'var(--coral)',
      transformOrigin: 'left', scaleX, zIndex: 200,
    }} />
  )
}