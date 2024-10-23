import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [role, setRole] = useState('USER'); // Default role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    setError(''); // Reset error message
    setSuccess(''); // Reset success message

    try {
      const response = await axios.post('/api/signup', {
        full_name: fullName,
        email,
        password,
        start_date: startDate
      });
      setSuccess(response.data.message);
      toast.success('Sign up successful!');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed');
      toast.error('Sign up failed!');
    }
  };


  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="illustration">
          <img src="/images/login.png" alt="Illustration" />
        </div>
        <div className="signup-form">
          <h1>Sign Up</h1>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="form-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-input"
          />
          {/* <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-input"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select> */}
          <button
            onClick={handleSignUp}
            className="signup-button"
          >
            Sign Up
          </button>
          <div className="login-redirect">
            <p>
              Already have an account?
              <span
                onClick={() => router.push('/login')}
                style={{ color: '#5a67d8', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Log In
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
