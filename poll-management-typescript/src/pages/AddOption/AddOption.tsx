import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {  useFormik } from "formik";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AddOptionApi } from "../../redux/Slices/AddOption";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
const AddOption = () => {
  const dispatch:AppDispatch=useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const optionId  = useParams() as { optionDataId: string };
  const formik = useFormik({
    initialValues: {
      option: "",
    },

    onSubmit: (values) => {
      if(values.option.trim() !== ''){
        dispatch(AddOptionApi(optionId.optionDataId,values.option));
        navigate('/admin') 
      }
      else{}
    },
  });

  return (
    <Box className="formBodyStyle">
      <form onSubmit={formik.handleSubmit}>

      
        <Stack direction={"column"} spacing={2} className="form_container">
          <Typography variant="h3">Add Option Here</Typography>
          <TextField name="title" value={location.state} disabled />
          <TextField
            label={"Enter text Here"}
            name="option"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Button variant="contained" type="submit" disabled={!formik.dirty} >
            Submit
          </Button>
          <Link to={"/admin"} style={{width:'100%'}}>
            <Button sx={{ width: "100%" }} variant="contained">
              Cancel
            </Button>
          </Link>
        </Stack>
        </form>
    </Box>
  );
};

export default AddOption;
