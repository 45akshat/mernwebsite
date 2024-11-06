import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Import your CSS file for styling
import { useDispatch, useSelector } from 'react-redux';
import { getUser, login } from '../../State/Auth/Action';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt')
  const {auth} = useSelector(store=>store)
  useEffect(()=>{
    if(jwt){
     dispatch(getUser(jwt, '/login'))
    }
  }, [jwt, auth.jwt])



  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5454/auth/request-otp/', { email });
      // console.log('OTP sent:', response.data);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to request OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      dispatch(login({ email, password: otp }, navigate))
      // const response = await axios.post('http://localhost:5454/auth/signin/', { email, password: otp });
      // // console.log('OTP verified:', response.data);
      // const { jwt, message } = response.data;
      // localStorage.setItem('authToken', jwt);
      setSuccess(true);
      navigate('/account')
    } catch (err) {
      alert(err.response?.data?.error || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='otp-container mt-[13vh]'>
      <h2 className='otp-title'>{step === 1 ? 'ACCOUNT' : 'ENTER OTP'}</h2>
      {success ? (
        <div className='success-message'>OTP verified successfully!</div>
      ) : (
        <form className='otp-form' onSubmit={step === 1 ? handleEmailSubmit : handleOtpSubmit}>
          {step === 1 ? (
            <>
              <div className='form-group'>
                <label className='form-label'>Email</label>
                <input
                  placeholder='Enter your email address'
                  type="email"
                  className='form-input'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className='form-group'>
                <label className='form-label'>OTP</label>
                <input
                  type="text"
                  className='form-input'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          {error && <div className='error-message'>{error}</div>}
          <button type="submit" className='otp-button' disabled={loading}>
            {loading ? 'Processing...' : step === 1 ? 'SEND OTP' : 'VERIFY OTP'}
          </button>

          <div className="info-box">
        <h3>WELCOME TO YAHOOM</h3>
        <p>
          If you are an existing or new customer,  <strong>Existing customer</strong>  please use your account with the same email address
          that you used. This will ensure you can view your orders and address settings in the account.
        </p>
        <p>
          If you have any questions please don't hesitate to reach out to us at
          <a href="mailto:customersupport@representclo.com"> info@yahoom.in</a>.
        </p>
      </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
