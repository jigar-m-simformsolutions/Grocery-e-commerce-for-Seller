import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import groceryProduct from "../ProductCategoryData/ProductData.json";
import ReactReadMoreReadLess from "react-read-more-read-less";
import "../style/ListItemStyle/Dashboard.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import db from "../../Firebase/firebase_Config";

export default function Dashboard() {
  const currentUserInfo = useSelector((state) => state.reducer.currentUserInfo);
  const [sellerSelectProduct, setSellerSelecteProduct] = useState([]);

  const [userId, setUserId] = useState([]);
  const [item, setItem] = useState(1);
  // const [count, setCount] = useState(0);
  useEffect(() => {
    let uId = currentUserInfo
      .map((user) => {
        return user.uid;
      })
      .toString();
    setUserId(uId);
    duplicateValueRemover();
  }, []);

  const duplicateValueRemover = () => {
    const result = [
      ...sellerSelectProduct
        .reduce((value, index) => {
          if (!value.has(index.id))
            value.set(index.id, { ...index, quantity: 0 });
          value.get(index.id).quantity++;
          return value;
        }, new Map())
        .values(),
    ];

    console.log(result);
    setSellerSelecteProduct(result);
  };

  const handleProductAdd = (mainIndex) => {
    let tempSelectedProduct = [];
    let productList = groceryProduct;
    let selecteData = productList[mainIndex];
    delete selecteData.pack_size;
    selecteData.quantity = 1;
    tempSelectedProduct.push(...sellerSelectProduct, selecteData);
    setSellerSelecteProduct(tempSelectedProduct);
  };

  const handlePlus = (index) => {
    let data = [...sellerSelectProduct];
    let data_index = { ...data[index] };
    data_index.quantity += 1;
    data[index] = data_index;
    setSellerSelecteProduct(data);
  };
  const handleMinus = (index) => {
    let data = [...sellerSelectProduct];
    let data_index = { ...data[index] };
    data_index.quantity -= 1;
    data[index] = data_index;
    setSellerSelecteProduct(data);
  };

  const handleDeleteProduct = (index) => {
    let data = [...sellerSelectProduct];
    data.splice(index, 1);
    setSellerSelecteProduct(data);
  };

  const addSellerProductsToFirestore = () => {
    sellerSelectProduct.map(products => {
      db.collection("users").doc(userId).collection("seller-products").add({
        id: products.id,
        title: products.title,
        category: products.category,
        price: products.price,
        description: products.description,
        images: products.images,
        quantity: products.quantity,
      });
    })
  };

  return (
    <div className="content">
      <div className="container-fluid">
        {sellerSelectProduct?.length === 0 ? null : (
          <>
            <div className="SelectedProducts">
              <div className="title">Selected Products</div>
              <div>
                {sellerSelectProduct.map((products, index) => {
                  return (
                    <div className="item" key={index}>
                      <div className="srno">
                        <h4>{index + 1}.</h4>
                      </div>
                      {products.images.map((image, imgIndex) => {
                        return (
                          <div className="image" key={imgIndex}>
                            <img src={image} alt={image.toString()} />
                          </div>
                        );
                      })}
                      <div className="description">{products.title}</div>
                      <div className="quantity">
                        <button
                          className="plus-btn"
                          type="button"
                          name="button"
                          onClick={() => handlePlus(index)}
                          disabled={products.quantity === 100}
                        >
                          <span>
                            <FontAwesomeIcon icon={faPlus} />
                          </span>
                        </button>
                        <input
                          readOnly
                          type="text"
                          name="name"
                          value={products.quantity}
                        />
                        <button
                          className="minus-btn"
                          type="button"
                          name="button"
                          onClick={() => handleMinus(index)}
                          disabled={products.quantity === 0}
                        >
                          <span>
                            <FontAwesomeIcon icon={faMinus} />
                          </span>
                        </button>
                      </div>
                      <div className="total-price">
                        {products.price} * {products.quantity} = ₹{" "}
                        {products.price * products.quantity}
                      </div>
                      <button
                        className="delete-btn"
                        type="button"
                        name="button"
                        onClick={() => handleDeleteProduct(index)}
                      >
                        <span>
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </button>
                    </div>
                  );
                })}
                <div className="add-rmv-btn">
                  <button
                    className="add-btn"
                    type="button"
                    name="button"
                    onClick={() => {
                      addSellerProductsToFirestore();
                    }}
                  >
                    <span>Add Products</span>
                  </button>
                  <button className="remove-btn" type="button" name="button">
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="productsList">
          <Row>
            {groceryProduct.map((grocery, mainIndex) => {
              return (
                <Col key={grocery.id} xs="4">
                  <Card>
                    {grocery.images.map((images) => {
                      return (
                        <CardImg
                          top
                          key={images.toString()}
                          src={images}
                          alt={images.toString()}
                        />
                      );
                    })}
                    <CardBody>
                      <CardTitle style={{ paddingBottom: "10px" }} tag="h5">
                        {grocery.title}
                      </CardTitle>
                      <CardSubtitle className="mb-2 text-muted">
                        {grocery.category}
                      </CardSubtitle>
                      <CardText>
                        <ReactReadMoreReadLess
                          charLimit={200}
                          readMoreText={"Read more"}
                          readLessText={"Read less"}
                          readLessStyle={{
                            cursor: "pointer",
                            color: "rgb(46, 184, 108)",
                          }}
                          readMoreStyle={{
                            cursor: "pointer",
                            color: "rgb(46, 184, 108)",
                          }}
                        >
                          {grocery.description}
                        </ReactReadMoreReadLess>
                      </CardText>
                      <CardText></CardText>
                      <button
                        className="add-prd-btn"
                        onClick={() => handleProductAdd(mainIndex)}
                      >
                        Add products
                      </button>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

// useEffect(() => {
//   setCount(0)
//     setSellerSelecteProduct([])
// }, [])
// setSellerSelecteProductBool(false)
// sellerSelectProduct.push(selected);
// setTimeout(() => {
//   console.log("time out");
// }, 3000);
// {/* {grocery.pack_size.map((GroceryPackSize, index) => {
//   return (
//     <ul key={index} className="packSizeList">
//       <li
//         onClick={() =>
//           handleSelectList(mainIndex, index)
//         }
//       >
//         <Row>
//           <Col xs="3">{GroceryPackSize.size}</Col>
//           <Col xs="6" className="col-6">
//             ₹ {GroceryPackSize.price}
//           </Col>
//           <Col xs="3"> */}
// {/* {grocery[mainIndex].GroceryPackSize[
//               index
//             ] ? (
//               <Checkmark size="medium" color="green" />
//             ) : null} */}
// {/* {listSelect.map((seleted) => {
//               return (
//                 {

//                 }
//               );
//             })} */}
// {/* </Col>
//         </Row>
//       </li>
//     </ul>
//   );
// })} */}

// {/* <div className="SelectedProducts">
//   <div className="title">Selected Products</div> */}
//   {/* <SellerSelectedProductShow
//     data={sellerSelectProduct}
//     userId={userId}
//   /> */}
// {/* </div> */}
