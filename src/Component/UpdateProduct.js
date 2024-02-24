import React, { useEffect, useState } from 'react'
import axios from 'axios';

function UpdateProduct() {

    
 const [title,setTitle] = useState('');
 const [imageUrl,setImageurl] = useState('');
 const [price,setPrice] = useState('');
 const [description,setDescription] = useState('');
 const [category,setCategory] = useState('');
 const [file, setFile] = useState();
 const [id,setId] = useState();

 const updatedData = {
        "title": title,
        "imageUrl":null,
        "price": price,
        "description":description,
        "category":category
    
    }


    const handleFile = (e) => {
      setFile(e.target.files[0])
   }
 
   const handleUpload = () => {
     const formData = new FormData();
     formData.append('image', file);
     formData.append('title',title)
     axios.post('http://localhost:8000/upupload',formData)
     .then(res => console.log(res))
     .catch(err => console.log(err))


    
 
   }
    console.log(title)

    const onButtonClick = () => {
        console.log('onButtonClick called')
        updateProduct(title, updatedData)
        .then(updatedProduct => {
          // Handle success
          console.log('Product updated:', updatedProduct);
        })
        .then((data) => {
          setId(data.id)
          console.log(id)
      })
        
        .catch(error => {
          // Handle error
          console.error('Failed to update product:', error);
        });
      };

      async function updateProduct(title, updatedData) {
        console.log('called')
        try {
          const response = await fetch(`http://localhost:8000/api/products/update/${title}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
          });
          
          if (!response.ok) {
            throw new Error('Failed to update product');
          }
          if(response.ok){
          console.log('ok')
          const updatedProduct = await response.json();
          window.alert('Product updated successfully:', updatedProduct);
          return updatedProduct;}


        } catch (error) {
          console.error('Error updating product:', error);
          // Handle error appropriately
          throw error;
        }
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
            <div className="flex gap-4">
              <input
             onChange={handleFile}
             className="p-3 border border-gray-300 rounded w-full"
             type="file"
             id="images"

              />
              
              <button onClick={handleUpload}>Upload
              </button>
            </div>
            <div className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              <button onClick={onButtonClick}>update</button>
            </div>
          </div>
        </div>
      </main>
    </div>


    </>
  )
}

export default UpdateProduct
