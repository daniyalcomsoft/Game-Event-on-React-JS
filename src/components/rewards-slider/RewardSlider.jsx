import React, { useEffect, useState } from "react";
import leftArrow from "../../assets/Left-arrow.png";
import rightArrow from "../../assets/Right-arrow.png";
import { useSwipeable } from "react-swipeable";

export const CarouselItem = ({ children }) => {
  return <div className="carousel-item">{children}</div>;
};

const RewardSlider = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [highlightLeftArrow, setHighlightLeftArrow] = useState(false);
  const [highlightRightArrow, setHighlightRightArrow] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
        setHighlightLeftArrow(false);
        setHighlightRightArrow(true);
      }
    }, 155555555555500);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });
  const onClickLeft = () => {
    updateIndex(activeIndex - 1);
    setPaused(false);
    setHighlightLeftArrow(true);
    setHighlightRightArrow(false);
  };
  const onClickRight = () => {
    updateIndex(activeIndex + 1);
    setPaused(false);
    setHighlightLeftArrow(false);
    setHighlightRightArrow(true);
  };
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      updateIndex(activeIndex + 1);
      setHighlightLeftArrow(true);
      setHighlightRightArrow(false);
    },
    onSwipedRight: () => {
      updateIndex(activeIndex - 1);
      setHighlightLeftArrow(false);
      setHighlightRightArrow(true);
    },
  });

  return (
    <div {...handlers} className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="slide-buttons p-abs d-flex">
        <div>
          <img className={highlightLeftArrow ? "gray-0" : "gray-1"} src={leftArrow} alt="" onClick={onClickLeft} />
        </div>
        <div>
          <img className={highlightRightArrow ? "gray-0" : "gray-1"} src={rightArrow} alt="" onClick={onClickRight} />
        </div>
      </div>
      {/* <div className="indicators">
        {React.Children.map(children, (child, index) => {
          return (
            <span
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            ></span>
          );
        })}
      </div> */}
    </div>
  );
};

export default RewardSlider;
