import closeIconPath from '../images/Close-Icon.svg';

function ImagePopup(props) {
  const visiblePopupClass = props.card.isOpen ? 'popup_opened' : '';
  return (
    <div className={`popup popup_type_photo ${visiblePopupClass}`}>
      <div className="popup__photo-container">
        <button type="button" className="popup__close-btn">
          <img onClick={props.onClose} src={closeIconPath} alt="иконка закрытия формы" className="popup__close-icon" />
        </button>
        <img src={props.card.link} alt={`фото места ${props.card.place}`} className="popup__photo-img" />
        <p className="popup__photo-text">
          {props.card.place}
        </p>
      </div>
    </div>
  );
};
export default ImagePopup;