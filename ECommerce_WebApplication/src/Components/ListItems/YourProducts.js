import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import db from "../../Firebase/firebase_Config";
import { useSelector } from "react-redux";
import "../style/ListItemStyle/YourProducts.css";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";

export default function YourProducts() {
  const [userId, setUserId] = useState([]);
  const [fetchProductBool, setFetchproductbool] = useState(false);
  const [fetchSelectedProducts, setFetchSelectedProducts] = useState([]);
  const currentUserInfo = useSelector((state) => state.reducer.currentUserInfo);
  const [item, setItem] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((prevLoading) => !prevLoading);
    let uId = currentUserInfo
      .map((user) => {
        return user.uid;
      })
      .toString();
    setUserId(uId);
    fetchSellerProduct(uId);
    setLoading(false);
  }, [fetchSelectedProducts]);

  function fetchSellerProduct(uId) {
    db.collection("users")
      .doc(uId)
      .collection("seller-products")
      .get()
      .then((snapshot) => {
        let sellerProducts = [];
        snapshot.docs.forEach((doc) => {
          let sellerProduct = doc.data();
          let uid = doc.id;
          let obj = { ...sellerProduct, ["userid"]: uid };
          sellerProducts.push(obj);
        });
        setFetchSelectedProducts(sellerProducts);
        setFetchproductbool(true);
      });
  }

  const handleDeleteProduct = (index) => {
    let data = fetchSelectedProducts;
    let id = data[index].userid;
    db.collection("users")
      .doc(userId)
      .collection("seller-products")
      .doc(id)
      .delete();
  };

  const handlePlus = (index) => {
    let data = fetchSelectedProducts;
    console.log(data[index]);
  };

  const handleMinus = () => {
    setItem(item - 1);
  };

  return (
    <div className="content">
      <div className="container-fluid">
        {fetchSelectedProducts?.length === 0 ? (
          <div>
            <h1>No Item added</h1>
          </div>
        ) : fetchProductBool ? (
          <div className="SelectedProducts">
            <div className="title">Selected Products</div>
            {fetchSelectedProducts.map((products, index) => {
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
                      disabled
                    >
                      <span>
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                    </button>
                    <input
                      type="text"
                      name="name"
                      value={products.quantity}
                      readOnly
                    />
                    <button
                      className="minus-btn"
                      type="button"
                      name="button"
                      onClick={() => handleMinus(index)}
                      disabled
                    >
                      <span>
                        <FontAwesomeIcon icon={faMinus} />
                      </span>
                    </button>
                  </div>
                  <div className="total-price">
                    {" "}
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
          </div>
        ) : null}
      </div>
    </div>
  );
}
