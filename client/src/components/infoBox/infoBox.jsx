import React from "react";
import "./infoBox.scss";

const infoBox = ({ bgColor, title, count, icon }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className="info-icon --color-white">{icon}</span>
      <span className="infor-text">
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </div>
  );
};

export default infoBox;
