import { useEffect, useState } from 'react';


export default function Login({ apiToken, apiLogin }) {
  const [formValue, setFormValue] = useState({email: '', password: ''});
  const {email, password} = formValue;

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      apiToken(jwt);
    }
  }

  useEffect( () => {
    tokenCheck();
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const {email, password} = formValue;
    apiLogin({email, password});
  };

  return (
    <>
      <div className="auth page__auth">
        <p className="auth__title sign-title">Вход</p>
        <form onSubmit={handleSubmit} className="sign-form auth__form">
          <input className="sign-input" id="email" type="email" name="email" 
                 value={email} onChange={(e) => setFormValue({...formValue, email: e.target.value})} placeholder="Email" />
          <input className="sign-input" id="password" type="password" name="email"
                 value={password} onChange={(e) => setFormValue({...formValue, password: e.target.value})} placeholder="Пароль" />
          <button className="sign-form__button" type="submit">Войти</button>
        </form>
      </div>
    </>
  );
};