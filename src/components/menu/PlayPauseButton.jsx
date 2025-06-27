"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause } from "lucide-react"

function PlayPauseButton() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Crear elemento de audio (en una implementación real, usarías un archivo de audio)
    audioRef.current = new Audio()
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    // En una implementación real, aquí cargarías tu archivo de música
    audioRef.current.src = '/music/Le_Festin.mp3';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        // En una implementación real, aquí reproducirías el audio
        audioRef.current.play().catch(console.error);
        console.log("Reproduciendo música bossa nova...")
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <button
      className="musicControlButton"
      onClick={togglePlayPause}
      aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
    >
      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
    </button>
  )
}

export default PlayPauseButton
