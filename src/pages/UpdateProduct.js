import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { updatepProduct } from "../redux/actions/productActions";
import { useDispatch } from "react-redux";

function UpdateProduct() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState();

  const updatedData = {
    title: title,
    imageUrl: null,
    price: price,
    description: description,
    category: category,
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  // uploading image file while updating product
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);

      const response = await axios.post(
        "http://localhost:8000/upupload",
        formData
      );

      if (!response.data) {
        throw new Error("Failed to upload image");
      }

      const res = response.data;
    } catch (error) {}
  };

  // updating product
  const onButtonClick = () => {
    updateProduct(title, updatedData).catch((error) => {});
  };

  async function updateProduct(title, updatedData) {
    try {
      await dispatch(updatepProduct(title, updatedData, toast));
    } catch (error) {}
  }
  return (
    <>
      <div>
        <main className="p-3 max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-center my-7">
            Update product
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
              <p className="font-semibold">Image:</p>
              <div className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                <button onClick={onButtonClick}>update</button>
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
    </>
  );
}

export default UpdateProduct;
