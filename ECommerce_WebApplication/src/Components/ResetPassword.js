import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { auth } from "../Firebase/firebase_Config";
import "./style/ResetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function resetPassword(e) {
    e.preventDefault();
    setLoading(true);

    try {
      setError("");
      await auth
        .sendPasswordResetEmail(email)
        .then(() => {
          toast.dark("Check your inbox for password reset link ", {
            autoClose: 10000,
          });
        })
        .catch((err) => {
          setError(err);
        });
      history.push("/login");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <Card className="resetPassword-Card">
      {error && <Alert>{error}</Alert>}
      <CardHeader>
        <h2>Reset Password</h2>
      </CardHeader>
      <CardBody>
        <Form onSubmit={resetPassword}>
          <Label>Enter Email :</Label>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <button className="reset-btn" disabled={loading} type="submit">
              Reset Password
            <span><FontAwesomeIcon icon={faKey} /></span>
            </button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
}

export default ResetPassword;
