import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import LC from './lc';
import style from './LoginPage.module.scss';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const login = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await LC.User.logIn(username, password);
      history.push('/diary');
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
        <button type="submit" onClick={login}>
          Login
        </button>
      </form>
      <div className={style.signupMsg}>
        Don't have an account? <Link to="/signup">Sign up!</Link>
      </div>
    </div>
  );
};

export default LoginPage;
