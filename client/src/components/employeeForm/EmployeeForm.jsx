import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EmployeeForm.scss";
import Card from "../card/Card";

const EmployeeForm = ({
  employee,
  employeeImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveEmployee,
}) => {
  return (
    <div className="add-employee">
      <Card cardClass={"card"}>
        <form onSubmit={saveEmployee}>
          <Card cardClass={"group"}>
            <label>Employee Image</label>
            <code className="--color-dark">
              Supported Format: jpg, jepg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="employee" />
              </div>
            ) : (
              <p>No image set for this employee.</p>
            )}
          </Card>
          <label>Employee Name:</label>
          {/* using optional chaining for displaying name, so incase of no name while fetching from DB for editing, no issue, no display of name */}
          <input
            type="text"
            placeholder="Employee name"
            name="name"
            value={employee?.name}
            onChange={handleInputChange}
          />

          <label>Employee Category:</label>
          <input
            type="text"
            placeholder="Employee Category"
            name="category"
            value={employee?.category}
            onChange={handleInputChange}
          />

          <label>Employee Salary:</label>
          <input
            type="text"
            placeholder="Employee Salary"
            name="price"
            value={employee?.price}
            onChange={handleInputChange}
          />

          <label>Employee Rating:</label>
          <input
            type="text"
            placeholder="Employee Rating"
            name="quantity"
            value={employee?.quantity}
            onChange={handleInputChange}
          />

          <label>Employee Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={EmployeeForm.modules}
            formats={EmployeeForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Employee
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

// Setup React-Quill
EmployeeForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
EmployeeForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default EmployeeForm;
