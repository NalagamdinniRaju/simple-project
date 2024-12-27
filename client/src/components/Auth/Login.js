// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const Login = () => {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [error, setError] = useState(false)

//     const navigate = useNavigate()
    
//     const hadleSubmit = async (e) => {
//         e.preventDefault()
//         if(email === "" || password === "") {
//             setError(true)
//             alert("Enter both email and password")
//         }
//         else {
//             // API call to login
//             const response = await axios.post("http://localhost:5000/api/auth/login",{email, password})
//             if(response.status == 200) {
//                 localStorage.setItem("token", response.data.token)
//                 console.log(response)
//                 navigate("/home")
//             }else{
//                 setError(true)
//                 console.log(response.message.error)
//                 alert("Invalid email or password")
//             }
        
//         }}
//   return (
//     <div>
//         <h1>Login</h1>
//         <form onSubmit={hadleSubmit}> 
//             <label>Email:</label>
//             <input placeholder='Enter Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
//             <br/>
//             <label>Email:</label>
//             <input placeholder='Enter Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
//             <br/>
//             <button type="submit">Login</button>
//             <p> Dont have an account? <Link to="/register">Sign up</Link></p>
//             {error && <p style={{color: 'red'}}>Invalid email or password</p>}
//         </form>
            
//     </div>
//   )
// }

// export default Login
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error messages

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      if (response.status === 200) {
        // Save the token to localStorage
        localStorage.setItem('token', response.data.token);
        login();
        console.log('Login successful:', response);
        navigate('/home'); // Redirect to home
      }
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Invalid email or password.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          placeholder="Enter Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
