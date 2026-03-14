import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [pos, setPos]       = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onMove  = e => setPos({ x: e.clientX, y: e.clientY })
    const onOver  = e => setHovered(!!e.target.closest('a, button, .hoverable'))
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <div style={{ position:'fixed', top:0, left:0, pointerEvents:'none', zIndex:9999 }}>
      {/* dot */}
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type:'spring', stiffness:800, damping:40 }}
        style={{
          position:'absolute', width:8, height:8, borderRadius:'50%',
          background:'var(--coral)', transform:'translate(-50%,-50%)',
        }}
      />
      {/* ring */}
      <motion.div
        animate={{ x: pos.x, y: pos.y, scale: hovered ? 1.8 : 1 }}
        transition={{ type:'spring', stiffness:220, damping:28 }}
        style={{
          position:'absolute', width:36, height:36, borderRadius:'50%',
          border:'1.5px solid var(--mint)', transform:'translate(-50%,-50%)',
        }}
      />
    </div>
  )
}