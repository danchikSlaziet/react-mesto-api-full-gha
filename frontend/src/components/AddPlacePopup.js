import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [place, setPlace] = useState('');
  const [url, setUrl] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard(place, url);
  };
  useEffect(() => {
    setPlace('');
    setUrl('');
}, [props.isOpen]);
  return (
    <PopupWithForm onSubmit={handleSubmit} buttonText='Создать' onClose={props.onClose} isOpen={props.isOpen} title="Новое место" name="publication">
      <input value={place} onChange={(e) => setPlace(e.target.value)} required minLength="2" maxLength="30" id="place-input" type="text" className="form__input form__input_type_place" name="place" placeholder="Название" />
      <span className="form__input-error place-input-error"></span>
      <input value={url} onChange={(e) => setUrl(e.target.value)} required id="url-input" type="url" className="form__input form__input_type_url" name="url" placeholder="Ссылка на картинку" />
      <span className="form__input-error url-input-error"></span>
    </PopupWithForm>
  );
};