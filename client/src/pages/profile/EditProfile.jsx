import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/authSlice";
import Loader from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  // Due to state of  loosing all info on refresh of page from redux, hence navigate back to profile page
  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setEmployeeImage(e.target.files[0]);
    // access to preview file from employeeImg
    //   setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProfile = (e) => {
    e.preventDefault();
  };

  return (
    <div className="profile --my2">
      {isLoading && <Loader />}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={user?.photo} alt="profilepic" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type="text" name="email" value={profile?.email} disabled />
              <br />
              <code>Email cannot be changed</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type="file" name="image" onChange={handleImageChange} />
            </p>
            <div>
              <button className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
    </div>
  );
};

export default EditProfile;
