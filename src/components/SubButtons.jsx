import React from "react";
import hourly_selected from "../assets/hourly_selected.png";
import hourly_unselected from "../assets/hourly_unselected.png";
import daily_selected from "../assets/daily_selected.png";
import daily_unselected from "../assets/daily_unselected.png";
import overall_selected from "../assets/overall_selected.png";
import overall_unselected from "../assets/overall_unselected.png";
function SubButtons({ rewardsTabSwitch, lbRewardsTabs }) {
  return (
    <div className="rewards_btn">
      <button onClick={() => rewardsTabSwitch("hourly")}>
        <img
          src={lbRewardsTabs.hourly ? hourly_selected : hourly_unselected}
          alt=""
          className="hour_btn"
        />
      </button>
      <button onClick={() => rewardsTabSwitch("daily")}>
        <img
          src={lbRewardsTabs.daily ? daily_selected : daily_unselected}
          alt=""
          className="daily_btn"
        />
      </button>
      <button onClick={() => rewardsTabSwitch("overall")}>
        <img
          src={lbRewardsTabs.overall ? overall_selected : overall_unselected}
          alt=""
          className="overall_btn"
        />
      </button>
    </div>
  );
}

export default SubButtons;
