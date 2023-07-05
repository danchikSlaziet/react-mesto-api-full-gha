import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const inputRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
    inputRef.current.value = '';
  }
  return (
    <PopupWithForm onSubmit={handleSubmit} buttonText='Сохранить' onClose={props.onClose} isOpen={props.isOpen} title="Обновить аватар" name="avatar">
      <input ref={inputRef} required id="avatar-url-input" type="url" className="form__input form__input_type_url" name="avatar-url" placeholder="Ссылка на картинку" />
      <span className="form__input-error avatar-url-input-error"></span>
    </PopupWithForm>
  );
};