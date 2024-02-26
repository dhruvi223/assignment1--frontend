import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const UserList = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/products/allProducts`
        );
        const jsonData = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        //const data = await response.json();
        //console.log(data)
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const arr = data.map((i, index) => {
    return (
      <>
        <div
          // key={listing._id}
          className="border rounded-lg p-3 flex justify-between items-center gap-4"
        >
          <img
            //src={listing.imageUrls[0]}
            src={i.imageUrl}
            alt="listing cover"
            className="h-16 w-16 object-contain"
          />
          <p>{i.title}</p>

          <div className="flex flex-col item-center">
            {/* <button
                     //onClick={() => handleListingDelete(listing._id)}
                     className='text-red-700 uppercase'
                   >
                     Delete
                   </button>
                   <button className='text-green-700 uppercase'>Edit</button> */}
          </div>
        </div>
      </>
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
      {arr}
    </div>
  );
};

export default UserList;
