import closeIconPath from '../images/Close-Icon.svg';

function PopupWithForm(props) {
  const visiblePopupClass = props.isOpen ? 'popup_opened' : '' ;

  return (
    <div className={`popup popup_type_${props.name} ${visiblePopupClass}`}>
        <div className="popup__container">
          <button type="button" className="popup__close-btn">
            <img onClick={props.onClose} src={closeIconPath} alt="иконка закрытия формы" className="popup__close-icon" />
          </button>
          <form onSubmit={props.onSubmit} action="#" className="form" name={props.name} noValidate>
            <h3 className="form__title">
              {props.title}
            </h3>
            {props.children}
          <button className="form__button" type="submit">
            {props.buttonText}
          </button>
          </form>
        </div>
    </div>
  );
};
export default PopupWithForm;