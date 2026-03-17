import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence
} from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Reveal } from "./Animations"

const certificates = [
  {
    title: "Advanced Data Science & Generative AI",
    issuer: "AlgoTutor",
    date: "Aug 2025",
    icon: "🤖",
    colorHex: "#F4858A",
    colorPale: "#FDE8E8",
    skills: ["AI", "LLM"],
    desc: "Generative AI + deep learning workflows.",
  },
  {
    title: "Networking",
    issuer: "Google",
    date: "2024",
    icon: "🌐",
    colorHex: "#8DCFC8",
    colorPale: "#E0F5F2",
    skills: ["TCP/IP"],
    desc: "Networking fundamentals.",
  },
  {
    title: "Theory of Computation",
    issuer: "Infosys",
    date: "2025",
    icon: "⚙️",
    colorHex: "#8DCFC8",
    colorPale: "#E0F5F2",
    skills: ["Automata"],
    desc: "Finite automata.",
  },
  {
    title: "Peer Networks",
    issuer: "Coursera",
    date: "2024",
    icon: "🔗",
    colorHex: "#F4858A",
    colorPale: "#FDE8E8",
    skills: ["LAN"],
    desc: "Network architecture.",
  },
  {
    title: "Advanced Data Science & Generative AI",
    issuer: "AlgoTutor",
    date: "Aug 2025",
    icon: "🤖",
    colorHex: "#F4858A",
    colorPale: "#FDE8E8",
    skills: ["AI", "LLM"],
    desc: "Generative AI + deep learning workflows.",
  },
]

/* 🔥 CARD COMPONENT (fixes hook error) */
function CertificateCard({ cert, i, total, spread, setActive }) {
  const centerIndex = Math.floor(total / 2)
  const offset = i - centerIndex

  // ✅ STACK → SPREAD
  const x = useTransform(spread, (v) => offset * 260 * v)
  const y = useTransform(spread, (v) => offset * 10 * v)
  const rotate = useTransform(spread, (v) => offset * -4 * v)

  const scale = useTransform(spread, (v) => {
    if (offset === 0) return 1 + 0.08 * v
    return 1 - 0.05 * (1 - v)
  })

  const opacity = useTransform(spread, (v) => {
    if (offset === 0) return 1
    return 0.85 + 0.15 * v
  })

  const blur = useTransform(spread, (v) => {
    const distance = Math.abs(offset)
    if (distance === 0) return "blur(0px)"
    return `blur(${(1 - v) * 1 * distance * 0.4}px)`
  })

  return (
    <motion.div
      onClick={() => setActive(i)}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 280,
        height: 380,
        borderRadius: 24,
        padding: "1.4rem",
        background: "#fff",
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
        x,
        y,
        rotate,
        scale,
        opacity,
        filter: blur,
        zIndex: total - Math.abs(offset),
        boxShadow: `0 20px 60px ${cert.colorHex}25`,
      }}
      whileHover={{
        scale: 1.1,
        y: -15,
        filter: "blur(0px)",
        boxShadow: `0 40px 100px ${cert.colorHex}60`
      }}
    >
      {/* ICON */}
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 14,
          background: cert.colorPale,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          marginBottom: "0.8rem"
        }}
      >
        {cert.icon}
      </div>

      <h3 style={{ fontSize: 17 }}>{cert.title}</h3>

      <p
        style={{
          fontSize: 12,
          color: "var(--text-light)",
          marginBottom: "0.8rem"
        }}
      >
        {cert.issuer} · {cert.date}
      </p>

      <p style={{ fontSize: 13, color: "var(--text-mid)" }}>
        {cert.desc}
      </p>
    </motion.div>
  )
}

export default function Certificates() {
  const [active, setActive] = useState(null)
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  })

  const spread = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : ""
  }, [active])

  return (
    <>
      <section
        ref={ref}
        id="certificates"
        style={{
          height: "220vh",
          background: "var(--ivory)",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: "4rem"
          }}
        >
          {/* HEADER */}
          <div style={{ padding: "0 3.5rem", marginBottom: "1rem" }}>
            <Reveal>
              <p style={{
                fontSize: 10,
                letterSpacing: "2.5px",
                color: "var(--text-light)",
                marginBottom: "0.3rem"
              }}>
                Credentials
              </p>

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end"
              }}>
                <h2 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 40
                }}>
                  Certificates &{" "}
                  <span style={{ color: "var(--coral)", fontStyle: "italic" }}>
                    Badges
                  </span>
                </h2>

                <p style={{ fontSize: 12, color: "var(--text-light)" }}>
                  Scroll to explore · Hover to interact
                </p>
              </div>
            </Reveal>
          </div>

          {/* CARDS */}
          <div
            style={{
              position: "relative",
              height: 200,
              maxWidth: 1100,
            }}
          >
            {certificates.map((cert, i) => (
              <CertificateCard
                key={i}
                cert={cert}
                i={i}
                total={certificates.length}
                spread={spread}
                setActive={setActive}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: 20
              }}
            >
              <h2>{certificates[active].title}</h2>
              <p>{certificates[active].desc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}