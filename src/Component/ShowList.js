import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { fetchAllProducts } from "../api";
import { fetchProductByTitle } from "../api";
import { addLikedProduct } from "../api";

const ShowList = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [pid, setPid] = useState();
  const [clickedProducts, setClickedProducts] = useState({});


  // adding product to liked product
  const handleClick = async (newId) => {
    if (!clickedProducts[newId]) {
      setClickedProducts((prevState) => ({
        ...prevState,
        [newId]: true,
      }));
    }

    try {
      const storedDataS = localStorage.getItem("user");
      const storedData = JSON.parse(storedDataS);
      const email = storedData.email;
      setPid(newId); 
      await addLikedProduct(email, newId);
    } catch (error) {
  
    }
  };

  // getting all products from products table
  useEffect(() => {
    fetchAllProducts(setData);

  }, []);

  // handles changes in search input
  const handleChange = (value) => {
    setTitle(value);
    Dfetch(title);
  };

  // getting searched product by title
  const Dfetch = async (title) => {
    await fetchProductByTitle(title, setSearchData);
   };



  const searchArr = searchData.map((i, index) => {
    return (
      <>

        <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg">
          <button onClick={() => handleClick(i.id)}>Like</button>
          <div p-3 m-6>
            <img
              className="w-full"
              src={`http://localhost:8000/images/` + i.imageUrl}
              alt="image of product"
            />
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{i.title}</div>

            <p className="text-gray-700 text-base">{i.description}</p>
            <p className="text-gray-700 text-base">{i.category}</p>
          </div>

          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {"price:" + i.price}
            </span>
          </div>
        </div>
      </>
    );
  });

  const arr = data.map((i, index) => {
    return (
      <>
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
          <button className="border rounded-lg p-3"
            onClick={() => handleClick(i.id)}
            style={{
              backgroundColor: clickedProducts[i.id] ? "red" : "initial",
            }}
          >
            Like
          </button>

       

          <img
            className="w-full"
            src={`http://localhost:8000/images/` + i.imageUrl}
            alt="image of product"
          />

          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{i.title}</div>

            <p className="text-gray-700 text-base">{i.description}</p>
            <p className="text-gray-700 text-base">{i.category}</p>
          </div>

          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {"price:" + i.price}
            </span>
          </div>
        </div>
      </>
    );
  });

  return (
    <div>
      <div className="p-1 my-1 max-w-xs mx-auto border rounded-lg">
        <input
          className="bg-transparent focus:outline-none w-24 sm:w-64"
          type="text"
          placeholser="search here..."
          value={title}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      {searchData[0] !== undefined ? (
        <div className="grid grid-cols-3 gap-4">{searchArr}</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">{arr}</div>
      )}
    </div>
  );
};

export default ShowList;
