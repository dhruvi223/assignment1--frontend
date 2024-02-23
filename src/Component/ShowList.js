import React from 'react'
import {useState} from 'react';
import { useEffect } from 'react';

const ShowList = ()=>  {

  
  const [title,setTitle] = useState('');
  const [image, setImage] = useState(null)
  const [price,setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/allProducts`);
        const jsonData = await response.json();
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        //const data = await response.json();
        //console.log(data)
        setData(jsonData)
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);

  const arr = data.map( (i, index) => {
    return (<div className = "bg-gray-200 p-4" key={index}>
        {/* <img className = "photos-img" src={i.imageUrl} /> 
        <h6>{i.price}</h6> */}

      <img src="lotus-with-hands-1889661_1280.png"/>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
      
      
      <img className="w-full" src={i.imageUrl} alt={title} />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{i.title}</div>

        <p className="text-gray-700 text-base">{i.description}</p>
        <p className="text-gray-700 text-base">{i.category}</p>

      </div>

      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{'price:'+i.price}</span>
      </div>



    </div>
        </div>
    
    )})


  console.log(data)

  return (
    <div className='grid grid-cols-3 gap-4'>
      {arr}
    </div>
  )
}

export default ShowList
