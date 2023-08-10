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
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  getEmployees,
  deleteEmployee,
} from "../../../redux/features/employee/employeeSlice";
import { Link } from "react-router-dom";

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

  // Using package to delete employee
  const delEmployee = async (id) => {
    await dispatch(deleteEmployee(id));
    // after deleting, refresh page and get all employee
    await dispatch(getEmployees());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Employee",
      message: "Are you sure you want to delete this employee data?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delEmployee(id),
        },
        {
          label: "Cancel",
          //onClick: () => alert("Click No"),
        },
      ],
    });
  };

  // Paginate Intro
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 2;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    // currentItems replaces filteredEmployees on map, hence adding filteredEmployees to useEffect here
    setCurrentItems(filteredEmployees.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredEmployees.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredEmployees]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredEmployees.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  //  Paginate Outro

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
                {currentItems.map((employee, index) => {
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
                          <Link to={`/employee-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <FaEdit size={20} color={"green"} />
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default EmployeeList;
