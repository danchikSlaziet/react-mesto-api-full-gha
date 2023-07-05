import closeIconPath from '../images/Close-Icon.svg';


export default function InfoToolTip({isToolTipInfo, onClose}) {
  const visiblePopupClass = isToolTipInfo.isOpen ? 'popup_opened' : '';

  return (
    <div className={`popup ${visiblePopupClass}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn">
          <img onClick={onClose} src={closeIconPath} alt="иконка закрытия формы" className="popup__close-icon" />
        </button>
        <img className='popup__tooltip-img' src={isToolTipInfo.imgPath} alt="иконка подсказки" />
        <p className='popup__tooltip-text'>{isToolTipInfo.text}</p>
      </div>
    </div>
  );
}