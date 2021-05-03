import React from "react";
import { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label, Col, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  SELLER_INFO_ADD,
  SELLER_INFO_FETCH,
  storeSellerInfo,
} from "../../actions";
import db from "../../Firebase/firebase_Config";
import "../style/ListItemStyle/SellerInfo.css";

const RightArrow = <FontAwesomeIcon icon={faArrowRight} />;

export default function SellerInfo() {
  const [ShopName, setShopName] = useState("");
  const [pincodeNumber, setPincodeNumber] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState([]);
  const [landmark, setLandmark] = useState("");
  const [sellerShopInfo, setSellerShopInfo] = useState([]);
  const currentUserInfo = useSelector((state) => state.reducer.currentUserInfo);
  const seller_info_add = useSelector((state) => state.reducer.seller_info_add);
  const isSellerInfoFetch = useSelector(
    (state) => state.reducer.isSellerInfoFetch
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let uId = currentUserInfo
      .map((user) => {
        return user.uid;
      })
      .toString();
    console.log(uId);
    setUserId(uId);
    fetchSellerInfo(uId);
  }, []);

  function fetchSellerInfo(userId) {
    db.collection("users")
      .doc(userId)
      .collection("seller-info")
      .get()
      .then((snapshot) => {
        let sellerShopInfo = [];
        snapshot.forEach((doc) => {
          let sellerInfo = doc.data();
          let uid = doc.id;
          sellerShopInfo.push(sellerInfo, uid);
          setSellerShopInfo(sellerShopInfo);
          sellerShopInfo.map((info) => {
            setShopName(info.ShopName);
            setPincodeNumber(info.pincodeNumber);
            setAddress(info.address);
            setCityName(info.cityName);
            setLandmark(info.landmark);
            setStateName(info.stateName);
          });
          dispatch({
            type: SELLER_INFO_FETCH,
          });
        });
      });
  }

  // setShopName(selle)
  // console.log(sellerShopInfo)
  // console.log(sellerShopInfo);

  function AddDetails(e) {
    e.preventDefault();
    dispatch(
      storeSellerInfo(
        userId,
        ShopName,
        pincodeNumber,
        cityName,
        stateName,
        address,
        landmark,
        category
      )
    );
    if (seller_info_add) {
      setShopName("");
      setPincodeNumber("");
      setCityName("");
      setStateName("");
      setAddress("");
      setLandmark("");
      setCategory("");
    }
  }

  function GetPincodeDetails() {
    console.log("Jigar");
  }

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Form onSubmit={AddDetails}>
              <FormGroup>
                <Label>Enter Your Company Name :</Label>
                <Input
                  type="text"
                  readOnly={isSellerInfoFetch}
                  value={ShopName}
                  name="ShopName"
                  onChange={(e) => setShopName(e.target.value)}
                  required={true}
                />
              </FormGroup>
              <Container className="shopaddress">
                <Label>Your Shop/Company Location :</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="Address"
                    readOnly={isSellerInfoFetch}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required={true}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="Landmark"
                    readOnly={isSellerInfoFetch}
                    placeholder="Landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    required={true}
                  />
                </FormGroup>
                <FormGroup>
                  <Row>
                    <Col sm={{ size: 6 }}>
                      <Input
                        type="number"
                        name="pincodeNumber"
                        readOnly={isSellerInfoFetch}
                        placeholder="Pincode"
                        value={pincodeNumber}
                        onChange={(e) => setPincodeNumber(e.target.value)}
                        required={true}
                      />
                    </Col>
                    <Col>
                      <button
                        className="GetDetail"
                        disabled={isSellerInfoFetch}
                        onClick={GetPincodeDetails}
                      >
                        <span>Get Details</span>
                      </button>
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    readOnly={isSellerInfoFetch}
                    value={cityName}
                    required={true}
                    onChange={(e) => setCityName(e.target.value)}
                    required={true}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="text"
                    name="State"
                    placeholder="State"
                    readOnly={isSellerInfoFetch}
                    value={stateName}
                    required={true}
                    onChange={(e) => setStateName(e.target.value)}
                    required={true}
                  />
                </FormGroup>
              </Container>
              <button
                type="submit"
                className="infoadd"
                disabled={isSellerInfoFetch}
              >
                <span>Add Details</span>
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
