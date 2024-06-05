import React from "react";
import seeMore from "./assets/see-more.png";
import seeLess from "./assets/see-less.png";

function SeeButton({ active, handleChangeActive }) {
  return (
    <div className="see-buttons">
      {active ? (
        <button className="see-more m-auto" onClick={handleChangeActive}>
          <img src={seeMore} alt="" />
        </button>
      ) : (
        <button className="see-less m-auto" onClick={handleChangeActive}>
          <img src={seeLess} alt="" />
        </button>
      )}
    </div>
  );
}

export default SeeButton;
