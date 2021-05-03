import firebase from "firebase";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import { auth } from "../../Firebase/firebase_Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/PhoneVerify.css";
import {
  PhoneVerification,
  changePhoneNumber,
  PhoneOtpVerify,
} from "../../actions";
import { PHONE_VERIFY_FAILURE, storeSellerPhoneNu } from "../../actions/auth";
import { Checkmark } from "react-checkmark";
import "../style/ListItemStyle/PhoneVerify.css";
toast.configure();

const RightArrow = <FontAwesomeIcon icon={faArrowRight} />;

export default function PhoneVerify() {
  const [phoneNu, setPhoneNu] = useState("");
  const [otpValue, setotpValue] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const phoneVerified = useSelector((state) => {
    return state.reducer.phoneVerified;
  });
  const phoneVerifyErrorMsg = useSelector((state) => {
    return state.reducer.phoneVerifyErrorMsg;
  });
  const PhoneVerifyUser = useSelector((state) => {
    return state.reducer.PhoneVerifyUser;
  });

  const currentUserInfo = useSelector((state) => state.reducer.currentUserInfo);

  const seller_phone_add = useSelector((state) => {
    return state.reducer.seller_phone_add;
  });

  useEffect(() => {
    window.RecaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    let uId = currentUserInfo
      .map((user) => {
        return user.uid;
      })
      .toString();
    setUserId(uId);
  }, []);

  function PhoneValidation() {
    var regexp = /^[0-9]{10}$/;
    return regexp.test(phoneNu);
  }

  function handleSendCode() {
    if (PhoneValidation()) {
      let number = "+91" + phoneNu;
      let recaptcha = window.RecaptchaVerifier;
      dispatch(PhoneVerification(number, recaptcha));
    } else {
      setError("Invalid Phone Number.");
    }
  }

  function handleVerifyCode() {
    if (otpValue.length === 6) {
      dispatch(PhoneOtpVerify(PhoneVerifyUser, otpValue));
    } else {
      dispatch({
        type: PHONE_VERIFY_FAILURE,
        message: "Please Enter 6 digit Code.",
      });
    }
  }

  function changeNumber() {
    dispatch(changePhoneNumber());
    setotpValue("");
  }

  function pushSellerInfoPage() {
    if (phoneVerified) {
      let PhoneNu = "+91" + phoneNu;
      console.log(PhoneNu);
      dispatch(storeSellerPhoneNu(PhoneNu, phoneVerified, userId));
    }
    if (seller_phone_add) {
      setPhoneNu("");
      setotpValue("");
    }
    history.push("/seller-info");
  }

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            {phoneVerifyErrorMsg ? (
              <Alert color="danger">{phoneVerifyErrorMsg}</Alert>
            ) : null}
            <h2 style={{ textAlign: "center" }}>Phone Verification</h2>
            <Form>
              <FormGroup>
                <Label>Enter Phone Number :</Label>
                <Input
                  type="number"
                  name="phone_number"
                  value={phoneNu}
                  maxLength={10}
                  onChange={(e) => {
                    setPhoneNu(e.target.value);
                    setError("");
                  }}
                />
                {error ? <span className="errorClass">{error}</span> : null}
              </FormGroup>
              <button
                className="sendotp-btn"
                id="recaptcha-container"
                onClick={PhoneVerifyUser ? changeNumber : handleSendCode}
              >
                {PhoneVerifyUser ? "change phone number" : "Send OTP"}
              </button>
              <br />
              {PhoneVerifyUser ? (
                <div>
                  <FormGroup>
                    <Label>Enter OTP :</Label>
                    <Input
                      type="number"
                      id="Otp_number"
                      value={otpValue}
                      maxLength={6}
                      onChange={(e) => setotpValue(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <button className="submit-btn" onClick={handleVerifyCode}>
                      Submit
                    </button>
                  </FormGroup>
                </div>
              ) : null}
            </Form>
            <br />
            {phoneVerified ? (
              <button
                type="button"
                className="next-btn"
                onClick={pushSellerInfoPage}
              >
                Next
                <span>{RightArrow}</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

// {/* <Link to="/seller-info">
// </Link> */}
