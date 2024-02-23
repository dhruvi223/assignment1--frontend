import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import UserList from "./UserList"

const Profile = () => {
  
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [data,setData] = useState([])

  useEffect(() => {
    const storedDataS = localStorage.getItem('user')
    const storedData = JSON.parse(storedDataS)
    const userEmail = storedData.email;
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/get?email=${encodeURIComponent(userEmail)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEmail(data.email)
        setRole(data.role)
      } catch (error) {
        console.log(error)
      }
    };



    // const fetch = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:8000/api/products/allProducts`);
    //     const jsonData = await response.json();
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch data');
    //     }
    //     //const data = await response.json();
    //     //console.log(data)
    //     setData(jsonData)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // };
  

    //fetch()
    fetchData();
  }, []);


// const fetch = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/api/products/allProducts`);
//         const jsonData = await response.json();
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         //const data = await response.json();
//         //console.log(data)
//         setData(jsonData)
//       } catch (error) {
//         console.log(error)
//       }
//     };
    


  // const arr = data.map( (i, index) => { return (
  


  //  <>
  //   <h1 className='text-center mt-7 text-2xl font-semibold'>
  //             Your Listings
  //           </h1>
  //           <div
  //              // key={listing._id}
  //               className='border rounded-lg p-3 flex justify-between items-center gap-4'
  //             >
  //             <img
  //                   //src={listing.imageUrls[0]}
  //                   src = {i.imageUrl}
  //                   alt='listing cover'
  //                   className='h-16 w-16 object-contain'
  //                 />
  //                 <p>{i.title}</p>
  
  //                 <div className='flex flex-col item-center'>
  
  //                 <button
  //                   //onClick={() => handleListingDelete(listing._id)}
  //                   className='text-red-700 uppercase'
  //                 >
  //                   Delete
  //                 </button>
  //                 <Link to={'/up-pr'}>
  //                 <button className='text-green-700 uppercase'>Edit</button>
  //                 </Link>
  //                 </div>
  //      </div>
  // </>
     
  

  // );   })
  





  return (
    <>
    <div className = "p-3 max-w-lg mx-auto">


    <div className = "title">
         <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
    </div>

    <form className="flex flex-col gap-4">

    {/* <div div className = "border p-3 rounded-lg">
        <input  value={name}
        placeholder="Enter username"
        onChange={(event) => {setName(event.target.value)}} />
      
    </div> */}

  
    <div className = "border p-3 rounded-lg">
        <input value={email}
        placeholder="Enter your email"
        onChange={(event) => {setEmail(event.target.value)}} />
        </div>
    

        <div className = "border p-3 rounded-lg">
        <input value={role}
        placeholder="Enter your role"
        onChange={(event) => {setRole(event.target.value)}}/>
        </div>
    <Link to={'/create-list'}>
    <div className = "bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
        <button >Create List</button>
    </div>
    </Link>
    <Link to={'/update'}>
    <div className = "bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
        <button >Update List</button>
    </div>
    </Link>
    <Link to={'/delete'}>
    <div className = "bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
        <button >Delete List</button>
    </div>
    </Link>

    
</form>
  </div>


  {/* <div className='flex flex-col gap-4'>
      {arr}
    </div> */}

  {/* <div className='flex flex-col gap-4'>



  <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          <div
             // key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
            <img
                  //src={listing.imageUrls[0]}
                  src = ""
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
                <p>name</p>

                <div className='flex flex-col item-center'>

                <button
                  //onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <button className='text-green-700 uppercase'>Edit</button>
                </div>
     </div>

    </div> */}



<UserList/>

</>
  )
}

export default Profile
