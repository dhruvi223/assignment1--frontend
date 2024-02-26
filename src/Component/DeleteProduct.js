import React from "react";
import { useState } from "react";

// for deleting product
function DeleteProduct() {
  const [title, setTitle] = useState("");

  const onButtonClick = () => {
    console.log("onButtonClick called");
    deleteProduct(title)
      .then((message) => {
        // Handle success
        console.log("Product deleted:", message);
      })
      .catch((error) => {
        // Handle error
        console.error("Failed to delete product:", error);
      });
  };

  async function deleteProduct(title) {
    try {
      const response = await fetch(
        "http://localhost:8000/api/products/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const message = await response.text();
      window.alert("Product deleted successfully:", message);
      return message;
    } catch (error) {
      console.error("Error deleting product:", error);
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
