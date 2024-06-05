import React, { useContext, useState } from "react";

import leaderboard_name from "../assets/leaderboard_name.png";
import close_button from "../assets/close_button.png";
import talent_selected from "../assets/talent_selected.png";
import talent_unselected from "../assets/talent_unselected.png";
import user_selected from "../assets/user_selected.png";
import user_unselected from "../assets/user_unselected.png";
import reward_banner from "../assets/reward_banner.png";
import reward_bg from "../assets/reward_bg.png";
import leader_board from "../assets/Leaderboard.png";
import box_2 from "../assets/box_2.png";

import hourly_unselected from "../assets/hourly_unselected.png";
import hourly_selected from "../assets/hourly_selected.png";
import daily_unselected from "../assets/daily_unselected.png";
import daily_selected from "../assets/daily_selected.png";
import overall_unselected from "../assets/overall_unselected.png";
import overall_selected from "../assets/overall_selected.png";

import current_button from "../assets/current_button.png";
import previous_button from "../assets/previous_button.png";

import SliderItems from "./rewards-slider/SliderItems";
import SubButtons from "./SubButtons";
import { ApiContext } from "../js/api";
import TopWinners from "./Leaderboard/TopWinners";
import MainLeaderBoard from "./Leaderboard/MainLeaderboard";
import { slicePlease } from "../js/helper";

const Leaderboard = ({ leaderboard, close }) => {
  const {
    beansHourlySendCurrent,
    beansHourlySendPrevious,
    beansHourlyReceivedCurrent,
    beansHourlyReceivedPrevious,
    beansDailySendCurrent,
    beansDailySendPrevious,
    beansDailyReceivedCurrent,
    beansDailyReceivedPrevious,
    beansTotalSendCurrent,
    beansTotalSendPrevious,
    beansTotalReceivedCurrent,
    beansTotalReceivedPrevious,
  } = useContext(ApiContext);
  const [lbTabs, setlbTabs] = useState({
    talent: true,
    user: false,
  });

  const lbMainnTabSwitch = (id) => {
    let newCat = {
      talent: false,
      user: false,
    };
    setlbTabs({ ...newCat, [id]: true });
  };

  const [lbRewardsTabs, setlbRewardsTabs] = useState({
    hourly: true,
    daily: false,
    overall: false,
  });

  const rewardsTabSwitch = (id) => {
    let newCat = {
      hourly: false,
      daily: false,
      overall: false,
    };
    setlbRewardsTabs({ ...newCat, [id]: true });
  };

  const [lbDaysTabs, setlbDaysTabs] = useState({
    hourly: true,
    daily: false,
    overall: false,
  });

  const lbDaysTabSwitch = (id) => {
    let newCat = {
      hourly: false,
      daily: false,
      overall: false,
    };
    setlbDaysTabs({ ...newCat, [id]: true });
  };

  const [lbSubBtns, setlbSubBtns] = useState({
    current: true,
    previous: false,
  });

  const lbSubBtnsSwitch = (id) => {
    let newCat = {
      current: false,
      previous: false,
    };
    setlbSubBtns({ ...newCat, [id]: true });
  };

  let winners;
  if (lbTabs.talent) {
    if (lbDaysTabs.hourly) {
      if (lbSubBtns.current) {
        winners = beansHourlyReceivedCurrent;
      } else if (lbSubBtns.previous) {
        winners = beansHourlyReceivedPrevious;
      }
    } else if (lbDaysTabs.daily) {
      if (lbSubBtns.current) {
        winners = beansDailyReceivedCurrent;
      } else if (lbSubBtns.previous) {
        winners = beansDailyReceivedPrevious;
      }
    } else if (lbDaysTabs.overall) {
      if (lbSubBtns.current) {
        winners = beansTotalReceivedCurrent;
      } else if (lbSubBtns.previous) {
        winners = beansTotalReceivedPrevious;
      }
    }
  } else if (lbTabs.user) {
    if (lbDaysTabs.hourly) {
      if (lbSubBtns.current) {
        winners = beansHourlySendCurrent;
      } else if (lbSubBtns.previous) {
        winners = beansHourlySendPrevious;
      }
    } else if (lbDaysTabs.daily) {
      if (lbSubBtns.current) {
        winners = beansDailySendCurrent;
      } else if (lbSubBtns.previous) {
        winners = beansDailySendPrevious;
      }
    } else if (lbDaysTabs.overall) {
      if (lbSubBtns.current) {
        winners = beansTotalSendCurrent;
      } else if (lbSubBtns.previous) {
        winners = beansTotalSendPrevious;
      }
    }
  }

  const array = winners ? winners?.list : [];
  const topData = slicePlease(array, 0, 3);
  const restData = slicePlease(array, 3, array?.length);

  return (
    <div
      className="overlay"
      style={{ visibility: leaderboard ? "visible" : "hidden" }}
    >
      <div className="leader_board">
        <img src={leaderboard_name} alt="" className="leaderboard_name" />
        <img src={close_button} onClick={close} className="close_btn" />
        <div className="full_board">
          <div className="top-buttons">
            <button onClick={() => lbMainnTabSwitch("talent")}>
              <img
                src={lbTabs.talent ? talent_selected : talent_unselected}
                className="talent"
              />
            </button>
            <button onClick={() => lbMainnTabSwitch("user")}>
              <img
                src={lbTabs.user ? user_selected : user_unselected}
                className="user"
              />
            </button>
          </div>

          <div className="rewards-section p-rel d-flex al-center jc-center fd-column">
            <img src={reward_banner} alt="" className="reward_title m-auto" />
            <div className="reward_box d-flex fd-column al-center jc-center m-auto p-rel">
              <SubButtons
                rewardsTabSwitch={rewardsTabSwitch}
                lbRewardsTabs={lbRewardsTabs}
              />
              <SliderItems />
            </div>
          </div>

          <div className="leaderboard-section p-rel">
            <img
              className="leaderboard-title p-abs"
              src={leader_board}
              alt=""
            />
            <div className="box_two d-flex al-center jc-start fd-column">
              <div className="lb_buttons d-flex al-center jc-center">
                <button onClick={() => lbDaysTabSwitch("hourly")}>
                  <img
                    src={
                      lbDaysTabs.hourly ? hourly_selected : hourly_unselected
                    }
                    alt=""
                  />
                </button>
                <button onClick={() => lbDaysTabSwitch("daily")}>
                  <img
                    src={lbDaysTabs.daily ? daily_selected : daily_unselected}
                    alt=""
                  />
                </button>
                <button onClick={() => lbDaysTabSwitch("overall")}>
                  <img
                    src={
                      lbDaysTabs.overall ? overall_selected : overall_unselected
                    }
                    alt=""
                  />
                </button>
              </div>
              <div className="cp_button d-flex al-center jc-center p-rel">
                <div className="cpbtn_images d-flex al-center jc-center p-abs">
                  <button onClick={() => lbSubBtnsSwitch("current")}>
                    {lbSubBtns.current ? (
                      <img src={current_button} alt="" className="cb_img" />
                    ) : null}
                  </button>
                  <button onClick={() => lbSubBtnsSwitch("previous")}>
                    {lbSubBtns.previous ? (
                      <img src={previous_button} alt="" className="pb_img" />
                    ) : null}
                  </button>
                </div>
              </div>
            </div>
            <MainLeaderBoard
              topData={topData}
              restData={restData}
              winner={winners}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
