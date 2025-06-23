import { useState, useEffect } from "react"

export default function StickyNote({ note, viewMode, animationDelay }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, animationDelay * 1000)

    return () => clearTimeout(timer)
  }, [animationDelay])

  const handleClick = () => {
    if (isExpanded) {
      setIsExpanded(false)
    } else {
      setIsAnimating(true)
      setIsExpanded(true)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }

  const noteStyle = {
    animationDelay: `${animationDelay}s`,
  }

  return (
    <div
      className={`stickyNote ${viewMode} ${isExpanded ? "expanded" : ""} ${isAnimating ? "animating" : ""} ${isVisible ? "visible" : ""}`}
      style={noteStyle}
      onClick={handleClick}
    >
      <div className="noteContent">
        <div className="noteTitle">{note.title}</div>

        {isExpanded && (
          <div className="noteExpandedContent">
            <div className="noteDivider"></div>
            <p className="noteDescription">{note.content}</p>
          </div>
        )}
      </div>
    </div>
  )
}
