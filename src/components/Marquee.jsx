import React, { useContext } from "react";
import unknown from "../assets/unknown.png";
import FastMarquee from "react-fast-marquee";
import tickertape_box from "../assets/tickertape_box.png";
import { ApiContext } from "../js/api";
import { slicePlease } from "../js/helper";

function Marque() {
  const { tickerTape } = useContext(ApiContext);
  let marqData = tickerTape?.list && tickerTape?.list;

  let marqueeData = slicePlease(marqData, 0, 3);

  return (
    <>
      {marqueeData?.length == 0 ? null : (
        <div className="marque-container">
          <FastMarquee
            direction="left"
            gradient={false}
            gradientColor={[0, 0, 0]}
            speed={100}
          >
            {marqueeData?.map((item, index) => {
              const name = item.nickname;
              const nickName = name.slice(0, 6);
              const userId = item.userId;
              return (
                <div className="marquee-alternative">
                  <div className="taxts">
                    <div className="uu-image">
                      <a
                        className="d-flex jc-center al-center"
                        href={`http://www.kktv1.com/m/?roomid=${userId}`}
                      >
                        <img
                          src={item.portrait ? item.portrait : unknown}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="text">
                      <div className="content">
                        <span>Top</span> <span> 1</span>
                        <span className="nick-name">{nickName}</span>
                        <p>has Opened </p>
                        <span>{item.userScore}</span>
                        <span className="c-white">Mystery bag.</span>
                      </div>
                    </div>
                    <div className="bt-image">
                      <a
                        className="d-flex jc-center al-center"
                        href={`http://www.kktv1.com/m/?roomid=${userId}`}
                      >
                        <img src={tickertape_box} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </FastMarquee>
        </div>
      )}
    </>
  );
}

export default Marque;
