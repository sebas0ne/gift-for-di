// src/pages/WhyILoveYou.jsx
import { useState, useEffect, useRef } from "react"
import { Play, Pause, CircleChevronDown, CircleChevronUp } from "lucide-react"
import { motion } from 'framer-motion';
import BackgroundAnimation from '../components/animations/BackgroundAnimation';

import CONSTANT from '../utils/constant';
import "../styles/Pages/WhyILoveYou.css"

const WhyILoveYou = () => {
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const limitPaginate = CONSTANT.loveReasons.length;
  const sectionsRef = useRef([])
  const containerRef = useRef(null)
  const audioRef = useRef(null)

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

  const _hrefSectionManager = (reason, type) => {
    if (type === 'up') {
        if(reason === limitPaginate || reason === 1){
            return '#headerSection';
        } else {
            return `#loveSection${reason - 1}`;
        }
    } else {
        if(reason === limitPaginate){
            return '#headerSection';
        } else {
            return `#loveSection${reason + 1}`;
        }
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
      <BackgroundAnimation />
      <div>
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
          <CircleChevronDown size={20} />
        </a>
      </header>

      <main className="mainContent" id="mainContent">
        {CONSTANT.loveReasons.map((reason, index) => (
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
                  <div className="cardFooterButton">
                    <a className="nexButtonSection" href={_hrefSectionManager(reason.id, 'up')}>
                        <CircleChevronUp size={20} />
                    </a>
                    {reason.id !== limitPaginate && 
                    (
                      <a className="nexButtonSection" href={_hrefSectionManager(reason.id, 'down')}>
                        <CircleChevronDown size={20} />
                      </a>
                    )
                    }
                  </div>
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
