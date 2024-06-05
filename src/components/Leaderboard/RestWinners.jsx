import React, { useContext } from "react";
import unknown from "../../assets/unknown.png";
import { actorURL, captureImageError, goTo } from "../../js/helper";

function TopWinners({ userName, userScore, userAvatar, userId, index, actorLevel,isLive,listNumber}) {
  return (
    <div className="users-details-onward" key={index}>
    <div className="d-flex gap-2 al-center p-rel jc-center">
      <div className="rank-id d-flex al-center jc-center">{listNumber}.</div>
      <div className="d-flex al-center gap-2">
        <div className="frame d-flex al-center jc-center">
          <div
            className="d-flex jc-center al-center"
            onClick={() => {
              goTo(isLive, userId, userId);
            }}
          >
            <img onError={captureImageError} className="user-image" src={userAvatar ? userAvatar : unknown} alt="" />
          </div>
        </div>
        <div className="user-info d-flex fd-column">
          <span className="username">{userName && userName.slice(0, 8)}</span>
          <img style={{ width: "7vw"}} src={actorURL + actorLevel + ".png"} alt="" />
        </div>
      </div>
    </div>
      <div className="points d-flex al-center jc-center p-rel">
        {/* <img className="p-abs" style={{ width: "7vw", left: "-2vw" }} src={startIcon} alt="" /> */}
        <span>{userScore}</span>
      </div>
    
  </div>
  );
}

export default TopWinners;

