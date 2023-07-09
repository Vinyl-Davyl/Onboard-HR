import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginStatus } from "../services/authService";
import { SET_LOGIN } from "../redux/features/authSlice";
import { toast } from "react-toastify";

// path passed here, to be called when used, used in redirecting or changing user to wherever path specified on session expiry
const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast.info("Sessiobn expired, please login again");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
