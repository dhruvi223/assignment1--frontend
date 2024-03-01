import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchProductsByPids } from "../api";
import { fetchLProductsByEmail } from "../api";

function LikedProduct() {
  const [data, setData] = useState("");
  const [products, setProducts] = useState([]);
  
  
  useEffect(() => {
    // get user email saved in local storage
    const storedDataS = localStorage.getItem("user");
    if (!storedDataS) {
      return;
    }
    const storedData = JSON.parse(storedDataS);
    const email = storedData.email;

    // get product id from likedProduct table by user id
    if (email) {
    fetchLProductsByEmail(email)
      .then((data) => {
        setData(data);
      });
    }

  }, []);




  // nameArray contains product id
  const namesArray = Object.keys(data).map((key) => data[key].pid);
  
  //retrieving all product information by product id
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await fetchProductsByPids(namesArray);
        setProducts(productsData);
      } catch (error) {
      }
    };

    fetchProducts();
  }, []);

  const RenderItems = () => {
    return (
      <div>
        <h1 className="text-3xl text-center font-semibold my-7">My Wishlist</h1>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(products).map((key) => (
            <div key={key}>
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
