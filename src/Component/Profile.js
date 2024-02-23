import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

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

    fetchData();
  }, []);


  return (
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
    
</form>
  </div>
  )
}

export default Profile
