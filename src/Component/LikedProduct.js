import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function LikedProduct() {

    const [data, setData] = useState('');
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const storedDataS = localStorage.getItem('user')
        const storedData = JSON.parse(storedDataS)
        const email = storedData.email;
        fetch(`http://localhost:8000/api/lproducts/allLProducts?email=${email}`)
        .then(r => {
            if (!r.ok){
                throw new Error('Failed to fetch data ');
            }
            return r.json()}
            )
            .then(data => {
               setData(data)
               console.log(data)
               console.log(typeof data)
               console.log(data[0])
               console.log(data[1])
               console.log(typeof data[0])
            })

            // if (Array.isArray(data)) {
            //    console.log('is array')
            //   } else {
            //     console.error('data is not an array');
            //   }

    }, []);


    const namesArray = Object.keys(data).map(key => data[key].pid);

    console.log(Array.isArray(namesArray));




    useEffect(() => {
      const fetchProducts = async () => {
        try {
          //const pidsArray = [155, 156];
          const response = await axios.get('http://localhost:8000/api/products/getProductsbyPids', {
            params: {
              pidsArray: [156, 155]
            }
          },
          {headers: {
            'Content-Type': 'application/json'}}
          );
          setProducts(response.data);
          console.log(response.data); // Log products data after setting state
        } catch (error) {
          console.error('Error fetching products:', error.response.data);
          // Handle error
        }
      };
  
      fetchProducts();
    }, []);
   console.log(products)
   console.log(typeof products)
  //   useEffect(() => {
  //       const fetchProducts = async () => {
  //         try {
  //           const pidsArray = [155, 156]; // Array of pids to send to the backend
  //           const response = await fetch(`http://localhost:8000/api/products/getProductsbyPids`, {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify({ pidsArray: [155, 156] }) // Send pidsArray in the request body
  //           });
  //           if (!response.ok) {
  //             throw new Error('Failed to fetch products');
  //           }
  //           const productsData = await response.json();
  //           setProducts(productsData);
  //         } catch (error) {
  //           console.error('Error fetching products:', error);
  //           // Handle error
  //         }
  //       };

  //       fetchProducts();


  //       //console.log(products)
  // }, []); 






  const RenderItems = () => {
    return (
      <div>
         <h1 className='text-3xl text-center font-semibold my-7'>My Wishlist</h1>
      <div className='grid grid-cols-3 gap-4'>
        {/* Iterate over the keys of `data` */}
        {Object.keys(products).map(key => (
          <div key={key}>
            {/* Render each item */}
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={`http://localhost:8000/images/`+products[key].imageUrl} alt="image of product" />
            <div className="px-6 py-4">
             <div className="font-bold text-xl mb-2">{products[key].title}</div>

               <p className="text-gray-700 text-base">{products[key].description}</p>
               <p className="text-gray-700 text-base">{products[key].category}</p>

              </div>

                <div className="px-6 py-4">
               <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{'price:'+products[key].price}</span>
             </div>



                </div>
            {/* <p>Name: {data[key].name}</p> */}
          </div>
        ))}
      </div>
      </div>
    );
  };


    // const pid = data.map((i, index) => {
    //     return {pid :i.pid};
    // })


  return (
    <div>
      <RenderItems/>
    </div>
  )
}




export default LikedProduct
