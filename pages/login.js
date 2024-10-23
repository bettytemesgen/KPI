import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const router = useRouter();

  // Simple email validation function
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Email and Password fields cannot be empty.', {
        style: { backgroundColor: '#034b27', color: '#fff' },
        progress: undefined,
      });
      return;
    }
  
    try {
      const response = await axios.post('/api/login', { email, password });
  
      // Save user details in session storage or handle token-based auth if needed
      sessionStorage.setItem('userRole', response.data.role);
      sessionStorage.setItem('userId', response.data.userId);
      sessionStorage.setItem('userName', response.data.name);  // Save the user's name
  
      // Show success toast message
      toast.success(`Welcome, ${response.data.name}! You have successfully logged in.`, {
        style: { backgroundColor: '#034b27', color: '#fff' },
        progress: undefined,
      });
  
      // Use router.push or router.replace for redirecting to the dashboard
      router.push('/dashboard');  // Redirect to the dashboard page after login success
  
    } catch (err) {
      // Handle error messages from the login API
      toast.error(err.response?.data?.message || 'Invalid email or password', {
        style: { backgroundColor: '#034b27', color: '#fff' },
        progress: undefined,
      });
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="illustration">
          <img src="/images/login.png" alt="Illustration" />
        </div>
        <div className="login-form">
          <h1>Log In</h1>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          /> <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'} // Toggle password visibility
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

          {/* <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
            <span
              onClick={() => setShowPassword(!showPassword)} // Toggle show/hide
              className="password-toggle-icon"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div> */}
          <button
            onClick={handleLogin}
            className="login-button"
          >
            Log In
          </button>
          <div className="signup-redirect">
            <p>
              Don’t have an account?
              <span
                onClick={() => router.push('/signup')}
                style={{ color: '#5a67d8', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </div>
  );
}
