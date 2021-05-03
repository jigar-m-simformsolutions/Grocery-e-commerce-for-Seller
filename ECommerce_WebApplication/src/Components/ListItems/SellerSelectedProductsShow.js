import React, { useState, useEffect } from "react";
import db from "../../Firebase/firebase_Config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function SellerSelectedProductShow(props) {
  const [SelectProduct, setSelectProduct] = useState(props.data);
  const userId = props.userId;

  useEffect(() => {
    console.log(props.data?.length);
  }, [SelectProduct]);
  const addSellerProductsToFirestore = () => {
    SelectProduct.map((products) => {
      db.collection("users").doc(userId).collection("seller-products").add({
        id: products.id,
        title: products.title,
        category: products.category,
        price: products.price,
        description: products.description,
        images: products.images,
        quantity: products.quantity,
      });
    });
  };

  const handlePlus = (index) => {
    let quantity = SelectProduct[index];
    // quantity[index].quantity += 1;
    setSelectProduct(quantity + 1);
  };

  const handleMinus = (index) => {
    let quantity = SelectProduct[index];
    // quantity[index].quantity -= 1;
    setSelectProduct(quantity + 1);
  };

  return (
    <div>
      {SelectProduct.map((products, index) => {
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
            <div className="total-price">₹ {products.price}</div>
            <button className="delete-btn" type="button" name="button">
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
  );
}

export default SellerSelectedProductShow;
