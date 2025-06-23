
import { useState, useEffect } from "react"
import { LayoutGrid, StretchHorizontal } from "lucide-react"

import PageTitle from '../components/common/PageTitle';
import StickyNote from "../components/common/StickyNote"

import CONSTANT from '../utils/constant';
import "../styles/Pages/ThingsAboutYou.css"

export default function ThingsAboutYou() {
  const [notes, setNotes] = useState(CONSTANT.initialNotes)
  const [canRevealSecret, setCanRevealSecret] = useState(false)
  const [secretRevealed, setSecretRevealed] = useState(false)
  const [viewMode, setViewMode] = useState("list")

  useEffect(() => {
    checkDailySecret()
  }, [])

  const checkDailySecret = () => {
    const today = new Date().toLocaleDateString('sv-SE');
    const lastReveal = localStorage.getItem("lastSecretReveal")
    const hasRevealedToday = localStorage.getItem("secretRevealedToday") === "true"

    if (lastReveal !== today) {
      setCanRevealSecret(true)
      setSecretRevealed(false)
      localStorage.setItem("secretRevealedToday", "false")
    } else {
      setCanRevealSecret(false)
      setSecretRevealed(hasRevealedToday)
    }
  }

  const revealSecretNote = () => {
    if (!canRevealSecret || secretRevealed) return

    const randomSecret = CONSTANT.secretNotes[Math.floor(Math.random() * CONSTANT.secretNotes.length)]
    setNotes((prev) => [randomSecret, ...prev])

    const today = new Date().toLocaleDateString('sv-SE');
    localStorage.setItem("lastSecretReveal", today)
    localStorage.setItem("secretRevealedToday", "true")

    setCanRevealSecret(false)
    setSecretRevealed(true)
  }

  return (
    <div className="pageContainer">
      <header className="header">
        <PageTitle
            text="Pequeños Momentos"
            size="4rem"
            weight="800"
        />
      </header>

      <div className="controlsContainer">
        {canRevealSecret && !secretRevealed && (
          <button onClick={revealSecretNote} className="secretButton">
            DESCUBRE UNA MÁS
          </button>
        )}
      </div>

      <div className="contentSection">
        <div className="viewToggle">
          <button className={`toggleButton ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>
            <LayoutGrid size={20} />
          </button>
          <button className={`toggleButton ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>
            <StretchHorizontal size={20} />
          </button>
        </div>

        <div className={`notesContainer ${viewMode === "grid" ? "gridView" : "listView"}`}>
          {notes.map((note, index) => (
            <StickyNote key={note.id} note={note} viewMode={viewMode} animationDelay={index * 0.1} />
          ))}
        </div>
      </div>
    </div>
  )
}
