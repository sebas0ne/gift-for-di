// src/components/animations/TimelineItem.jsx
import { useEffect, useRef, useState } from "react"
import "../../styles/animations/TimelineItem.css"

const TimelineItem = ({ image, title, subTitle, description, index }) => {
  const itemRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    )

    const currentRef = itemRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <div
      ref={itemRef}
      className={`timelineItemContainer ${isVisible ? "timelineItemVisible" : ""}`}
      style={{ "--animation-delay": `${(index * 0.05).toFixed(1)}s` }}
    >
      <div className="timelineItemDot"></div>
      <div className="timelineItemContent">
        <div className="polaroidContainerTimeline">
          <div className="polaroidFrame">
          {isLoading && <div className="polaroidLoader"></div>}
            <img src={image} alt={title} className="polaroidImageTimeline" onLoad={() => setIsLoading(false)} />
            <div className="polaroidTitle">{subTitle}</div>
            <div className="noteDivider"></div>
            <div className="polaroidSubTitle">{title}</div>
          </div>
        </div>
        <div className="timelineItemDescription">{description}</div>
      </div>
    </div>
  )
}

export default TimelineItem
