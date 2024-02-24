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
  //const [input, setInput] = useState('')
  const [searchData, setSearchData] = useState([])

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


  const handleChange = (value) => {
    setTitle(value)
    Dfetch(title)
  }

  


    const Dfetch = async (title) => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/getOne?title=${title}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        //const data = await response.json();
        //console.log(data)
        setSearchData([jsonData])

        console.log(searchData)
      } catch (error) {
        console.log(error)
      }
    };




  console.log(searchData[0])
  console.log(typeof data)
  
    const searchArr = searchData.map( (i, index) => {
      return (<div className = "bg-gray-200 p-4" key={index}>
          {/* <img className = "photos-img" src={i.imageUrl} /> 
          <h6>{i.price}</h6> */}
  
        <img src="lotus-with-hands-1889661_1280.png"/>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
        
        
        <img className="w-full" src={i.imageUrl} alt="image of product" />
  
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







  const arr = data.map( (i, index) => {
    return (<div className = "bg-gray-200 p-4" key={index}>
        {/* <img className = "photos-img" src={i.imageUrl} /> 
        <h6>{i.price}</h6> */}

      <img src="lotus-with-hands-1889661_1280.png"/>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
      
      
      <img className="w-full" src={i.imageUrl} alt="image of product" />

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










  return (

   <div>
   < div className = "p-2 my-3 max-w-xs mx-auto border rounded-lg">
      {/* <div className='bg-slate-100 p-3 flex justify-center border rounded-lg w-50'> */}
     <input className='bg-transparent focus:outline-none w-24 sm:w-64' type='text' placeholser='search here...'
        value = {title}
        onChange = {(e) =>  handleChange(e.target.value)}
        />
  </div>
       
       {searchData[0] !== undefined ? 
  (<div className='grid grid-cols-3 gap-4'>   
        {searchArr}
        </div>):
    
    (<div className='grid grid-cols-3 gap-4'>
      {arr}
   </div>)
}

  </div>
  )
}

export default ShowList
