import React, { useEffect, useState } from "react";
import "./Profile.scss";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch } from "react-redux";
import { getUser } from "../../services/authService";
import { SET_NAME, SET_USER } from "../../redux/features/authSlice";
import { SpinnerImg } from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

const Profile = () => {
  // redirect if user is logged out
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, selectIsLoading] = useState(null);

  //   fetch from auth service getProfile api and call on redux
  useEffect(() => {
    selectIsLoading(true);
    async function getUserData() {
      // calling from api
      const data = await getUser();
      console.log(data);

      setProfile(data);
      selectIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    // call function
    getUserData();
  }, [dispatch]);

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
          <p>Something went wrong, please reload the page...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="profilepic" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name : </b> {profile?.name}
              </p>
              <p>
                <b>Email : </b> {profile?.email}
              </p>
              <p>
                <b>Phone : </b> {profile?.phone}
              </p>
              <p>
                <b>Bio : </b> {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
