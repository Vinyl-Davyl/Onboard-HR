import React, { useEffect, useState } from "react";
import "./Profile.scss";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch } from "react-redux";
import { getUser } from "../../services/authService";
import { SET_NAME, SET_USER } from "../../redux/features/authSlice";

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

  return <div>Profile</div>;
};

export default Profile;
