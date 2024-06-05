import React from "react";
import RewardSlider, { CarouselItem } from "./RewardSlider";
import { rewards } from "../../js/data";
import reward_info_bg from '../../assets/reward-info-bg.png';
function SliderItems() {
  return (
    <>
      <div className="rewards-slider m-auto mt-15">
          <div className="sliderItem d-flex fd-column m-auto p-rel">
            {/* <div className="title p-abs d-flex al-center jc-center c-white f-sweet">Rewards</div> */}
            <RewardSlider>
              {rewards &&
                rewards?.map((item, i) => {
                  let index = i + 1;
                  return (
                    <CarouselItem key={i}>
                      <div className="inner-box d-flex fd-column al-center jc-center f-tangoItalic">
                        {/* <div className="rank d-flex fd-column al-center jc-center p-abs">
                          <span>
                            Top {item.id} {index === 1 ? <sup>st</sup> : index === 2 ? <sup>nd</sup> : <sup>rd</sup>}
                          </span>
                        </div> */}
                        <div className="rewardImg d-flex al-center jc-center">
                          {item?.rewards?.map((data, index) => (
                            <div className="img-box d-flex al-center jc-center" key={index}>
                              <img src={data.pic} alt="" key={index} />
                            </div>
                          ))}
                        </div>
                        <div className="desc d-flex fd-column jc-center al-center">{item.text}</div>
                      </div>
                    </CarouselItem>
                  );
                })}
            </RewardSlider>
          </div>
       
      </div>
    </>
  );
}

export default SliderItems;
