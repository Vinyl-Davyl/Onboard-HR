import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./EmployeeList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_EMPLOYEES,
  selectFilteredEmployees,
} from "../../../redux/features/employee/filterSlice";

const EmployeeList = ({ employees, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredEmployees = useSelector(selectFilteredEmployees);
  const dispatch = useDispatch();

  // shorten text function on long employee names
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  // give fileteredEmployee state on map of search employees, using reducer FILTER_EMPLOYEES
  useEffect(() => {
    dispatch(FILTER_EMPLOYEES({ employees, search }));
  }, [employees, search, dispatch]);

  return (
    <div className="employee-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Employee List</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && employees.lenght === 0 ? (
            <p>-- No employee found, please add an employee...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Salary</th>
                  <th>Rating</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((employee, index) => {
                  const { _id, name, category, salary, rating } = employee;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{category}</td>
                      <td>
                        {"$"}
                        {salary}
                      </td>
                      <td>{rating}</td>
                      <td>
                        {"$"}
                        {salary * rating}
                      </td>
                      <td className="icons">
                        <span>
                          <AiOutlineEye size={25} color={"purple"} />
                        </span>
                        <span>
                          <FaEdit size={20} color={"green"} />
                        </span>
                        <span>
                          <FaTrashAlt size={20} color={"red"} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
                ;
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
