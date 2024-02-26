import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function LikedProduct() {
  const [data, setData] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // get user email saved in local storage
    const storedDataS = localStorage.getItem("user");
    const storedData = JSON.parse(storedDataS);
    const email = storedData.email;
    // get product id from likedProduct table by user id
    fetch(`http://localhost:8000/api/lproducts/allLProducts?email=${email}`)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to fetch data ");
        }
        return r.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
        console.log(typeof data);
        console.log(data[0]);
        console.log(data[1]);
        console.log(typeof data[0]);
      });

  }, []);

  // nameArray contains product id
  const namesArray = Object.keys(data).map((key) => data[key].pid);

  console.log(Array.isArray(namesArray));

  //retrieving all product information by product id
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/products/getProductsbyPids",
          {
            params: {
              pidsArray: namesArray,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProducts(response.data);
        console.log(response.data); // Log products data after setting state
      } catch (error) {
        console.error("Error fetching products:", error.response.data);
        // Handle error
      }
    };

    fetchProducts();
  }, []);
  console.log(products);
  console.log(typeof products);

  const RenderItems = () => {
    return (
      <div>
        <h1 className="text-3xl text-center font-semibold my-7">My Wishlist</h1>
        <div className="grid grid-cols-3 gap-4">
          {/* Iterate over the keys of `data` */}
          {Object.keys(products).map((key) => (
            <div key={key}>
              {/* Render each item */}
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img
                  className="w-full"
                  src={`http://localhost:8000/images/` + products[key].imageUrl}
                  alt="image of product"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {products[key].title}
                  </div>

                  <p className="text-gray-700 text-base">
                    {products[key].description}
                  </p>
                  <p className="text-gray-700 text-base">
                    {products[key].category}
                  </p>
                </div>

                <div className="px-6 py-4">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {"price:" + products[key].price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };


  return (
    <div>
      <RenderItems />
    </div>
  );
}

export default LikedProduct;
