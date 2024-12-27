
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!username || !email || !password) {
            setError("All fields are required")
            return
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name: username,
                email,
                password
            })
            
            if (response.status === 200) {
                navigate("/login")
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input 
                    placeholder='Enter Your Name'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br/>
                <label>Email:</label>
                <input 
                    placeholder='Enter Email'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <label>Password:</label>
                <input 
                    placeholder='Enter Password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/login">Sign In</Link></p>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </form>
        </div>
    )
}

export default Register