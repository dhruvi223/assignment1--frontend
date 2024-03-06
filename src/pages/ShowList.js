import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchAllProducts } from "../redux/actions/productActions";
import { fetchProductbyTitle } from "../redux/actions/productActions";
import { addLikedProduct } from "../redux/actions/productActions";
import { deleteLikedProduct } from "../redux/actions/productActions";
import { useDispatch } from "react-redux";

const ShowList = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [pid, setPid] = useState();
  const [clickedProducts, setClickedProducts] = useState({});
  const dispatch = useDispatch();

  const handleClick = async (newId) => {
    setClickedProducts((prevState) => ({
      ...prevState,
      [newId]: !prevState[newId],
    }));

    if (clickedProducts[newId] && clickedProducts[newId] % 2 !== 0) {
      //deleting product from likedProduct table on dislike 
      try {
        const storedS = localStorage.getItem("user");
        const stored = JSON.parse(storedS);
        const email = stored.email;
        await dispatch(deleteLikedProduct(pid, email));
      } catch (error) {}
    } else {
      //adding product in likedProduct table on like
      try {
        const storedDataS = localStorage.getItem("user");
        const storedData = JSON.parse(storedDataS);
        const email = storedData.email;
        setPid(newId);
        await dispatch(addLikedProduct(email, newId));
      } catch (error) {}
    }
  };


  //fetching all products
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllProducts(setData));
      } catch (error) {}
    };
    fetchData();
  }, [dispatch, setData]);

 
 
  // handles changes in search input
  const handleChange = (value) => {
    setTitle(value);
    Dfetch(title);
  };

  // search product by title
  const Dfetch = async (title) => {
    try {
      await dispatch(fetchProductbyTitle(title, setSearchData));
    } catch (error) {}
  };




  const searchArr = searchData.map((i, index) => {
    return (
      <>
        <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg">
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
          <button
            className={`border rounded-lg p-1 w-12 h-7 ${
              clickedProducts[i.id] && clickedProducts[i.id] % 2 !== 0
                ? "bg-red-500 text-white"
                : ""
            }`}
            onClick={() => handleClick(i.id)}
            style={{ fontSize: "0.75rem" }}
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
