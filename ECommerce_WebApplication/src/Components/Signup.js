import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style/signUp.css";
import {
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { SignUpUser } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
toast.configure();

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNu, setPhoneNu] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const signupErrMsg = useSelector((state) => {
    return state.reducer.signupErrorMsg;
  });

  async function addUser(event) {
    event.preventDefault();
    setLoading(true);

    dispatch(SignUpUser(fullName, phoneNu, email, password))
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNu("");
    setLoading(false);

    toast.dark(
      "we have sent you one link.please verified your email through that link!",
      { autoClose: 10000 }
    );
    history.push("/login");
  }

  return (
    <>
      {signupErrMsg ? <h5>{signupErrMsg}</h5> : null}
      <div className="Head">
        <p>Shopify Sellers</p>
      </div>
      <Card className="signup-card">
        <CardHeader>
          <h2>Create Account</h2>
        </CardHeader>
        <CardBody>
          <Form onSubmit={addUser}>
            <FormGroup>
              <Label>Your Name :</Label>
              <Input
                type="text"
                name="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required="Name must be require"
              />
            </FormGroup>
            <FormGroup>
              <Label>Mobile Number :</Label>
              <Input
                type="number"
                name="phone_nu"
                value={phoneNu}
                onChange={(e) => setPhoneNu(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Enter Email :</Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Enter Password :</Label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <button className="signup-btn" type="submit">
                SignUp
                <span>
                  <FontAwesomeIcon icon={faUserPlus} />
                </span>
              </button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
      <div className="login-Link">
        <Label>Already Have An Account ? </Label>{" "}
        <a type="button" disabled={loading}>
          <Link to="/login"> Login </Link>
        </a>
      </div>
    </>
  );
}

export default Signup;
