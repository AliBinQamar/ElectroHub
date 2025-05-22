import React, { Fragment, useEffect, useState } from "react";
import "../Style/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../component/card";

function Home() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("idle");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5003/api/products", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.log("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLinkClick = (productID: any) => {
    localStorage.setItem("productID", productID);
    window.location.href = `/productinfo/${productID}`;
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setSelectedOption(selectedCategory);
    if (selectedCategory === "idle") {
      fetchData();
    } else {
      fetch(`http://localhost:3002/filter/category/${selectedCategory}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to retrieve filtered data from server");
          }
        })
        .then((responseData) => {
          setData(responseData.filteredProducts);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleSearch = () => {
    const filteredResults = data.filter((product: any) =>
      product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  return (
    <Fragment>
      <div className="wid">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-content">
                <div className="most-popular">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="heading-section inline">
                        <h4>
                        Browse
                        </h4>
                        <div className="selct">
                          <select
                            value={selectedOption}
                            onChange={handleSelectChange}
                          >
                            <option value="all">All</option>
                            <option value="smartphones">Smartphones</option>
                            <option value="laptops">Laptops</option>
                            <option value="tablets">Tablets</option>
                            <option value="headphones">Headphones</option>
                            <option value="smartwatches">Smartwatches</option>
                            <option value="cameras">Cameras</option>
                            <option value="gaming">Gaming Consoles</option>
                            <option value="accessories">Accessories</option>
                            <option value="home_appliances">Home Appliances</option>
                            <option value="wearable_tech">Wearable Tech</option>
                          </select>
                          <span className="margleft"><i className="fa fa-search" ></i></span>

                          <input
                            className="newSearch"
                            type="text"
                            id="searchText"
                            name="searchKeyword"
                            placeholder="Search"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                          />
                          <button className="searchButton" onClick={handleSearch}>Search</button>

                        </div>
                      </div>
                      <div className="row">
                        {(filteredData.length > 0 ? filteredData : data).map(
                          (product: any) => (
                            <div
                              className="col-lg-3 col-sm-6"
                              onClick={() => handleLinkClick(product._id)}
                              style={{ cursor: "pointer" }}
                              key={product._id}
                            >
                              <Card
                                name={product.name}
                                price={product.price}
                                imgsrc={product.image}
                                category={product.category}
                              />
                            </div>
                          )
                        )}
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

export default Home;
