import React, { useEffect } from "react";
import "./EmployeeDetail.scss";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../../redux/features/authSlice";
import Card from "../../card/Card";
import { getEmployee } from "../../../redux/features/employee/employeeSlice";
import { SpinnerImg } from "../../loader/Loader";
import DOMPurify from "dompurify";

const EmployeeDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  // similar to dashboard state, using employee only this time
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { employee, isLoading, isError, message } = useSelector(
    (state) => state.employee
  );

  const onboardStatus = (rating) => {
    if (rating > 0) {
      return <span className="--color-success">On Board</span>;
    }
    return <span className="--color-danger">Off Board</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getEmployee(id));
      //console.log(employee);
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="employee-detail">
      <h3 className="-mt">Employee Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {employee && (
          <div className="detail">
            <Card cardClass="group">
              {/* added optional chaning to check if employee has an image, then load. if doesn't try an error! (to avoid poss error on img still loading)*/}
              {employee?.image ? (
                <img
                  src={employee.image.filePath}
                  alt={employee.image.fileName}
                />
              ) : (
                <p>No image set for this employee</p>
              )}
            </Card>
            <h4>Employee Availability: {onboardStatus(employee.rating)}</h4>
            <hr />
            <h4>
              <span className="badge">Name:</span> &nbsp; {employee.name}
            </h4>
            <p>
              <b>&rarr; SKU:</b>
              &nbsp; {employee.sku}
            </p>
            <p>
              <b>&rarr; Category:</b>
              &nbsp; {employee.category}
            </p>
            <p>
              <b>&rarr; Employee Salary:</b>
              &nbsp; {"$"} {employee.salary}
            </p>
            <p>
              <b>&rarr; Rating Onboard:</b>
              &nbsp; {employee.rating}
            </p>
            <p>
              <b>&rarr; Value:</b>
              &nbsp; {"$"} {employee.salary * employee.rating}
            </p>
            <hr />
            {/* using Dompurify to clean HTML saved data before displaying on page */}
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(employee.desciption),
              }}
            ></div>
            <code className="--color-dark">
              {employee.createdAt && (
                <span>
                  Onboarded at: {employee.createdAt.toLocaleString("en-US")}
                </span>
              )}
            </code>
            <br />
            <code className="--color-dark">
              {employee.updatedAt && (
                <span>
                  Last updated: {employee.updatedAt.toLocaleString("en-US")}
                </span>
              )}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EmployeeDetail;
