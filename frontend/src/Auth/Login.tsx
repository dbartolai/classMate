import "./Login.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../UserContext'; // Adjust path if needed


function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { setUser } = useUser();


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
        setError('')

        try {
            const res = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
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

            const authRes = await fetch('http://localhost:8080/auth/me', {credentials: "include" })
            if (authRes.ok) {
                const authData = await authRes.json();
                setUser(authData);
            } else {
                setUser(null)
            }

            const userRes = await fetch('/users/me', {credentials: "include" })
            console.log("users/me")
            if (userRes.ok) {
                const userData = await userRes.json();
                console.log(userData)
                const nextScreen = userData.onboarding;
                if (nextScreen === 1) navigate("/nextonboarding");
                if (nextScreen === 0) navigate("/welcome");
            } else {
                console.log("not ok")
            }

            
          

        } catch {
            setError("This error");
        }

    }


    return (
        <>
        <div className="login-form-div">
            <form className="login-form">
                <h1 className="login-title">ClassMate</h1>
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