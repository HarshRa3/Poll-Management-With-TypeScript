import { Box, Button, Fab, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFormik } from "formik";
import { AddPollApi, resetReducer } from "../../redux/Slices/AddPoll";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { dispatch } from "../../redux/store";
const AddPoll = () => {
  const navigate = useNavigate();
  const [newOption, setNewOption] = useState([{ option: "" }]);
  const increseLength = () => {
    if (newOption.length < 4) {
      setNewOption([...newOption, { option: "" }]);
    } else {
      toast.error("only four options are allowed");
    }
  };
  const decreseLength = () => {
    if (newOption.length > 1) {
      const newar = [...newOption];
      newar.pop();
      setNewOption(newar);
    } else {
      toast.error("One Option is necessary");
    }
  };
  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const onchangeValue = [...newOption];
    onchangeValue[index][name] = value;
    setNewOption(onchangeValue);
  };
  const hasDuplecates = (newOption) => {
    let valueSet = new Set(
      newOption.map((e) => {
        return e.option.trim();
      })
    );
    return valueSet.size !== newOption.length;
  };
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      try {
        if (values.title.trim() !== "") {
          const nonEmptyOptions = newOption.every(
            (option) => option.option.trim() !== ""
          );

          if (nonEmptyOptions) {
            if (hasDuplecates(newOption)) {
              toast.error("Options cannot be the same");
            } else {
              dispatch(AddPollApi(values, newOption));
              setTimeout(() => {
                navigate("/admin");
              }, 200);
            }
          } else {
            toast.warning("Please enter Options");
          }
        } else {
          dispatch(resetReducer());
          toast.warning("Please enter a title or Opions");
        }
      } catch (error) {}
    },
  });
  return (
    <Box className="formBodyStyle">
      <form onSubmit={formik.handleSubmit}>
        <Stack direction={"column"} spacing={2} className="form_container">
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Add Data Here
          </Typography>
          <TextField
            label={"Title"}
            name="title"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {newOption.map((e, i) => {
            return (
              <TextField
                key={i}
                label={"Option " + (i + 1)}
                name={`option`}
                value={e.option}
                onChange={(event) => handleChange(event, i)}
              />
            );
          })}
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            <Fab
              variant="contained"
              onClick={() => increseLength()}
              color="success"
            >
              <AddIcon />
            </Fab>
            <Fab
              variant="contained"
              onClick={() => decreseLength()}
              color="error"
            >
              <RemoveIcon />
            </Fab>
          </Stack>
          <Button
            variant="contained"
            // onClick={formik.handleSubmit}
            type="submit"
            disabled={!formik.dirty}
          >
            Submit
          </Button>
          <Link to={"/admin"} width="100%">
            <Button sx={{ width: "100%" }} variant="contained">
              Cancel
            </Button>
          </Link>
        </Stack>
      </form>
      <ToastContainer />
      <Outlet/>
    </Box>
  );
};

export default AddPoll;
