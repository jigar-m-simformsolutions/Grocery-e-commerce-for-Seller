import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./ListItems/Sidebar";
import Main from "./ListItems/Main";
import "./style/Home.css";
import { fetchUserInfo } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";

function Home() {
  const currentUser = useSelector((state) => state.reducer.user);
  const currentUserDataFetch = useSelector(
    (state) => state.reducer.currentUserDataFetch
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo(currentUser));
  }, []);
  return (
    <>
      {currentUserDataFetch ? (
        <div className="wrapper">
          <Router>
            <Sidebar />
            <Route path="/" component={Main} />
          </Router>
        </div>
      ) : (
        <div className="disabled">
          <ReactLoading type="spin" width="100px" height="10%" color="green" />
        </div>
      )}
    </>
  );
}

export default Home;
