import React, { useState } from "react";
import EmployeeForm from "../../components/employeeForm/EmployeeForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployee,
  selectIsLoading,
} from "../../redux/features/employee/employeeSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(initialState);
  // processing image uniquely
  const [employeeImage, setEmployeeImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  // isLoading state from redux
  const isLoading = useSelector(selectIsLoading);

  // destructuring employee data
  const { name, category, price, quantity } = employee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageChange = (e) => {
    setEmployeeImage(e.target.files[0]);
    // access to preview file from employeeImg
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // unique identifier-no SKU product/employee/stock keeping unit
  const generateSKU = (category) => {
    // extract first 3 letter of category
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  // save employee to DB
  const saveEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSKU(category));
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", employeeImage);

    console.log(...formData);

    await dispatch(createEmployee(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Employee</h3>
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

export default AddEmployee;
