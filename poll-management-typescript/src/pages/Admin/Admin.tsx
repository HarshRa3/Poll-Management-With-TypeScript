import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  TablePagination,
  Typography,
} from "@mui/material";
import { NavLink, Link, useNavigate, Outlet } from "react-router-dom";
import PollItem from "../../components/PollItem";
import InnerPoll from "../../components/InnerPoll";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import RefereshAnimation from "../../components/RefereshAnimation";
import { AdminPollApi } from "../../redux/Slices/AdminPoll";
import { DeleteOptionApi } from "../../redux/Slices/DeleteOption";
import { DeleteTitleApi } from "../../redux/Slices/DeleteTitle";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteTitleId, setDeleteId] = useState(null);
  const [optionData, setOptionData] = useState(null);
  const pollList = useSelector((state) => state.AdminPoll);
  // console.log(pollList.data);
  const deleteOptionLoading = useSelector(
    (state) => state.DeleteOption.loading
  );
  const deleteTitleLoading = useSelector((state) => state.DeleteTitle.loading);
  const EditTitleLoading = useSelector((state) => state.EditTitle.loading);
  const AddPollLoading = useSelector((state) => state.AddPoll.loading);
  const AddOptionLoading = useSelector((state) => state.AddOption.loading);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(5);
  const rowsPerPageOptions = [5, 10, 15];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowPerPage(newRowsPerPage);
    setPage(0);
    localStorage.setItem("rowpage", newRowsPerPage);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const deleteOptionData = (pollId, option, options) => {
    console.log(options.length);
    if (options.length <= 1) {
      dispatch(DeleteTitleApi(pollId));
      setDeleteId(pollId);
    } else {
      dispatch(DeleteOptionApi(pollId, option.option));
      setOptionData(option);
    }
  };
  
  const deleteTitleData = (titleID) => {
    dispatch(DeleteTitleApi(titleID));
    setDeleteId(titleID);
  };

  useEffect(() => {
    dispatch(AdminPollApi()).then(() => setLoading(false));
  }, [
    deleteOptionLoading,
    deleteTitleLoading,
    EditTitleLoading,
    AddOptionLoading,
    AddPollLoading,
  ]);

  useEffect(() => {
    const savedPage = localStorage.getItem("page");
    const savedRowPerPage = localStorage.getItem("rowpage");

    if (savedPage !== null) {
      setPage(parseInt(savedPage, 10));
    }

    if (savedRowPerPage !== null) {
      setRowPerPage(parseInt(savedRowPerPage, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("page", page);
    localStorage.setItem("rowpage", rowPerPage);
  }, [page, rowPerPage]);

  if (loading) {
    return <RefereshAnimation />;
  }

  const paginatedPollList = pollList.data.slice(
    page * rowPerPage,
    page * rowPerPage + rowPerPage
  );
  const pagee = () => {
    return page >= Math.ceil(pollList.data.length / rowPerPage)
      ? Math.max(0, Math.ceil(pollList.data.length / rowPerPage) - 1)
      : page;
  };
  const Authentication=()=>{
    const token=localStorage.getItem('token')
    const role=localStorage.getItem('role')
    if(token){

      if(role==='Admin'){
        return <Outlet/>
      }else if( role==='user'){
        navigate('/userPoll')
      }
    }

    }
  
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        bgcolor: "#63cdda75",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3"> Welcome to Admin Poll</Typography>
      </Box>
      <NavLink
        style={{ textDecoration: "none", color: "black" }}
        to={"addPoll"}
      >
        <Typography variant="h5" textAlign={"center"}>
          Add Poll +
        </Typography>
      </NavLink>
      <Box
        sx={{
          height: "70%",
          overflow: "auto",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        }}
      >
        {pollList.data.length > 0 &&
          paginatedPollList.map((dataList) => (
            <PollItem
              title={dataList.title}
              key={dataList._id}
              EditTitle={
                <Link to={`EditTitle/${dataList._id}`} style={{color:'black'}} state={dataList.title}>
                  <EditIcon />
                </Link>
              }
              AddTitle={
                dataList.options.length < 4 && (
                  <Link
                    to={`AddOption/${dataList._id}`}
                    style={{ color: "black" }}
                    state={dataList.title}
                  >
                    <AddIcon />
                  </Link>
                )
              }
              deleteTitle={
                dataList._id === deleteTitleId && deleteTitleLoading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <DeleteIcon
                    color="error"
                    sx={{ cursor: "pointer" }}
                    onClick={() => deleteTitleData(dataList._id)}
                  />
                )
              }
              InnerOption={dataList.options.map((option, index) => (
                <InnerPoll
                  option={option.option}
                  key={index}
                  votes={option.vote}
                  deleteOption={
                    optionData === option && deleteOptionLoading ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      <DeleteIcon
                        color="error"
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                          deleteOptionData(
                            dataList._id,
                            option,
                            dataList.options
                          )
                        }
                      />
                    )
                  }
                />
              ))}
            />
          ))}
      </Box>
      {Authentication()}
      <TablePagination
        component="div"
        rowsPerPageOptions={rowsPerPageOptions}
        count={pollList.data.length}
        page={pagee()}
        rowsPerPage={rowPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowPerPageChange}
        sx={{ display: "flex", justifyContent: "center", mt: "10px" }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mt: "10px",
        }}
      >
        <Button variant="contained" onClick={logout}>
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default Admin;
