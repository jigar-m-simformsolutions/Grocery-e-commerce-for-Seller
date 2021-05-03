import db, { auth } from "../Firebase/firebase_Config";

export const PHONE_USER_STORE = "PHONE_USER_STORE";
export const PHONE_NUMBER_CHANGE = "PHONE_NUMBER_CHANGE";
export const PHONE_VERIFY_SUCCESS = "PHONE_VERIFY_SUCCESS";
export const PHONE_VERIFY_FAILURE = "PHONE_VERIFY_FAILURE";

export const USER_INFO = "USER_INFO";
export const SELLER_PHONE_ADD = "SELLER_PHONE_ADD";

export const SELLER_INFO_ADD = "SELLER_INFO_ADD";
export const SELLER_INFO_FETCH = "SELLER_INFO_FETCH";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const storeSellerInfo = (
  userId,
  ShopName,
  pincodeNumber,
  cityName,
  stateName,
  address,
  landmark
) => (dispatch) => {
  db.collection("users").doc(userId).collection("seller-info").add({
    ShopName,
    pincodeNumber,
    cityName,
    stateName,
    address,
    landmark,
  });

  dispatch({
    type: SELLER_INFO_ADD,
  });
};

export const storeSellerPhoneNu = (phonenu, PhoneVerified, userId) => (
  dispatch
) => {
  db.collection("users").doc(userId).collection("seller-phonenumber").add({
    phonenu,
    PhoneVerified,
  });
  dispatch({
    type: SELLER_PHONE_ADD,
  });
};

export const fetchUserInfo = (user) => (dispatch) => {
  db.collection("users")
    .where("email", "==", user.email)
    .get()
    .then((snapshot) => {
      let userData = [];
      snapshot.forEach((doc) => {
        console.log(doc);
        let data = doc.data();
        let uid = doc.id;
        let obj = { ...data, uid };
        userData.push(obj);
      });
      dispatch({
        type: USER_INFO,
        user: userData,
      });
    });
};

export const PhoneVerification = (number, recaptcha) => async (dispatch) => {
  try {
    auth
      .signInWithPhoneNumber(number, recaptcha)
      .then((confirmUser) => {
        dispatch({
          type: PHONE_USER_STORE,
          user: confirmUser,
        });
      })
      .catch((error) => {
        dispatch({
          type: PHONE_VERIFY_FAILURE,
          message: error,
        });
      });
  } catch (err) {
    dispatch({
      type: PHONE_VERIFY_FAILURE,
      message: error,
    });
  }
};

export const PhoneOtpVerify = (user, otpcode) => async (dispatch) => {
  user.confirm(otpcode).then((user) => {
    dispatch({
      type: PHONE_VERIFY_SUCCESS,
    }).catch((error) => {
      dispatch({
        type: PHONE_VERIFY_FAILURE,
        message: error,
      });
    });
  });
};

export const changePhoneNumber = () => (dispatch) => {
  dispatch({
    type: PHONE_NUMBER_CHANGE,
  });
};

export const SignUpUser = (fullname, phone_number, email, password) => async (
  dispatch
) => {
  try {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((dataBeforeEmail) => {
        auth.onAuthStateChanged((user) => {
          user.sendEmailVerification();
        });
      });
  } catch (err) {
    dispatch({
      type: SIGNUP_FAILURE,
      message:
        "Something went wrong, we couldn't create your account.Please try again.",
    });
  }

  db.collection("users").add({
    fullname,
    email,
    password,
    phone_number,
  });
};

export const loginUser = (email, password) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({
        type: LOGIN_SUCCESS,
        user,
      });
    })
    .catch(() => {
      dispatch({
        type: LOGIN_FAILURE,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_REQUEST,
  });
  auth
    .signOut()
    .then(() => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOGOUT_FAILURE,
        msg: err,
      });
    });
};

export const verifyAuth = () => (dispatch) => {
  dispatch({
    type: VERIFY_REQUEST,
  });
  auth.onAuthStateChanged((user) => {
    if (user !== null) {
      dispatch({
        type: LOGIN_SUCCESS,
        user,
      });
    }
    dispatch({
      type: VERIFY_SUCCESS,
    });
  });
};
