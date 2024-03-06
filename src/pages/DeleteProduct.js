import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { deletepProduct } from "../redux/actions/productActions";
import { useDispatch } from "react-redux";

// for deleting product
function DeleteProduct() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const onButtonClick = () => {
    try {
      const message = deleteProduct(title);
    } catch (error) {}
  };

  // for deleting product
  async function deleteProduct(title) {
    try {
      await dispatch(deletepProduct(title));
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <main className="p-3 max-w-4xl mx-auto gap-4">
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

          <div className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            <button onClick={onButtonClick}>Delete</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DeleteProduct;
