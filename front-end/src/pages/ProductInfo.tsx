import "../Style/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, useState, useEffect } from "react";

function ProductInfo() {
  // const [inputValue, setInputValue] = useState({});
  const [inputValue, setInputValue] = useState<{
  image?: string;
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  }>({});

  const productID = localStorage.getItem("productID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5003/api/products/${productID}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setInputValue(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmithandler = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Add to cart");
      fetch(`http://localhost:5002/api/cart/${productID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Added to cart");
            alert("Added to cart");
          } else {
            console.log("Failed to add to cart");
            window.location.href = "/login";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

  

  };
  
  return (
    <Fragment>
      <div className="widt">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-content">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-profile ">
                    <div className="row">
                      <div className="col-lg-4">
                        <img src={inputValue.image} alt="" />
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <div className="main-info header-text">
                          <h4>{inputValue.name}</h4>
                          <p>{inputValue.description}</p>
                          <div className="main-button">
                            <button className="searchButton" type="button" onClick={onSubmithandler}>
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 align-self-center">
                        <ul>
                          <li>
                            Product Category <span>{inputValue.category}</span>
                          </li>
                          <li>
                            Price <span>{inputValue.price}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductInfo;
