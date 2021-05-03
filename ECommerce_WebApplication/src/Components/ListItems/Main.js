import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Profile from "./Profile";
import PhoneVerify from "./PhoneVerify";
import SellerInfo from "./SellerInfo";
import AccountInfo from "./AccountInfo";
import YouProducts from "./YourProducts";
import PaymentReceives from "./PaymentReceives";
import YourAccount from "./YourAccount";
import { useSelector } from "react-redux";
import db from "../../Firebase/firebase_Config";

export default function Main() {
  // const [allUserInfo, setAllUserInfo] = useState([]);
  // useEffect(() => {
  //   db.collection("users").get().then(snapshot => {
  //     let alluser = [];
  //     console.log(snapshot)
  //     snapshot.forEach(doc => {
  //       let user = doc.data();
  //       let uid = doc.id;
  //       let obj = {...user, uid};
  //       alluser.push(obj)
  //     })
  //     alluser.map(user => {
  //       db.collection("users").doc(user.uid).collection("seller-products").get().then(snapshot => {
  //         let alluserProduct = [];
  //         snapshot.forEach(doc => {
  //           let product = doc.data();
  //           let uid = doc.id;
  //           let obj = {...product, uid};
  //           alluserProduct.push(obj)
  //         })
  //         console.log(alluserProduct)
  //       })
  //     })
  //     setAllUserInfo(alluser)
  //     console.log(alluser)
  //   })
  // }, []);

  return (
    <div className="main-panel">
      <Navbar />
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/phone-verify" component={PhoneVerify} />
        <Route path="/seller-info" component={SellerInfo} />
        <Route path="/account-info" component={AccountInfo} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/seller-account" component={YourAccount} />
        <Route path="/products" component={YouProducts} />
        <Route path="/payment-receives" component={PaymentReceives} />
        <Redirect from="*" to="/phone-verify" />
      </Switch>
      <Footer />
    </div>
  );
}
