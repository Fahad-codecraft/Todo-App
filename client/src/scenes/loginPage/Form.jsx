import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  Snackbar,
	Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index.js";
import { motion } from "framer-motion";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [showSnackbar, setShowSnackbar] = useState(false); // State for controlling the visibility of the snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch("https://todo-app-backend-rho.vercel.app/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    setSnackbarSeverity("info");
    setSnackbarMessage("Checking Credentials...");
    setShowSnackbar(true);
    const loggedInResponse = await fetch("https://todo-app-backend-rho.vercel.app/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (loggedInResponse.status !== 200) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Invalid email or password")
			setShowSnackbar(true);
		} else {
      setSnackbarSeverity("success");
      setSnackbarMessage("Confirmed Credentials..")
      setShowSnackbar(true);
			const loggedIn = await loggedInResponse.json();
      setTimeout(() => {
        onSubmitProps.resetForm();
      }, 1000)
			
			dispatch(
				setLogin({
					user: loggedIn.user,
					token: loggedIn.token,
				})
			);
			setTimeout(() => {
        navigate("/home");
      }, 1000);
		}
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: "span 4",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#545454",
                      borderWidth: "2.5px",
                      borderRadius: "15px",
                    },
                    "& input": {
                      color: "white",
                    },
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                  }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: "span 4",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "gray",
                      borderWidth: "2.5px",
                      borderRadius: "15px",
                    },
                    "& input": {
                      color: "white",
                    },
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                  }}
                />
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              autoComplete="false"
              sx={{
                gridColumn: "span 4",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "gray",
                  borderWidth: "2.5px",
                  borderRadius: "15px",
                },
                "& input": {
                  color: "white",
                },
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 4",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "gray",
                  borderWidth: "2.5px",
                  borderRadius: "15px",
                },
                "& input": {
                  color: "white",
                },
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              className="login-button"
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                borderRadius: "15px",
                color: "white",
                backgroundColor: "purple",
                "&:hover": {
                  backgroundColor: "#380038"
                }
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: "white",
                "&:hover": {
                  cursor: "pointer",
                  color: "white",
                },
              }}
              textAlign="center"
            >
              {isLogin
                ? "Don't have an account? Create Account."
                : "Already have an account? Login here."}
            </Typography>
          </Box>

          {/* Snackbar for displaying error message */}
          <Snackbar
            open={showSnackbar}
            autoHideDuration={4000}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            TransitionComponent={motion.div}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
						<Alert severity={snackbarSeverity} variant="filled">{snackbarMessage}</Alert>
					</Snackbar>
        </form>
      )}
    </Formik>
  );
};

export default Form;
