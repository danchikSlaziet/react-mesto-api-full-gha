import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {
  const [formValue, setFormValue] = useState({email: '', password: ''});
  const {email, password} = formValue;
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const {email, password} = formValue;
    props.apiRegister({email, password});
  };

  return (
    <>
      <div className="auth page__auth">
        <p className="auth__title sign-title">Регистрация</p>
        <form onSubmit={handleSubmit} className="sign-form auth__form">
          <input className="sign-input" id="email" type="email" name="email" 
                 value={email} onChange={(e) => setFormValue({...formValue, email: e.target.value})} placeholder="Email" />
          <input autoComplete="new-password" className="sign-input" id="password" type="password" name="email"
                 value={password} onChange={(e) => setFormValue({...formValue, password: e.target.value})} placeholder="Пароль" />
          <button className="sign-form__button" type="submit">Зарегистрироваться</button>
        </form>
        <Link className='auth__link' to="/sign-in">Уже зарегистрированы? Войти</Link>
      </div>
    </>
  );
};