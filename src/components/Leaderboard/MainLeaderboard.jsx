import React, { useState, useRef, useContext } from "react";
import { ApiContext } from "../../js/api";
import RestWinners from "./RestWinners";
import TopWinners from "./TopWinners";
import SeeButton from "../../SeeButton";

function MainLeaderBoard({ topData, restData, winner }) {
  const { isLive } = useContext(ApiContext);

  const restBoard = useRef(null);
  const [active, setActive] = useState(true);

  const handleChangeActive = () => {
    setActive((previous) => {
      return !previous;
    });
    if (!active) {
      restBoard.current.scrollTop = 0;
    }
  };

  return (
    <>
      {winner?.count === 0 ? (
        <div className="no-data d-flex al-center jc-center">No data</div>
      ) : (
        <>
          <div className="main-leaderboard">
            <div className="rank-section">
              <div className="rank-section-inner">
                <div className="top-position-holders">
                  {topData?.map(
                    (
                      {
                        nickname,
                        userScore,
                        userLevel,
                        actorLevel,
                        portrait,
                        userId,
                        expectBeans,
                      },
                      index
                    ) => {
                      return (
                        <div className="user-container" key={index}>
                          <TopWinners
                            userName={nickname}
                            userScore={userScore}
                            userAvatar={portrait}
                            userId={userId}
                            index={index}
                            userLevel={userLevel}
                            actorLevel={actorLevel}
                            expectBeans={expectBeans}
                            isLive={isLive}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="rest-winners">
                  <div
                    ref={restBoard}
                    className={
                      active
                        ? "rest-position-holders "
                        : "rest-position-holders rest-position-holders-max"
                    }
                    style={{ height: "84vw" }}
                  >
                    {restData &&
                      restData?.map(
                        (
                          {
                            nickname,
                            userScore,
                            userLevel,
                            actorLevel,
                            portrait,
                            userId,
                            expectBeans,
                          },
                          index
                        ) => (
                          <div key={index}>
                            <RestWinners
                              userName={nickname}
                              userScore={userScore}
                              userAvatar={portrait}
                              index={index}
                              userId={userId}
                              listNumber={index + 4}
                              userLevel={userLevel}
                              actorLevel={actorLevel}
                              expectBeans={expectBeans}
                              isLive={isLive}
                            />
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
              {restData?.length > 10 ? (
                <SeeButton
                  active={active}
                  handleChangeActive={handleChangeActive}
                />
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MainLeaderBoard;
