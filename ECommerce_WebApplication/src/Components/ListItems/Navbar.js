import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
import { logoutUser, USER_INFO } from "../../actions";

export default function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [username, setUserName] = useState("");

  const logout = useSelector((state) => {
    return state.reducer.isLoggingOut;
  });
  const logoutErrorMsg = useSelector((state) => {
    return state.reducer.logoutErrMsg;
  });
  const currentUserInfo = useSelector((state) => state.reducer.currentUserInfo);

  useEffect(() => {
    let uId = currentUserInfo
      .map((user) => {
        return user.uid;
      })
      .toString();
    setUserId(uId);
    let userName = currentUserInfo.map((user) => {
      return user.email;
    }).toString().split("@")[0];
    setUserName(userName);
  }, []);

  function handleLogOut(e) {
    e.preventDefault();
    dispatch(logoutUser());
    if (logout) {
      history.push("/login");
    } else {
      console.log(logoutErrorMsg);
    }
  }
  return (
    <nav className="navbar navbar-expand-lg fixed" color-on-scroll="500">
      <div className="container-fluid">
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navigation"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <UncontrolledDropdown>
                <DropdownToggle tag="a" className="nav-link" caret>
                  {username}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Your Profile</DropdownItem>
                  <DropdownItem onClick={handleLogOut}>
                    <a className="no-icon">Log out</a>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
