import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import LC from './lc';
import style from './SignupPage.module.scss';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const register = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError('The two passwords are not the same!');
      return;
    }
    const user = new LC.User();
    user.setUsername(username);
    user.setPassword(password);
    try {
      await user.signUp();
      setShowSuccessMsg(true);
      setUsername('');
      setPassword('');
      setPasswordConfirm('');
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div className={style.container}>
      <form className={style.smallForm}>
        {error.length > 0 && <div className={style.error}>{error}</div>}
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} />
        <label>Password</label>
        <input
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <label>Confirm password</label>
        <input
          value={passwordConfirm}
          type="password"
          onChange={e => setPasswordConfirm(e.target.value)}
        />
        <button type="submit" onClick={register}>
          Register
        </button>
      </form>
      {showSuccessMsg && (
        <div>
          You have signed up! Please <Link to="/">login</Link>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
