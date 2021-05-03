import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

export default function Profile(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modal, setModal] = useState(false);

  const location = useLocation();
  console.log(location.state);

  useEffect(() => {
    setName(location.state.map((user) => user.fullname));
    setEmail(location.state.map((user) => user.email));
    setPassword(location.state.map((user) => user.password));
    setPhoneNumber(location.state.map((user) => user.phone_number));
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        close
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Your Profile </ModalHeader>
        <ModalBody>
          <Form>
            <Container>
              <FormGroup>
                <Row>
                  <Col>
                    <Label>Your Name :</Label>
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="userName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Label>Your Email :</Label>
                  </Col>
                  <Col>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col>
                    <Label>Password :</Label>
                  </Col>
                  <Col>
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Label>Phone Number :</Label>
                  </Col>
                  <Col>
                    <Input
                      type="number"
                      name="phone_number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Container>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
