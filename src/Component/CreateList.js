import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

const CreateList = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imagUrl, setImageurl] = useState("");
  const [file, setFile] = useState();
  const [id, setId] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  // for uploading image file 
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("id", id);
    axios
      .post("http://localhost:8000/upload", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };


  const onButtonClick = () => {
    create();
  };


  // for creating new product 
  const create = () => {
    const formData = new FormData(); // Create a FormData object

    formData.append("image", image);

    // Append other data fields
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    const allFormData = {};

    for (const entry of formData.entries()) {
      const [key, value] = entry;
      if (key === "image") {


        allFormData[key] = value;
      } else {
        allFormData[key] = value;
      }
    }

    try {
      fetch("http://localhost:8000/api/products/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allFormData),
      })

        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .then((data) => {
          setId(data.id);
          toast.success("Product added");
        })
        .catch((error) => {
        });
    } catch (err) {
  
    }
    {
    }

  };

  return (
    <div>
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Create a Listing
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={title}
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />

            <input
              type="number"
              value={price}
              placeholder="price"
              className="border p-3 rounded-lg"
              id="description"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            <input
              type="text"
              value={description}
              placeholder="description"
              className="border p-3 rounded-lg"
              id="address"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />

            <input
              type="text"
              value={category}
              placeholder="category"
              className="border p-3 rounded-lg"
              id="address"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              <button onClick={onButtonClick}>Create</button>
            </div>

            <div className="flex gap-4">
              <input
                onChange={handleFile}
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
              />
              <button onClick={handleUpload}>Upload</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateList;
