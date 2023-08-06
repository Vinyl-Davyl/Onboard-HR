import React, { useEffect } from "react";
import "./EmployeeSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/infoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_STORE_VALUE,
  selectTotalEmployeeValue,
} from "../../../redux/features/employee/employeeSlice";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const employeeIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfServiceIcon = <BsCartX size={40} color="#fff" />;

// Format Amount function(add comma 4 figs above.. $30,550.00)
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const EmployeeSummary = ({ employees }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalEmployeeValue);

  // dispatching CALC_STORE_VALUE first, so access to totalStoreValue
  useEffect(() => {
    dispatch(CALC_STORE_VALUE(employees));
  }, [dispatch, employees]);

  return (
    <div className="employee-summary">
      <h3 className="--mt">Employee Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={employeeIcon}
          title={"Total Employees"}
          count={employees.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Employees Value"}
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}`}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfServiceIcon}
          title={"Out of Stock"}
          count={"0"}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={"0"}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default EmployeeSummary;
