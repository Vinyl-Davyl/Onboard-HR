import React, { useState } from "react";
import styles from "./auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Forgot = () => {
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const forgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter an email");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/users/forgotpassword`,
        userData
      );
      toast.success(response.data.message);

      setEmail("");
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={forgotPassword}>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Email
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Forgot;

// const initialState = {
//   email: "",
//   password: "",
// };
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState(initialState);
//   const { email, password } = formData;

//   const validateEmail = (email) => {
//     return email.match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       return toast.error("Please fill in all fields");
//     }
//     if (!validateEmail(email)) {
//       return toast.error("Please enter a valid email");
//     }

//     const userData = {
//       email,
//       password,
//     };
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         `${BACKEND_URL}/api/users/forgotpassword`
//         );
//       await dispatch(SET_LOGIN(true));
//       await dispatch(SET_NAME(response.data.name));
//       toast.success(response.data.message);
//       navigate("/dashboard");
//       setIsLoading(false);

//       console.log(response);

//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       toast.error(message);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={`container ${styles.auth}`}>
//       {isLoading && <Loader />}
//       <Card>
//         <div className={styles.form}>
//           <div className="--flex-center">
//             <BiLogInCircle size={35} color="#999" />
//           </div>
//           <h2>Login</h2>

//           <form onSubmit={handleLoginSubmit}>
//             <input
//               type="email"
//               placeholder="Email"
//               required
//               name="email"
//               value={email}
//               onChange={handleInputChange}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               required
//               name="password"
//               value={password}
//               onChange={handleInputChange}
//             />
//             <button type="submit" className="--btn --btn-primary --btn-block">
//               Login
//             </button>
//           </form>
//           <Link to="/forgot">Forgot Password</Link>

//           <span className={styles.register}>
//             <Link to="/">Home</Link>
//             <p>&nbsp; Don't have an account? &nbsp;</p>
//             <Link to="/register">Register</Link>
//           </span>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Login;
