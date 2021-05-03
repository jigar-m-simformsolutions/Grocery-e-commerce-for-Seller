import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSms,
  faInfoCircle,
  faUser,
  faCogs,
  faCreditCard,
  faChartLine,
  faChartPie,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Checkmark } from "react-checkmark";
import { useSelector } from "react-redux";
import "../style/ListItemStyle/Sidebar.css";

const PhoneVerify = <FontAwesomeIcon icon={faSms} />;
const SellerInfo = <FontAwesomeIcon icon={faInfoCircle} />;
const dashboard = <FontAwesomeIcon icon={faChartPie} />;
const Activity = <FontAwesomeIcon icon={faUserCircle} />;
const User = <FontAwesomeIcon icon={faUser} />;
const Products = <FontAwesomeIcon icon={faCogs} />;
const payment = <FontAwesomeIcon icon={faCreditCard} />;

export default function Sidebar() {
  const isPhoneVerify = useSelector((state) => state.reducer.phoneVerified);
  const seller_info_add = useSelector((state) => state.reducer.seller_info_add);
  const currentUserInfo = useSelector((state) => state.reducer.currentUserInfo);
  const [slider, setSlider] = useState({
    isPhoneVerifyActive: true,
    isSellerInfoActive: false,
    isAccountInfoActive: false,
    isDashboardActive: false,
    isYourAccActive: false,
    isYourProdActive: false,
    isPaymentRecActive: false,
  });
  const isSellerInfoFetch = useSelector(
    (state) => state.reducer.isSellerInfoFetch
  );
  const [userId, setUserId] = useState([]);

  const handleLink = (e) => {
    if (isPhoneVerify) e.preventDefault();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="logo">
          <Link to="/" className="simple-text">
            Shopify
          </Link>
        </div>
        <ul className="nav">
          {/* <li className="nav-item">
            <NavLink
              className={
                slider.isPhoneVerifyActive ? "nav-link activeclass" : "nav-link"
              }
              to="/phone-verify"
            >
              <span className="icon">{PhoneVerify}</span>
              <p>
                Phone Verification
                {isPhoneVerify ? (
                  <Checkmark size="medium" color="black" />
                ) : null}
              </p>
            </NavLink>
          </li> */}
          <li
            className="nav-item"
            onClick={(e) => {
              return setSlider({
                isSellerInfoActive: true,
              });
            }}
          >
            <NavLink
              to="/seller-info"
              className={
                slider.isSellerInfoActive ? "nav-link activeclass" : "nav-link"
              }
            >
              <span className="icon">{SellerInfo}</span>
              <p>
                Seller Information
                {isSellerInfoFetch || seller_info_add ? (
                  <Checkmark size="medium" color="rgb(3,3,3)" />
                ) : null}
              </p>
            </NavLink>
          </li>
          {/* <li
            className="nav-item"
            onClick={() => setSlider({ isAccountInfoActive: true })}
          >
            <NavLink
              className={
                slider.isAccountInfoActive ? "nav-link activeclass" : "nav-link"
              }
              to="/account-info"
            >
              <span className="icon">{User}</span>
              <p>Account Information</p>
            </NavLink>
          </li> */}
          <li
            className="nav-item"
            onClick={() => setSlider({ isDashboardActive: true })}
          >
            <NavLink
              className={
                slider.isDashboardActive ? "nav-link activeclass" : "nav-link"
              }
              to="/dashboard"
            >
              <span className="icon">{dashboard}</span>
              <p>Dashboard</p>
            </NavLink>
          </li>
          <p className="acticity">Your Activity</p>
          {/* <li
            className="nav-item"
            onClick={() => setSlider({ isYourAccActive: true })}
          >
            <NavLink
              className={
                slider.isYourAccActive ? "nav-link activeclass" : "nav-link"
              }
              to="/seller-account"
            >
              <span className="icon">{Activity}</span>
              <p>Your Account</p>
            </NavLink>
          </li> */}
          <li
            className="nav-item"
            onClick={() => setSlider({ isYourProdActive: true })}
          >
            <NavLink
              className={
                slider.isYourProdActive ? "nav-link activeclass" : "nav-link"
              }
              to="/products"
            >
              <span className="icon">{Products}</span>
              <p>Your Products</p>
            </NavLink>
          </li>
          <li
            className="nav-item"
            onClick={() => setSlider({ isPaymentRecActive: true })}
          >
            <NavLink
              className={
                slider.isPaymentRecActive ? "nav-link activeclass" : "nav-link"
              }
              to="/payment-receives"
            >
              <span className="icon">{payment}</span>
              <p>Payments Receives</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
