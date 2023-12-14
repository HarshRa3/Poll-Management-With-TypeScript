import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { signUpSchema } from "../schemas";
import "../components/stylecss/style.css";
import { useSelector } from "react-redux";
import {
  signupResetReducer,
  signUpApi,
  startLoading,
} from "../redux/Slices/signupSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import { dispatch } from "../redux/store";

const SignUp = () => {
  const location = useNavigate();
  const [buttonDisable, setButtonDisable] = useState(false);
  const signupSlice = useSelector((state) => state.signUp);
  const statuS = signupSlice.loading;

  useEffect(() => {
    if (signupSlice.data.error === 1) {
      toast.error("User already exists!");
      setButtonDisable(false);
      dispatch(signupResetReducer());
    } else if (signupSlice.data.error === 0) {
      setButtonDisable(true);
      dispatch(signupResetReducer());
      location("/", { state: formik.values });
    }
  }, [signupSlice.isSuccess]);


  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      confirm_password: "",
      role: "Guest",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      try {
        dispatch(startLoading());
        dispatch(signUpApi(values));
        
      } catch (error) {
        dispatch(signupResetReducer());
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <Box className="formBodyStyle">
        <Stack direction={"column"} className="form_container">
          <Typography variant="h3">SIGN UP</Typography>
          <Stack
            sx={{ width: "100%", fontSize: "19px" }}
            direction={"column"}
            spacing={1}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              User Name :
            </Typography>
            <TextField
              fullWidth
              label="User Name"
              type="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                <Typography variant="p" color={"red"}>
                  {formik.errors.name &&
                    formik.touched.name &&
                    formik.errors.name}
                </Typography>
              }
            />
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Password :
            </Typography>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                <Typography variant="p" color={"red"}>
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password}
                </Typography>
              }
            />
            <Typography variant="h6" sx={{ textAlign: "left" }}>
              Confirm Password :
            </Typography>
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirm_password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                <Typography variant="p" color={"red"}>
                  {formik.errors.confirm_password &&
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password}
                </Typography>
              }
            />
            <Box>
              <Typography variant="h6" sx={{ textAlign: "left", mb: "10px" }}>
                Role :
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.role}
                  name="role"
                  label="role"
                  onChange={formik.handleChange}
                  sx={{ textAlign: "left" }}
                >
                  <MenuItem value={"Guest"}>Guest</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {statuS ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button
                variant="contained"
                type="submit"
                disabled={buttonDisable}
              >
                Sign Up
              </Button>
            )}
          </Stack>
          <Box>
            <NavLink
              style={{ color: "#1565c0" }}
              to={"/"}
              variant="body2"
            >
              Already have an account? Sign in
            </NavLink>
          </Box>
        </Stack>
      </Box>
      <ToastContainer />
    </>
  );
};

export default SignUp;
