export default function BurgerMenu({isBurgerOpen, handleBurger, headerRef, mainRef, footerRef}) {

  const burgerOpenClass = isBurgerOpen ? `burger-button_active ` : `` ;
  function handleClick() {
    handleBurger();
    if (!isBurgerOpen) {
      headerRef.current.style = 'transform: translateY(142px); transition: transform .3s ease-in;'
      mainRef.current.style = 'transform: translateY(142px); transition: transform .3s ease-in;'
      footerRef.current.style = 'transform: translateY(142px); transition: transform .3s ease-in;'
    }
    else {
      headerRef.current.style = 'transform: translateY(0); transition: transform .3s ease-in;'
      mainRef.current.style = 'transform: translateY(0); transition: transform .3s ease-in;'
      footerRef.current.style = 'transform: translateY(0); transition: transform .3s ease-in;'
    }
  };

  return (
    <div className={`burger-button ${burgerOpenClass}`} onClick={handleClick}>
      <div className="burger-button__line"></div>
      <div className="burger-button__line"></div>
      <div className="burger-button__line"></div>
    </div>
  );
}