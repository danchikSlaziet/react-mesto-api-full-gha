import { Link, useNavigate } from 'react-router-dom';
import logoPath from '../images/logo.svg';
import BurgerMenu from './BurgerMenu';
import { useRef, useState } from 'react';
import authApi from '../utils/auth';

function Header({children, pathName, handleLogin, userEmail, loggedIn, mainRef, footerRef}) {
  const navigate = useNavigate();
  function handleClick() {
    if (loggedIn) {
      authApi.clearCookie()
        .then((data) => {
          console.log(data);
          navigate("/sign-in");
        })
        .catch((err) => console.log(err))
      handleLogin();
      handleBurger();
    }
  };
  const headerRef = useRef();
  function handleBurger() {
    setIsBurgerOpen(!isBurgerOpen);
  }
  
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <header ref={headerRef} className="header page__header">
        <img src={logoPath} alt="логотип соцсети Mesto Russia" className="header__logo logo" />
        {loggedIn ? <><BurgerMenu footerRef={footerRef} mainRef={mainRef} headerRef={headerRef} isBurgerOpen={isBurgerOpen} handleBurger={handleBurger} /><div className="burger-info"><p className="burger-info__email">{userEmail}</p>
        <Link to={pathName} onClick={handleClick} className='burger-info__link' relative="path" replace="true">{children}</Link></div></> : <><p className="header__email">{userEmail}</p>
        <Link to={pathName} onClick={handleClick} className='header__link' relative="path" replace="true">{children}</Link></> }
    </header>
  );
};
export default Header;