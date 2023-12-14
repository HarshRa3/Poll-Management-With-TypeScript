import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignUp from "../components/SignUp";
import Admin from "../pages/Admin/Admin";
import User from "../pages/User/User";
import AddPoll from "../pages/AddPoll/AddPoll";
import AddOption from "../pages/AddOption/AddOption";
import EditTitle from "../pages/EditTitle/EditTitle";
import Protected from "./Protected";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Protected>
            <HomePage />
          </Protected>
        }
      >
        
      </Route>
      <Route  path="/signup" element={<SignUp />} />
      <Route 
        path="/admin"
        element={
          <Protected>
            <Admin />
          </Protected>
        }
      >
          <Route path="addPoll" element={<AddPoll />}/>
          <Route path="EditTitle/:editDataId" element={<EditTitle />}/>
        <Route path="AddOption/:optionDataId" element={<AddOption />}/>       
      </Route>
      <Route 
        path="/userPoll"
        element={
          <Protected>
            <User />
          </Protected>
        }
      />

       </Routes>
  );
};

export default Router;
