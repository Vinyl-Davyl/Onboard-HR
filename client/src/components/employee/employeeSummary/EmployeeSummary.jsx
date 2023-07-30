import React from "react";
import "./EmployeeSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/infoBox";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const employeeIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

const EmployeeSummary = ({ employees }) => {
  return (
    <div className="employee-summary">
      <h3 className="--mt">Employee Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={employeeIcon}
          title={"Total Employee"}
          count={employees.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Employee Value"}
          count={"0"}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={"0"}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Category"}
          count={"0"}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default EmployeeSummary;
