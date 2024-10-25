import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { login } from '../DAL/auth';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            const result = await login(formData);

            if (result.status === true) {
                alert("Login Successful: " + result?.message);
                localStorage.setItem('Token', result?.data.token);
                onLoginSuccess();
            } else {
                // Login failed, show the error message from the server
                alert("Login failed: " + result?.message);
            }

        } catch (error) {
            if (error.response) {
                // The server responded with a status code out of the 2xx range
                console.log("<=== Api-Error ===>", error.response.data);
                alert("Login failed: " + error.response.data.message || "An error occurred.");
            } else if (error.request) {
                // The request was made, but no response was received
                console.log("<=== Api-Request-Error ===> No response received:", error.request);
                alert("Login failed: No response from the server.");
            } else {
                // Something else went wrong in setting up the request
                console.log("<=== Api-Unknown-Error ===>", error.message);
                alert("Login failed: " + error.message);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='login'>
            {loading && (
                <div className='progress'>
                    <div className="loader"></div>
                </div>
            )}
            <div className='form-area'>
                <form onSubmit={handleLogin}>
                    <h3>Admin Login</h3>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-describedby="emailHelp"
                            variant="outlined"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
