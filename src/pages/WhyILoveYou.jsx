import { useState, useEffect, useRef } from "react"
import { Play, Pause, CircleArrowRight } from "lucide-react"
import { motion } from 'framer-motion';

import CONSTANT from '../utils/constant';
import "../styles/Pages/WhyILoveYou.css"

const WhyILoveYou = () => {
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const sectionsRef = useRef([])
  const containerRef = useRef(null)
  const audioRef = useRef(null)

  const loveReasons = [
    {
      id: 1,
      title: "Te amo porque me haces mejor...",
      content:
        "Cada día a tu lado descubro una nueva versión de mí mismo. Tu amor me inspira a crecer, a soñar más alto y a ser la mejor persona que puedo ser. Contigo he aprendido que el amor verdadero no solo acepta quien eres, sino que te impulsa a convertirte en quien puedes llegar a ser.",
    },
    {
      id: 2,
      title: "Te amo porque me siento en casa contigo...",
      content:
        "No importa dónde estemos, si estás a mi lado, estoy en casa. Tu abrazo es mi refugio, tu risa es mi melodía favorita, y tu presencia convierte cualquier lugar en el sitio más hermoso del mundo. Contigo he encontrado esa paz que tanto buscaba.",
    },
    {
      id: 3,
      title: "Te amo porque eres mi mejor amiga...",
      content:
        "Antes de ser mi amor, eres mi cómplice, mi confidente, la persona con quien puedo ser completamente yo mismo. Compartimos secretos, risas, sueños y hasta los silencios más cómodos. Eres la persona que elegiría una y mil veces para vivir esta aventura llamada vida.",
    },
    {
      id: 4,
      title: "Te amo porque me enseñas cada día...",
      content:
        "Tu sabiduría, tu forma de ver el mundo, tu capacidad de encontrar belleza en los pequeños detalles... Todo eso me ha cambiado para siempre. Me has enseñado que el amor no es solo un sentimiento, sino una decisión que tomamos cada día de cuidarnos, respetarnos y crecer juntos.",
    },
    {
      id: 5,
      title: "Te amo porque eres única...",
      content:
        "En un mundo lleno de personas, tú brillas con luz propia. Tu forma de reír, de pensar, de amar, de soñar... Todo en ti es especial y auténtico. No existe nadie como tú, y me siento el más afortunado de poder llamarte mía y de ser tuyo para siempre.",
    },
  ]

  // Audio setup
  useEffect(() => {
    const audio = new Audio("/music/LikeYouDo.mp3")
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio

    const handleCanPlay = () => {
      setAudioLoaded(true)
    }

    const handleError = () => {
      console.log("Audio file not found, using silence")
      setAudioLoaded(true)
    }

    audio.addEventListener("canplaythrough", handleCanPlay)
    audio.addEventListener("error", handleError)

    // Auto-play attempt
    const playAudio = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (error) {
        console.log("Auto-play prevented by browser")
        setIsPlaying(false)
      }
    }

    if (audioLoaded) {
      playAudio()
    }

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay)
      audio.removeEventListener("error", handleError)
      audio.pause()
    }
  }, [audioLoaded])

  // Toggle audio
  const toggleAudio = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.log("Audio control error:", error)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = Number.parseInt(entry.target.dataset.sectionId)
            setVisibleSections((prev) => new Set([...prev, sectionId]))
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px",
      },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const setSectionRef = (index) => (el) => {
    sectionsRef.current[index] = el
  }

  const _hrefSection = (reason) => {
    if(reason === 5){
        return '#headerSection';
    } else {
        return `#loveSection${reason + 1}`;
    }
  }

  return (
    <div className="whyILoveYouContainer" ref={containerRef}>
      <button
        className="audioControlButton"
        onClick={toggleAudio}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      <header className="headerSection" id="headerSection">
      <div className={`homeContent`}>
          <h1 className="birthdayText enhanced-title">
            {CONSTANT.whyILoveYouPage.tiltePage.split('').map((char, index) => (
              <motion.span
                key={index}
                className="bounceLetter"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: index * 0.1,
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>
        <a className="nexButtonSection" href="#mainContent">
          <CircleArrowRight size={20} />
        </a>
      </header>

      <main className="mainContent" id="mainContent">
        {loveReasons.map((reason, index) => (
          <section
            key={reason.id}
            ref={setSectionRef(index)}
            data-section-id={reason.id}
            className={`loveSection ${visibleSections.has(reason.id) ? "visible" : ""}`}
            id={`loveSection${reason.id}`}
          >
            <div className="cardContainer">
              <div className="card">
                <h2 className="cardTitle">{reason.title}</h2>
                <div className="cardContent">
                  <p className="cardText">{reason.content}</p>
                </div>
                <div className="cardFooter">
                  <span className="cardNumber">{String(reason.id).padStart(2, "0")}</span>
                  <a className="nexButtonSection" href={_hrefSection(reason.id)}>
                    <CircleArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

export default WhyILoveYou
