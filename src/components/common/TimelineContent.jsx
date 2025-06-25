// src/components/common/TimelineContentjsx
import TimelineItem from "../animations/TimelineItem"
import "../../styles/common/Timeline.css"


const TimelineContent = ({ items = [] }) => {
  return (
    <div className="timelineContainer">
      <div className="timelineWrapper">
        <div className="timelineLine"></div>
        {items.map((item, index) => (
          <TimelineItem
            key={item.id || index}
            image={item.image}
            title={item.title}
            description={item.description}
            subTitle={item.subTitle}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default TimelineContent;
