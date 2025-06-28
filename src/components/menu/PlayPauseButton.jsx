
import { useState, useRef, useEffect } from "react"
import { Play, Pause } from "lucide-react"

function PlayPauseButton({ musicPath }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(musicPath)
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio
  
    const handleCanPlay = () => setAudioLoaded(true)
    const handleError = () => {
      console.log("Audio file not found, using silence")
      setAudioLoaded(true)
    }
  
    audio.addEventListener("canplaythrough", handleCanPlay)
    audio.addEventListener("error", handleError)
  
    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay)
      audio.removeEventListener("error", handleError)
      audio.pause()
    }
  }, [musicPath]);
  
  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current?.play()
        setIsPlaying(true)
      } catch (error) {
        console.log("Auto-play prevented by browser")
        setIsPlaying(false)
      }
    }
  
    if (audioLoaded && audioRef.current) {
      playAudio()
    }
  }, [audioLoaded])

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

  return (
    <button
      className="musicControlButton"
      onClick={toggleAudio}
      aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
    >
      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
    </button>
  )
}

export default PlayPauseButton
