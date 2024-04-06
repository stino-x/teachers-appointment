/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../redux/reducers/LoginSlice';
import styles from '../Styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  // Accessing message from location state
  const location = useLocation();
  const { message } = location.state || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'loading') {
      return;
    }
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        setEmail('');
        setPassword('');
        navigate('/home');
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>
          LOG IN
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-row']}>
            <div className={styles['input-data']}>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <div className={styles.underline} />
              <label htmlFor="email">Email Address</label>
            </div>
            <div className={styles['input-data']}>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <div className={styles.underline} />
              <label htmlFor="website">Password</label>
            </div>
          </div>
          <div className={styles['form-row']}>
            <div className={styles['input-data']}>
              <input className={styles['test-button']} type="submit" value="Submit" />
            </div>
          </div>
          <div className={`${styles['form-row']} ${styles['login-message']}`}>
            <div className={styles['input-data']}>
              {message && <p>{message}</p>}
            </div>
          </div>
          <div className={`${styles['form-row']} ${styles['login-message']}`}>
            <div className={styles['input-data']}>
              Dont have an account?
              {' '}
              <Link to="/">Signup</Link>
            </div>
          </div>
          {status === 'loading' && <div>Loading...</div>}
          {status === 'failed' && (
          <div>
            Error:
            {' '}
            {error}
          </div>
          )}
        </form>
      </div>
    </>
  );
}
