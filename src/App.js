import React, { useContext, useEffect, useState } from "react";
import "./App.scss";
import leaderboard_button from "./assets/leaderboard_button.png";
import My_Jumps from "./assets/My_Jumps.png";
import Guide_button from "./assets/Guide_button.png";
import reward_history_icon from "./assets/reward_history_icon.gif";
import tile_Position_icon from "./assets/tile_Position_icon.png";
import charcter_left from "./assets/charcter_left.gif";
import charcter_right from "./assets/charcter_right.gif";
import Marque from "./components/Marquee";
import mascot from "./assets/Front_position.gif";
import mascotRight from "./assets/right-jump.gif";
import mascotLeft from "./assets/left-jump.gif";
import jump_button from "./assets/jump_button.gif";
import manual_btn from "./assets/manual_btn.png";
import auto_btn from "./assets/auto_btn.png";
import Leaderboard from "./components/Leaderboard";
import { tilesArray } from "./js/data";
import { callingApi, rewardImages, success, unsuccess } from "./js/helper";
import { baserUrl } from "./js/baseURL";
import { ApiContext } from "./js/api";
import close_button from "./assets/close_button.png";
import broke_tile from "./assets/broke_tile.gif";

const calculateWidthAndHeight = (index, ct, initialWidth, initialHeight) => {
  let distanceToCurrentTile = Math.abs(index - ct + 0.8);
  if (distanceToCurrentTile > 25 / 2) {
    distanceToCurrentTile = 25 - distanceToCurrentTile;
  }
  const scaleFactor = 1 - 0.1 * Math.min(distanceToCurrentTile, 7.5);
  const width = initialWidth * scaleFactor;
  const height = initialHeight * scaleFactor;

  if (ct === index) {
    return { width: 54, height: 22 };
  } else {
    return { width, height, finwidth: width, finheight: height };
  }
};
const App = () => {
  let current = 0;
  const { userId, userToken, userInfo } = useContext(ApiContext);
  const [leaderboard, setLeaderboard] = useState(false);
  const [input, setInput] = useState(1);
  const [error, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [type, setType] = useState(0);
  const [currentTile, setCurrentTile] = useState(0);
  const myChances = 1000000;
  const [alert, setAlert] = useState(false);
  const [oops, setoops] = useState(false);
  const [whoopie, setwhoopie] = useState(false);
  const [popup, setPopup] = useState([]);
  const [location, setlocation] = useState("");
  const [selectBtns, setselectBtns] = useState({
    manual: true,
    auto: false,
  });
  const [mascotPosition, setMascotPosition] = useState({ x: 0, y: 24 });

  const uInfoLocation = userInfo && userInfo?.location;
  const underscoreIndex = uInfoLocation?.indexOf("_");
  const apiLocation = uInfoLocation?.slice(underscoreIndex + 1);

  // On component mount, retrieve values from localStorage
  // useEffect(() => {
  //   const savedCurrentTile = parseInt(localStorage.getItem("currentTile")) || 0;
  //   const savedLocation = localStorage.getItem("location") || "";
  //   setCurrentTile(savedCurrentTile);
  //   setlocation(savedLocation);

  //   const initialPosition =
  //     savedCurrentTile === 0
  //       ? { x: 0, y: 24 }
  //       : { x: savedLocation === "L" ? -50 : 50, y: 55 };
  //   setMascotPosition(initialPosition);
  // }, []);

  const moveMascot = (id, choice) => {
    if (currentTile === 0) {
      setMascotPosition({ x: choice === "L" ? -50 : 50, y: 55 });
    } else {
      setMascotPosition({ x: choice === "L" ? -40 : 40, y: 75 });
    }
    setTimeout(() => {
      setMascotPosition({ x: choice === "L" ? -50 : 50, y: 55 });
      setCurrentTile(id);
      localStorage.setItem("currentTile", id);
      localStorage.setItem("location", choice);
    }, 1000);
  };

  const btnsSwitch = (id) => {
    let newCat = {
      manual: false,
      auto: false,
    };
    setselectBtns({ ...newCat, [id]: true });
    if (id === "manual") {
      setType(0);
    } else if (id === "auto") {
      setType(1);
    }
  };

  const handleInput = (event) => {
    let value = event.target.value;
    let max = myChances < 99 ? myChances : 99;
    let val = value.replace(/[^0-9]/g, "");
    let number =
      parseInt(val) > max ? max : parseInt(val) <= 0 ? 1 : parseInt(val);
    setInput(number);
    if (event.target.value === "") {
      setError("Enter some value");
      setButtonDisabled(true);
    } else {
      setError("");
      setButtonDisabled(false);
    }
  };

  const close = () => {
    setLeaderboard(false);
    setAlert(false);
    setoops(false);
    setwhoopie(false);
    setButtonDisabled(false);
  };

  const toogleLeaderboard = () => {
    setLeaderboard(true);
  };
  const [autoLocation, setAutoLocation] = useState("");
  const jump = (location) => {
    setButtonDisabled(true);
    if (myChances < 25000) {
      setoops(true);
      setAlert(true);
      setPopup(
        unsuccess(
          <div className="d-flex fd-column jc-center al-center gap-2">
            {/* <div className="head-text p-abs">Oops!</div> */}
            <div>
              Sorry champ, we understand your excitement to play, but in order
              to start playing, please spend 25k Beans on event gifts.
            </div>
          </div>
        )
      );
    } else {
      callingApi(
        `${baserUrl}api/activity/tile/playGame?type=${type}&playCount=${input}&location=${
          type === 0 ? location : apiLocation
        }`,
        userId,
        userToken
      )
        .then(function (response) {
          if (response.errorCode === 0) {
            if (response?.data?.loseCount === 1) {
              setwhoopie(true);
              setAlert(true);
              setPopup(
                success(
                  <div className="d-flex fd-column jc-center al-center gap-2">
                    {/* <div className="head-text p-abs">Whoopie!</div> */}
                    <div>
                      It looks like you slipped. Don't worry, try again!
                    </div>
                  </div>
                )
              );
            } else {
              setAlert(true);
              setPopup(
                success(
                  <div className="d-flex fd-column jc-center al-center gap-2">
                    {/* <div className="head-text p-abs">Excellent bounce!</div> */}
                    <div className="rews-box d-flex al-start jc-center">
                      <strong>Congratulations!</strong> You just travelled X
                      (the number of tiles) tiles in your jump and won
                      {response?.data?.rewardDTOList.map((item, index) => {
                        return (
                          <div
                            className="d-flex al-center jc-center fd-column gap-1"
                            key={index}
                            style={{ width: "25%" }}
                          >
                            <div className="reward-img d-flex al-center jc-center">
                              <img src={rewardImages(item?.desc)} alt="" />
                            </div>
                            <div className="name c-yellow">
                              <div className="c-yellow">{item.desc}</div>x{" "}
                              {item?.desc == "Beans" ? (
                                item?.count
                              ) : (
                                <>
                                  {item.count}{" "}
                                  {item.count === 1 ? "day" : "days"}
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              );

              if (type === 1) {
                const autoLoc = response.data.location; // Use the location from the API response
                setTimeout(() => {
                  moveMascot(response.data.currentIndex, autoLoc);
                }, 100); // Slight delay to ensure state updates do not clash
              }

              // if (type === 1) {
              //   const autoLocation =
              //     response.data.currentIndex % 2 === 0 ? "R" : "L";
              //   // Ensure state updates happen predictably
              //   setlocation(autoLocation);
              //   setTimeout(() => {
              //     moveMascot(response.data.currentIndex, autoLocation);
              //   }, 100); // Slight delay to ensure state updates do not clash
              // }

              // if (type === 1) {
              //   const autoLoc =
              //     response.data.currentIndex % 2 === 0 ? "R" : "L";
              //   setAutoLocation(autoLoc);
              //   setTimeout(() => {
              //     moveMascot(response.data.currentIndex, autoLoc);
              //   }, 100); // Slight delay to ensure state updates do not clash
              // }
            }
          } else {
            setAlert(true);
            setPopup(
              unsuccess(
                <div className="d-flex fd-column jc-center al-center gap-2">
                  <div className="head-text p-abs">Oops</div>
                  <div>{response.msg}</div>
                </div>
              )
            );
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };
  const handleImageClick = (location, id) => {
    setlocation(location);
    jump(location);
    moveMascot(id, location);
  };

  const startIndex = currentTile === 0 ? 0 : currentTile - 1;
  const newArray = Array.from(
    { length: 8 },
    (_, i) => tilesArray[(startIndex + i) % 25]
  );
  return (
    <>
      <div className="App">
        <Marque />
        <div className="topbar">
          <img
            src={leaderboard_button}
            onClick={toogleLeaderboard}
            className="leaderboard"
          />
          <img src={My_Jumps} className="jump" />
          <img src={Guide_button} className="guide" />
        </div>
        <div className="midbar">
          <img src={reward_history_icon} className="reward_history" />
          <img src={tile_Position_icon} className="title_position" />
        </div>
        <div className="bottombar">
          <img src={charcter_left} className="charcter_left" />
          <img src={charcter_right} className="charcter_right" />
        </div>

        <div className="play p-rel">
          <div className="tiles d-flex fd-rew-column al-center jc-center">
            {newArray.map((data, i) => {
              const { width, height } = calculateWidthAndHeight(
                data?.id,
                currentTile === 0 ? 1 : currentTile,
                50,
                15
              );
              const leftImageSource =
                data?.loseCount === 1
                  ? data?.broke_tile
                  : location === "L" && currentTile === data?.id
                  ? data?.left_selected_pic
                  : data?.left_pic;

              const rightImageSource =
                data?.loseCount === 1
                  ? data?.broke_tile
                  : location === "R" && currentTile === data?.id
                  ? data?.right_selected_pic
                  : data?.right_pic;
              return (
                <div
                  id={`tile-${data?.id}`}
                  key={`tile-${data?.id}`}
                  className="p-rel d-flex  al-start jc-center"
                >
                  <button disabled={buttonDisabled}>
                    <img
                      key={`left-${data?.id}`}
                      className={`image${data?.id}`}
                      src={
                        leftImageSource
                        // location === "L" && currentTile === data?.id
                        //   ? data?.left_selected_pic
                        //   : data?.left_pic
                      }
                      onClick={() => handleImageClick("L", data?.id)}
                      style={{
                        width: `${width}vw`,
                        height: `${height}vw`,
                      }}
                    />
                  </button>
                  <button disabled={buttonDisabled}>
                    <img
                      key={`right-${data?.id}`}
                      className={`image${data?.id}`}
                      src={
                        rightImageSource
                        // location === "R" && currentTile === data?.id
                        //   ? data?.right_selected_pic
                        //   : data?.right_pic
                      }
                      onClick={() => handleImageClick("R", data?.id)}
                      style={{
                        width: `${width}vw`,
                        height: `${height}vw`,
                      }}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          <img
            src={
              location === "R"
                ? mascotRight
                : location === "L"
                ? mascotLeft
                : mascot
            }
            alt=""
            className="p-abs mascot"
            style={{
              transition: "all 1s ease",
              left: `${mascotPosition.x}vw`,
              bottom: `${mascotPosition.y}vw`,
            }}
          />

          <div className="input-btns d-flex jc-s-between p-abs">
            <div className="chances d-flex al-center jc-end">
              <input
                className="input-field"
                placeholder="Enter value"
                name="NumInput"
                type="number"
                value={input}
                min={0}
                max={99}
                onChange={handleInput}
              />
            </div>
            <div className="select-btns d-flex al-center jc-center">
              <button
                className="manual"
                onClick={() => {
                  btnsSwitch("manual");
                }}
              >
                {selectBtns.manual ? <img src={manual_btn} alt="" /> : null}
              </button>
              <button
                className="auto"
                onClick={() => {
                  btnsSwitch("auto");
                }}
              >
                {selectBtns.auto ? <img src={auto_btn} alt="" /> : null}
              </button>
            </div>
          </div>
          {selectBtns.auto && (
            <button
              disabled={buttonDisabled}
              className="jump-btn p-abs m-auto"
              onClick={() => {
                jump(location);
              }}
            >
              <img src={jump_button} alt="" />
            </button>
          )}
        </div>
        <Leaderboard leaderboard={leaderboard} close={close} />
      </div>
      <div
        className="overlay"
        style={{ visibility: alert ? "visible" : "hidden" }}
      >
        {alert ? (
          <div
            className="p-rel w-100 d-flex al-start jc-center"
            style={{ height: "100%" }}
          >
            <div className="game-popup d-flex al-center jc-center f-tangoItalic">
              {popup?.map((item, i) => {
                return (
                  <div
                    className={
                      oops
                        ? "container-oops p-rel d-flex al-center jc-center "
                        : whoopie
                        ? "container-whoopie p-rel d-flex al-center jc-center"
                        : "container-success p-rel d-flex al-center jc-center "
                    }
                    key={i}
                    style={{ height: "120vw" }}
                  >
                    <div
                      className="content m-auto p-abs d-flex al-center jc-center"
                      style={{ height: "60vw" }}
                    >
                      <div className="body-text d-flex al-center jc-center fd-column m-auto">
                        {item.data}
                      </div>
                    </div>
                    <div className="modal-close p-abs" onClick={close}>
                      <img src={close_button} alt="Close Button" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default App;
