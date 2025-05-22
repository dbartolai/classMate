import "./Login.css"
import { useState } from 'react'

function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
        setError('')

        try {
            const res = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!res.ok) {
                const err = await res.json()
                setError(err.message || "invalid credentials")
                return
            }

            const data = await res.json()
            localStorage.setItem("token", data.token)

            console.log("Login successful! Token:", data.token);

            

        } catch {
            setError("Invalid credentials");
        }

    }


    return (
        <>
        <div className="login-form-div">
            <form className="login-form">
                <h1 className="login-title">ClassMate</h1>
                <p className="login-subtitle">Login to continue</p>
                <label htmlFor="email" className="login-label">Email: </label>
                <input 
                    id="email" 
                    type="email" 
                    required 
                    className="login-input" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="password" className="login-label">Password: </label>
                <input 
                    id="password" 
                    type={showPassword ? "text" : "password"}
                    required 
                    className="login-input" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div className="login-showpw-row">
                    <input
                        id="showpw"
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="login-checkbox"
                    />
                    <label htmlFor="showpw" className="login-showpw-label">
                        Show password
                    </label>
                </div>
                {error && (
                <div className="error-div">{error}</div>
                )}
                <button
                    type="submit"
                    className="login-btn"
                    onClick={handleSubmit}
                >
                Login
                </button>
                <p className="signup-text">
                New? <a href="/register" className="login-register-link">Create Account</a>
                </p>


            </form>
        </div>
        
        </>
    )

}

export default Login