import "./Login.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setError("");
      
        try {
          const registerRes = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password  }),
            credentials: "include",
          });
      
          if (!registerRes.ok) {
            let errMsg = "Registration failed.";
            try {
              const err = await registerRes.json();
              errMsg = err.message || errMsg;
            } catch {}
            setError(errMsg);
            return;
          }
      

          navigate("/welcome")

      
        } catch {
          setError("Network error. Please try again.");
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
                Register
                </button>
                <p className="signup-text">
                Existing user? <a href="/login" className="login-register-link">Sign in!</a>
                </p>


            </form>
        </div>
        
        </>
    )

}

export default Register