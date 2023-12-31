import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../components/stylecss/style.css";
import { useDispatch, useSelector } from "react-redux";
import { resetReducer, signInApi } from "../redux/Slices/signinSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { signInScheema } from "../schemas";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/rootReducer";

interface LoginData {
  name: string;
  password: string;
}

interface Decode {
  role: string;
}

interface LoginSliceState {
  data: {
    token?: string;
    error?: number;
  };
  loading: boolean;
  isSuccess: boolean;
}

const SignIn: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const ref = useRef<HTMLButtonElement | null>(null);
  const [autoSignin, setAutoSignin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [buttonDisable, setButtonDisable] = useState(false);
  const signinSlice = useSelector((state: RootState) => state.signIn) as LoginSliceState;
  const status = signinSlice.loading;

  useEffect(() => {
    if (signinSlice.isSuccess && signinSlice.data.token) {
      const decode: Decode = jwtDecode(signinSlice.data.token);
      localStorage.setItem("token", signinSlice.data.token);
      localStorage.setItem("role", decode.role);
      dispatch(resetReducer());
      if (decode.role === "Guest") {
        navigate("/userPoll");
      } else if (decode.role === "Admin") {
        navigate("/admin");
      }
    } else if (signinSlice.data.error === 1) {
      toast.error("user does not exist!", { autoClose: 1000 });
      setButtonDisable(false);
    }
    dispatch(resetReducer());
  }, [signinSlice.isSuccess, navigate]);

  const signUpFieldValues = location.state;

  const formik = useFormik({
    initialValues: {
      name: signUpFieldValues ? signUpFieldValues.name : "",
      password: signUpFieldValues ? signUpFieldValues.password : "",
    },
    validationSchema: signInScheema,
    onSubmit: async (values:LoginData) => {
      try {
        if (!signinSlice.data.token) {
          dispatch(resetReducer());
        }
        await dispatch(signInApi(values));
        setAutoSignin(true);
      } catch (error) {}
    },
  });

  useEffect(() => {
    if (formik.values.name && formik.values.password) {
      ref.current?.click();
    }
    navigate("/");
  }, [autoSignin]);

  let token = localStorage.getItem('token');
  let role = localStorage.getItem('role');
  useEffect(() => {
    if (token) {
      if (role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/userPoll')
      }
    }
  }, [token, role])

  return (
    <>
      <Box className="formBodyStyle">
        <Stack direction={"column"} spacing={2} className="form_container">
          <Typography variant="h3">SIGN IN</Typography>
          <Stack
            sx={{ width: "100%", fontSize: "19px" }}
            direction={"column"}
            spacing={2}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <Typography variant="h6" sx={{ textAlign: "left", mb: "10px" }}>
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
                <Typography  color='error'>
                  {formik.errors.name &&
                    formik.touched.name &&
                    formik.errors.name}
                </Typography>
              }
            />
            <Typography variant="h6" sx={{ mb: "10px", textAlign: "left" }}>
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
                <Typography color='error'>
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password}
                </Typography>
              }
            />
            {status ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <Button
                ref={ref}
                variant="contained"
                type="submit"
                disabled={buttonDisable}
              >
                Sign In
              </Button>
            )}
          </Stack>
          <NavLink style={{ color: "#1565c0" }} to={"/signup"}>
            Don't have an account? Register now
          </NavLink>
        </Stack>
      </Box>
      <ToastContainer />
    </>
  );
};

export default SignIn;
