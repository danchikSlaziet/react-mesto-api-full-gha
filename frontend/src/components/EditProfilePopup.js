import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} buttonText='Сохранить' onClose={props.onClose} isOpen={props.isOpen} title="Редактировать профиль" name="profile">
      <input value={name} onChange={(e) => setName(e.target.value)} required minLength="2" maxLength="40" id="name-input" type="text" className="form__input form__input_type_name" name="name" />
      <span className="form__input-error name-input-error"></span>
      <input value={description} onChange={(e) => setDescription(e.target.value)} required minLength="2" maxLength="200" id="job-input" type="text" className="form__input form__input_type_job" name="job" />
      <span className="form__input-error job-input-error"></span>
    </PopupWithForm>
  );
}