import React, { useState, useEffect } from "react";
import { Col, Input, Label } from "reactstrap";
import groceryProduct from "../ProductCategoryData/ProductData.json";

export default function MultipleCheckbox({ options, onChange }) {
  const [data, setData] = useState(options);
  const [productsList, setProductsList] = useState(groceryProduct)

  const handleCategory = (index) => {
    const newData = [...data];
    newData.splice(index, 1, {
      category: data[index].category,
      checked: !data[index].checked,
    });
    setData(newData);
    onChange(newData.filter((x) => x.checked));
  };

  return (
    <>
      {data.map((item, index) => {
        return (
          <ul key={item.id}>
            <Col>
              <li>
                <Input
                  type="checkbox"
                  id={item.category}
                  readOnly
                  checked={item.checked || false}
                  onClick={() => handleCategory(index)}
                />
                <Label for={item.category}>{item.category}</Label>
              </li>
            </Col>
          </ul>
        );
      })}
    </>
  );
}
