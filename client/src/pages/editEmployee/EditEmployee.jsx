import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployee,
  getEmployees,
  selectEmployee,
  selectIsLoading,
  updateEmployee,
} from "../../redux/features/employee/employeeSlice";
import Loader from "../../components/loader/Loader";
import EmployeeForm from "../../components/employee/employeeForm/EmployeeForm";

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  // holds info about particular employee being edited
  const employeeEdit = useSelector(selectEmployee);

  // initialState changed to employee edit
  const [employee, setEmployee] = useState(employeeEdit);
  // processing image uniquely
  const [employeeImage, setEmployeeImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  // on page reload, employee saves inside employeeEdit
  useEffect(() => {
    dispatch(getEmployee(id));
  }, [dispatch, id]);

  useEffect(() => {
    setEmployee(employeeEdit);

    setImagePreview(
      employeeEdit && employeeEdit.image
        ? `${employeeEdit.image.filePath}`
        : null
    );

    setDescription(
      employeeEdit && employeeEdit.description ? employeeEdit.description : ""
    );
  }, [employeeEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageChange = (e) => {
    setEmployeeImage(e.target.files[0]);
    // access to preview file from employeeImg
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // save employee to DB
  const saveEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", employee?.name);
    formData.append("category", employee?.category);
    formData.append("salary", employee?.salary);
    formData.append("rating", employee?.rating);
    // already a description state
    formData.append("description", description);
    if (employeeImage) {
      formData.append("image", employeeImage);
    }

    console.log(...formData);

    await dispatch(updateEmployee({ id, formData }));
    await dispatch(getEmployees());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Employee</h3>
      <EmployeeForm
        employee={employee}
        employeeImage={employeeImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveEmployee={saveEmployee}
      />
    </div>
  );
};

export default EditEmployee;
