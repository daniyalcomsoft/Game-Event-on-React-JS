import React from "react";
import unknown from "../../assets/unknown.png";
import frame1 from "../../assets/frame1.png";
import frame2 from "../../assets/frame2.png";
import frame3 from "../../assets/frame3.png";
import { actorURL, captureImageError, goTo } from "../../js/helper";

function TopWinners({ userName, userScore, userAvatar, userId, index, actorLevel,isLive}) {
    const rank= index+1

  return (
    <div className="innerData f-Heinemann">
      <div className={rank == 1 ? "first-user p-rel" : "runner-user p-rel"}>
        <img onError={captureImageError} className="rank-user-image" src={userAvatar ? userAvatar : unknown} alt="" />
        <div
          onClick={() => {
            goTo(isLive, userId, userId);
          }}
        >
          <img className="rank-border-image p-rel" src={rank == 1 ? frame1 : rank == 2 ? frame2 : frame3} alt="" />
        </div>
      </div>
      <div className={rank == 1 ? "bottom-data1" : rank == 2 ? "bottom-data2" : "bottom-data3"}>
        <div className="bottom-info d-flex al-center jc-center fd-column">
          <div className="username">{userName && userName.slice(0, 12)}</div>
          <img style={{ width: "6vw" }} src={actorURL + actorLevel + ".png"} alt="" />
        </div>
        <div className="score-box d-flex fd-column al-center">
          <div className="score d-flex al-center">
            <div className="d-flex al-center jc-center">
              <span>{userScore}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopWinners;

