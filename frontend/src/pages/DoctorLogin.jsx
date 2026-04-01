import { useState } from "react";
import API from "../services/api";

function DoctorLogin(){

 const [username,setUsername] = useState("")
 const [password,setPassword] = useState("")

 const login = async(e)=>{

  e.preventDefault()

  const formData = new FormData()

  formData.append("username",username)
  formData.append("password",password)

  const res = await API.post("/doctor-login",formData)

  alert(res.data.message)

 }

 return(

  <div className="container">

   <div className="card">

    <h2>Doctor Login</h2>

    <form onSubmit={login}>

     <input
      type="text"
      placeholder="Username"
      onChange={(e)=>setUsername(e.target.value)}
     />

     <br/><br/>

     <input
      type="password"
      placeholder="Password"
      onChange={(e)=>setPassword(e.target.value)}
     />

     <br/><br/>

     <button className="btn">Login</button>

    </form>

   </div>

  </div>

 )
}

export default DoctorLogin